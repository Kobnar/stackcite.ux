import React, { Component } from 'react'

import Collection from './Collection'
import Detail from './Detail'

class Organizations extends Component {
    render () {
        if (this.props.routeParams.id)
            return <Detail orgId={this.props.routeParams.id}/>
        else
            return <Collection/>
    }
}

export default Organizations