import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import { filterCollection } from 'ux/utils'
import CollectionSearch from 'ux/CollectionSearch'

import { retrieveCollection } from './actions'

const CollectionRow = ({ person, onDelete }) => {
    var route = '/people/' + person.id
    return (
        <tr>
            <td>
                <Link to={route}>
                    {person.name.title}
                </Link>
            </td>
            <td>
            </td>
        </tr>
    )
}

const CollectionTable = ({ people, onDelete }) => {

    var rows = []
    Object.entries(people).forEach(([id, person]) => rows.push(
        <CollectionRow
            key={person.id}
            person={person}
            onDelete={onDelete} />
    ))
    
    return (
        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th className='col-sm-1' />
                </tr>
            </thead>
            <tbody>
                { rows }
            </tbody>
        </table>
    )
}

class Collection extends Component {

    constructor (props) {
        super(props)

        this.retrieve = this.retrieve.bind(this)
    }

    componentWillMount () {
        this.retrieve({})
    }

    retrieve (query) {
        return this.props.dispatch(
            retrieveCollection(query, this.props.authKey))
    }

    render () {
        var people = filterCollection(this.props.people, this.props.filter)
        return (
            <div id='collection'>
                <CollectionSearch
                    retrieve={this.retrieve} />
                <CollectionTable
                    people={people} />
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people || {},
    filter: state.ux.people.ids
})

export default connect(mapStateToProps)(Collection)