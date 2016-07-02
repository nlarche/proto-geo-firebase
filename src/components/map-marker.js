import React, { PropTypes } from 'react';

import Style from './map-marker.css';

export default class MapMarker extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {

        return (
            <div className={Style.marker}>
            </div>
        );
    }
}
