package integrations

import (
	"context"

	"github.com/shippin/wardenclyffe/management/server/integrations/port_forwarding"
	"github.com/shippin/wardenclyffe/management/server/peer"
	"github.com/shippin/wardenclyffe/management/server/store"
	"github.com/shippin/wardenclyffe/management/server/types"
)

type controllerImpl struct {
	store store.Store
}

func NewController(store store.Store) port_forwarding.Controller {
	return &controllerImpl{store: store}
}

func (c *controllerImpl) SendUpdate(context.Context, string, string, []string, map[string]*peer.Peer) {}

func (c *controllerImpl) GetProxyNetworkMaps(context.Context, string, string, map[string]*peer.Peer) (map[string]*types.NetworkMap, error) {
	return make(map[string]*types.NetworkMap), nil
}

func (c *controllerImpl) GetProxyNetworkMapsAll(context.Context, string, map[string]*peer.Peer) (map[string]*types.NetworkMap, error) {
	return make(map[string]*types.NetworkMap), nil
}

func (c *controllerImpl) IsPeerInIngressPorts(context.Context, string, string) (bool, error) {
	return false, nil
}
