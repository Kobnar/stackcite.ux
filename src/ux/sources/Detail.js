import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

import { SUCCESS } from '../../api/actions'

import CollectionTable from './CollectionTable'

const propTypes = {
    source: React.PropTypes.object
}

const defaultProps = {
    source: {}
}

class Detail extends Component {
    render () {
        var source = this.props.source
        if (this.props.source)
            return (
                <div className='container'>
                    <h1 className="page-title">{source.title} { source.published ? <small>({source.published})</small> : null }</h1>
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