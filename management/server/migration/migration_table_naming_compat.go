package migration

import (
	"context"
	"fmt"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"

	"github.com/shippin/wardenclyffe/management/server/schema"
)

// CreatePrefixedTableCopies creates compatibility copies for the planned
// wardenclyffe_* domain-grouped table names while leaving existing runtime
// table names untouched.
//
// Phase 2 behavior is intentionally non-breaking:
//   - when legacy table exists and prefixed table is missing, create the
//     prefixed table with matching shape.
//   - if the prefixed table is empty, copy all rows from the legacy table.
//   - if the prefixed table already has rows, leave it untouched.
//
// This prepares data for a later full switch without changing current query
// paths. The function is idempotent and safe to run on every startup.
func CreatePrefixedTableCopies(ctx context.Context, db *gorm.DB) error {
	for _, entry := range schema.TableNamingPlan() {
		if err := ensurePrefixedTableCopy(ctx, db, entry.CurrentTable, entry.TargetTable); err != nil {
			return err
		}
	}
	return nil
}

func ensurePrefixedTableCopy(ctx context.Context, db *gorm.DB, sourceTable, targetTable string) error {
	migrator := db.Migrator()
	if !migrator.HasTable(sourceTable) {
		return nil
	}

	if !migrator.HasTable(targetTable) {
		createSQL := createTableLikeSQL(db, sourceTable, targetTable)
		if err := db.Exec(createSQL).Error; err != nil {
			return fmt.Errorf("create compatibility table %s from %s: %w", targetTable, sourceTable, err)
		}
		log.WithContext(ctx).Infof("created compatibility table %s from %s", targetTable, sourceTable)
	}

	targetCount, err := countTableRows(db, targetTable)
	if err != nil {
		return fmt.Errorf("count rows in %s: %w", targetTable, err)
	}
	if targetCount > 0 {
		return nil
	}

	copySQL := fmt.Sprintf("INSERT INTO %s SELECT * FROM %s", quoteIdent(db, targetTable), quoteIdent(db, sourceTable))
	res := db.Exec(copySQL)
	if res.Error != nil {
		return fmt.Errorf("copy data from %s to %s: %w", sourceTable, targetTable, res.Error)
	}
	if res.RowsAffected > 0 {
		log.WithContext(ctx).Infof("copied %d rows from %s to compatibility table %s", res.RowsAffected, sourceTable, targetTable)
	}
	return nil
}

func countTableRows(db *gorm.DB, tableName string) (int64, error) {
	var count int64
	row := db.Raw(fmt.Sprintf("SELECT COUNT(1) FROM %s", quoteIdent(db, tableName))).Row()
	if err := row.Scan(&count); err != nil {
		return 0, err
	}
	return count, nil
}

func createTableLikeSQL(db *gorm.DB, sourceTable, targetTable string) string {
	source := quoteIdent(db, sourceTable)
	target := quoteIdent(db, targetTable)

	switch db.Name() {
	case "mysql":
		return fmt.Sprintf("CREATE TABLE %s LIKE %s", target, source)
	case "postgres":
		return fmt.Sprintf("CREATE TABLE %s (LIKE %s INCLUDING DEFAULTS INCLUDING CONSTRAINTS INCLUDING INDEXES)", target, source)
	default:
		return fmt.Sprintf("CREATE TABLE %s AS SELECT * FROM %s WHERE 1=0", target, source)
	}
}

func quoteIdent(db *gorm.DB, ident string) string {
	if db.Name() == "mysql" {
		return fmt.Sprintf("`%s`", ident)
	}
	return fmt.Sprintf("\"%s\"", ident)
}
