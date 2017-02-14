import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

const propTypes = {
    sources: React.PropTypes.arrayOf(
        React.PropTypes.object),
    onDelete: React.PropTypes.func.isRequired
}

const defaultProps = {
    sources: []
}

const DeleteButton = ({ id, onDelete }) => {
    return (
        <bs.Glyphicon
            glyph='remove'
            className='pull-right'
            onClick={() => onDelete(id)}/>
    )
}

const CollectionRow = ({ source, onDelete }) => {
    var route = '/sources/' + source.id
    return (
        <tr>
            <td>
                <Link to={route}>
                    {source.title}
                </Link>
            </td>
            <td>
            </td>
        </tr>
    )
}

const CollectionTable = ({ sources, onDelete }) => {

    var rows = sources.map(source => 
        <CollectionRow
            key={source.id}
            source={source}
            onDelete={onDelete} />)

    return (
        <bs.Table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th className='col-sm-1' />
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </bs.Table>
    )
}

class Collection extends Component {
    render () {
        if (this.props.sources)
            return (
                <div className='container'>
                    <h1 className='page-title'>Sources</h1>
                    <CollectionTable
                        sources={this.props.sources}
                        onDelete={this.props.onDelete} />
                </div>
            )
        else
            return <p>Loading...</p>
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default Collection