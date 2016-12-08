import React, { Component } from 'react';

import NavigationBar from './NavigationBar'

import './css/App.css'

class App extends Component {
    render() {
        return (
            <div className="App">
                <NavigationBar/>
                <div className="main-container">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

export default App;
