
import React, { Component} from 'react';

class WorldMap extends Component {
  constructor(props)
  {
    super(props);

    this.platform = null;
    this.worldMap = null;

    this.state = {
        app_id: 'hnYkNKez39XnzrN09kP5',
        app_code: 'k8LWHvs6MAqG-FeBJKyL7oNXj2i6W1_mY5z5eotpe-c',
        center: {
            lat: props.lat,
            lng: props.lng,
        },
        zoom: props.zoom,
        theme: props.theme
    }
  }

   
changeTheme(theme, style) {
    var tiles = this.platform.getMapTileService({'type': 'base'});
    var layer = tiles.createTileLayer(
        'maptile',
        theme,
        256,
        'png',
        {'style': style}
    );
    this.worldMap.setBaseLayer(layer);
}
shouldComponentUpdate(props, state) {
  this.changeTheme(props.theme, props.style);
  return false;
}
  componentDidMount(){
    this.platform = new window.H.service.Platform(this.state);

        var layer = this.platform.createDefaultLayers();
        var container = document.getElementById('here-map');

        this.worldMap = new window.H.Map(container, layer.normal.map, {
            center: this.state.center,
            zoom: this.state.zoom,
          })

        var events = new window.H.mapevents.MapEvents(this.worldMap);
        // eslint-disable-next-line
        var behavior = new window.H.mapevents.Behavior(events);
        // eslint-disable-next-line
        var ui = new window.H.ui.UI.createDefault(this.worldMap, layer)
  }
  render(){
    return(<div id="here-map" style={{width: '100%', height: '400px', background: 'grey' }} />);
  }
}
export default WorldMap;

