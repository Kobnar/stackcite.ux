import React, { Component } from 'react';

import Breadcrumbs from 'ux/Breadcrumbs'

class Home extends Component {
    render () {
        return (
            <div id='home'>
                <Breadcrumbs path={this.props.location.pathname} />

                <div className="container">
                    <h1 className="page-title">Welcome to StackCite!</h1>

                    <p>Do you read a lot? Do you index what you read? Let me guess, you like to cite the things you read, too.
                    Well we have good news: now you have a place to put all those lovely citations.</p>
                </div>
            </div>
        )
    }
}

export default Home;