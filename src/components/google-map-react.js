import React, { PropTypes } from 'react';
import GoogleMap from 'google-map-react';

import MapMarker from './map-marker.js';
import { GOOGLE_API_KEY } from '../configuration.js';

class Map extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div>
                <GoogleMap
                    bootstrapURLKeys={{
                        key: GOOGLE_API_KEY,
                        language: 'fr',
                    }}
                    defaultCenter={ this.props.defaultCenter }
                    defaultZoom={ this.props.zoom}
                    center={this.props.center}
                    >
                    { this.props.data.map((d) => {
                        return <MapMarker key={d.key}
                            lat={d.latitude}
                            lng={d.longitude}
                            marker={d}
                            />;
                    }) }
                </GoogleMap>
            </div >
        );
    }
}
export default Map;
