package schema

import (
	"os"
	"strconv"
	"sync"

	log "github.com/sirupsen/logrus"
)

const EnvUsePrefixedTables = "NB_USE_PREFIXED_TABLES"

var (
	usePrefixedTablesOnce sync.Once
	usePrefixedTables     bool
)

func UsePrefixedTables() bool {
	usePrefixedTablesOnce.Do(func() {
		val := os.Getenv(EnvUsePrefixedTables)
		if val == "" {
			usePrefixedTables = false
			return
		}

		enabled, err := strconv.ParseBool(val)
		if err != nil {
			log.Warnf("failed to parse %s: %v", EnvUsePrefixedTables, err)
			usePrefixedTables = false
			return
		}

		usePrefixedTables = enabled
	})

	return usePrefixedTables
}

func RuntimeTableName(name string) string {
	if !UsePrefixedTables() {
		return name
	}

	for _, entry := range tableNamingPlan {
		if entry.CurrentTable == name {
			return entry.TargetTable
		}
	}

	return name
}
