import React, { PropTypes } from 'react';

import Style from './map-marker.css';

export default class MapMarker extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
       const style = this.props.$hover ? Style.markerHover : Style.marker;
        return (
            <div className={style}>
            </div>
        );
    }
}
