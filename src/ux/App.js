import React, { Component } from 'react'
import { connect } from 'react-redux'

import { init } from './actions'

import NavigationBar from './NavigationBar'

class App extends Component {

    componentWillMount () {
        this.props.dispatch(init())
    }

    render() {
        if (!this.props.init)
            return (
                <div className='App'>
                    <NavigationBar />

                    <div className='main'>
                        { this.props.children }
                    </div>
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