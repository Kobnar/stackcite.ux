import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

import {
    createDocument,
    retrieveCollection } from './actions'

import Breadcrumbs from 'ux/Breadcrumbs'
import CollectionSearch from 'ux/CollectionSearch'
import CreateForm from './CreateForm'

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
        <bs.Table>
            <thead>
                <tr>
                    <th>Name</th>
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

    constructor (props) {
        super(props)

        this.create = this.create.bind(this)
        this.retrieve = this.retrieve.bind(this)
    }

    componentWillMount () {
        this.retrieve({})
    }

    create (data) {
        return this.props.dispatch(
            createDocument(data, this.props.authKey))
    }

    retrieve (query) {
        return this.props.dispatch(
            retrieveCollection(query, this.props.authKey))
    }

    render () {
        if (this.props.people)
            return (
                <div id='collection'>
                    <Breadcrumbs path={this.props.location.pathname} />

                    <div className='container'>
                        <h1 className='page-title'>People</h1>

                        <CollectionSearch
                            retrieve={this.retrieve} />

                        <CollectionTable
                            people={this.props.people} />
                    </div>

                    <div className='container'>
                        <h3>Create Person</h3>
                        <CreateForm
                            onSubmit={this.create}
                            loading={this.props.loading}
                            errors={this.props.errors} />
                    </div>
                </div>
            )
        
        else
            return <p>Loading...</p>
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people
})

export default connect(mapStateToProps)(Collection)