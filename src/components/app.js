import React from 'react';

const App = React.createClass({
    getInitialState() {
        return {
            text: ''
        };
    },
    handleSubmit(e) {
        e.preventDefault();
        const address = this.refs.address.value;
        this.refs.adressForm.reset();
        this.refs.address.focus();

        this.setState({
            text: address
        });
    },
    render() {
        return (
            <div>
                <form ref="adressForm" onSubmit={ this.handleSubmit }>
                    <input type="text" ref="address" placeholder="address" />
                </form>
                { this.state.text }
            </div>
        );
    }
});

export default App;