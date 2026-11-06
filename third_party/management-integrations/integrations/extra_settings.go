package integrations

import (
	"context"

	"github.com/shippin/wardenclyffe/management/server/activity"
	"github.com/shippin/wardenclyffe/management/server/integrations/extra_settings"
	"github.com/shippin/wardenclyffe/management/server/types"
)

type managerImpl struct{}

func NewManager(_ activity.Store) extra_settings.Manager {
	return &managerImpl{}
}

func (m *managerImpl) GetExtraSettings(context.Context, string) (*types.ExtraSettings, error) {
	return &types.ExtraSettings{}, nil
}

func (m *managerImpl) UpdateExtraSettings(context.Context, string, string, *types.ExtraSettings) (bool, error) {
	return false, nil
}
