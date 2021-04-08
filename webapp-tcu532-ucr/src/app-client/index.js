import React, { Component } from 'react';
import ReactDOM, { render } from 'react-dom';

class App extends Component {
    render() {
        return (
            <h1>OK!</h1>
        )
    }
}

render(<App/>, document.getElementById('app'));