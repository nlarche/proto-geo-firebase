import React from 'react';
import { findDOMNode } from 'react-dom';

import Style from './search-box.css';

class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.onPlacesChanged = this.onPlacesChanged.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleFocus = this.handleFocus.bind(this);

  }
  onPlacesChanged() {
    if (this.props.onPlacesChanged) {
      this.props.onPlacesChanged(this.searchBox.getPlaces());
    }
  }
  handleFocus() {
    this.refs.form.reset();
    this.refs.input.focus();
  }
  handleSubmit(e) {
    e.preventDefault();
    this.refs.input.blur();
  }
  componentDidMount() {
    const input = findDOMNode(this.refs.input);
    this.searchBox = new google.maps.places.SearchBox(input);
    this.searchBox.addListener('places_changed', this.onPlacesChanged);
  }
  componentWillUnmount() {
    this.searchBox.removeListener('places_changed', this.onPlacesChanged);
  }
  render() {
    return (
      <div className={Style.searchBox}>
        <form className={Style.searchBox} ref="form" onSubmit={this.handleSubmit} >
          <input className={Style.searchBoxInput} ref="input" onFocus={ this.handleFocus }
            placeholder={this.props.placeholder}  type="text"/>
        </form>
      </div>);
  }
}
SearchBox.propTypes = {
  placeholder: React.PropTypes.string,
  onPlacesChanged: React.PropTypes.func
};
SearchBox.defaultProps = {
  placeholder: "adresse",
};

export default SearchBox;
