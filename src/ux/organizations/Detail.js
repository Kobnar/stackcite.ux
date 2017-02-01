import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import * as actions from '../../api/organizations/actions'

const propTypes = {
    organization: React.PropTypes.object
}

class Detail extends Component {

    render = () => {
        return (
                <div className="container">
                    <div>
                        <h1>{this.props.organization.name} <small>({this.props.organization.established})</small></h1>
                    </div>
                </div>
        )
    }

    static propTypes = propTypes
}

export default Detail