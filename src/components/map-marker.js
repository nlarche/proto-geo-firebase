import React, { PropTypes } from 'react';


const K_CIRCLE_SIZE = 20;
const K_STICK_SIZE = 10;
const K_STICK_WIDTH = 3;

const greatPlaceCircleStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: K_CIRCLE_SIZE,
    height: K_CIRCLE_SIZE,
    border: '3px solid #f44336',
    borderRadius: K_CIRCLE_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    color: '#3f51b5',
    fontSize: 12,
    fontWeight: 'bold',
    padding: 0,
    cursor: 'pointer',
    boxShadow: '0 0 0 1px white'
};

const greatPlaceCircleStyleHover = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: K_CIRCLE_SIZE,
    height: K_CIRCLE_SIZE,
    borderRadius: K_CIRCLE_SIZE,
    backgroundColor: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 0,
    cursor: 'pointer',
    boxShadow: '0 0 0 1px white',
    border: '3px solid #3f51b5',
    color: '#f44336'
};

const greatPlaceStickStyle = {
    position: 'absolute',
    left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
    top: K_CIRCLE_SIZE,
    width: K_STICK_WIDTH,
    height: K_STICK_SIZE,
    backgroundColor: '#f44336'
};

const greatPlaceStickStyleHover = {
    position: 'absolute',
    left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
    top: K_CIRCLE_SIZE,
    width: K_STICK_WIDTH,
    height: K_STICK_SIZE,
    backgroundColor: '#3f51b5'
};

const greatPlaceStickStyleShadow = {
  position: 'absolute',
  left: K_CIRCLE_SIZE / 2 - K_STICK_WIDTH / 2,
  top: K_CIRCLE_SIZE,
  width: K_STICK_WIDTH,
  height: K_STICK_SIZE,
  backgroundColor: '#f44336',
  boxShadow: '0 0 0 1px white'
};


export default class MapMarker extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {

        const style = {
            position: 'absolute',
            width: K_CIRCLE_SIZE,
            height: K_CIRCLE_SIZE + K_STICK_SIZE,
            left: -K_CIRCLE_SIZE / 2,
            top: -(K_CIRCLE_SIZE + K_STICK_SIZE),
            zIndex: this.props.$hover ? 1000 : 800
        };

        const circleStyle = this.props.$hover ? greatPlaceCircleStyleHover : greatPlaceCircleStyle;
        const stickStyle = this.props.$hover ? greatPlaceStickStyleHover : greatPlaceStickStyle;

        return (
            <div style={style}>
                <div style={greatPlaceStickStyleShadow} />
                <div style={circleStyle}>
                    {this.props.marker.location.info.address}
                </div>
                <div style={stickStyle} />
            </div>
        );
    }
}
