import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from './actions'

import NavigationBar from './NavigationBar'

import './css/app.css'

class App extends Component {

    componentWillMount () {
        this.props.dispatch(init())
    }

    render() {
        if (!this.props.init)
            return (
                <div className="App">
                    <NavigationBar />

                    { this.props.children }
                </div>
            )
        else
            return (
                <div className='container'>
                    <p>Loading...</p>
                </div>
            )
    }
}

const mapStateToProps = (state) => ({
    init: state.ux.init
})

export default connect(mapStateToProps)(App)