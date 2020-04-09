import React, {Component} from 'react';
import WorldMap from './worldMap.component';
import MapThemeSelector from './mapThemeSelector.component';
class WorldNews extends Component {
    constructor(props)
  {
    super(props);
    this.state = {
            theme: 'normal.day',
        }

        this.onChange = this.onChange.bind(this);
  }
  onChange(evt) {
        evt.preventDefault();

        var change = evt.target.id;
        this.setState({
            "theme": change,
        });
    }
  render(){
    return(<div>
        <WorldMap lat="42.345978"
                    lng="-83.0405"
                    zoom="12"
                    theme={ this.state.theme }/>
                    <MapThemeSelector changeTheme={ this.onChange } /> 
        </div>);
  }
}
export default WorldNews;