import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

import { SUCCESS } from 'api/actions'

const propTypes = {
    source: React.PropTypes.object
}

const defaultProps = {
    source: {}
}

const SourceTitle = ({ title, detail }) => {
    return (
        <h1 className='page-title'>{title} { detail ? <small>({detail})</small> : null}</h1>
    )
}

class Detail extends Component {
    render () {
        var source = this.props.source
        if (this.props.source)
            return (
                <div className='container'>
                    <SourceTitle title={source.title} detail={source.edition} />
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

export default Detail