import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

const propTypes = {
    orgs: React.PropTypes.arrayOf(
        React.PropTypes.object).isRequired
}

class CollectionTable extends Component {

    _row = (org) => {
        var route = "/organizations/" + org.id
        return (
            <tr key={org.id}>
                <td>
                    <Link to={route}>
                        {org.name}
                    </Link>
                </td>
                <td className="text-right">
                    {org.established}
                </td>
            </tr>
        )
    }

    render = () => {
        return (
            <bs.Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="col-xs-3 text-right">Established</th>
                    </tr>
                </thead>
                <tbody>
                    { this.props.orgs.map(org => this._row(org)) }
                </tbody>
            </bs.Table>
        )
    }

    static propTypes = propTypes
}

export default CollectionTable