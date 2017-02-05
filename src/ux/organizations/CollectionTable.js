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
                <td>
                    <bs.ButtonToolbar className="pull-right">
                        <bs.ButtonGroup>
                            <bs.Button bsSize="xsmall"><bs.Glyphicon glyph="pencil"/></bs.Button>
                            <bs.Button bsSize="xsmall"><bs.Glyphicon glyph="link"/></bs.Button>
                            <bs.Button bsSize="xsmall"><bs.Glyphicon glyph="share"/></bs.Button>
                            <bs.Button bsSize="xsmall"><bs.Glyphicon glyph="remove"/></bs.Button>
                        </bs.ButtonGroup>
                    </bs.ButtonToolbar>
                </td>
            </tr>
        )
    }

    render = () => {
        return (
            <bs.Table hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th className="col-xs-1 text-right">Established</th>
                        <th style={{width: '120px'}}/>
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