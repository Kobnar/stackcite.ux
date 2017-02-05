import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

import CollectionTable from './CollectionTable'

const propTypes = {
    sources: React.PropTypes.arrayOf(
        React.PropTypes.object)
}

const defaultProps = {
    sources: []
}

class Collection extends Component {
    render () {
        if (this.props.sources)
            return (
                <div className='container'>
                    <h1 className="page-title">Sources</h1>
                    <CollectionTable sources={this.props.sources}/>
                </div>
            )
        else
            return <p>Loading...</p>
    }
}

export default Collection