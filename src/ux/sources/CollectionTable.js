import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

const propTypes = {
    sources: React.PropTypes.arrayOf(
        React.PropTypes.object)
}

const defaultProps = {
    sources: []
}

class CollectionTable extends Component {

    tableRow (source) {
        var route = '/sources/' + source.id
        return (
            <tr key={source.id}>
                <td>
                    <Link to={route}>
                        {source.title}
                    </Link>
                </td>
            </tr>
        )
    }

    render () {
        return (
            <bs.Table>
                <thead>
                    <tr>
                        <th>Title</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.sources.map(source => this.tableRow(source)) }
                </tbody>
            </bs.Table>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default CollectionTable