import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push } from 'react-router-redux'

import { filterCollection } from 'ux/utils'
import CollectionSearch from 'ux/CollectionSearch'

import { retrieveCollection } from './actions'

const AddButton = ({ onClick }) => {
    return (
        <button
            className='button-outline float-right'
            style={{margin: '0.5rem 0', padding: '0 1.5rem 0 0.5rem'}}
            onClick={onClick}>
            <span className='glyphicons glyphicons-plus' style={{fontSize: '1.6rem', lineHeight: '2.4rem'}} />
            Add
        </button>
    )
}

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
            <div className='container'>
                <div className='page-title'>
                    <h1>People</h1>
                    { this.props.authKey ?
                        <AddButton
                            onClick={() => this.props.dispatch(push('/people/add'))} />
                        : null
                    }
                    <hr />
                </div>
                <div id='collection'>
                    <CollectionSearch
                        retrieve={this.retrieve} />
                    <CollectionTable
                        people={people} />
                </div>
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