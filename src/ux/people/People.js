import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    createPerson,
    retrievePeopleCollection } from './actions'

import Collection from './Collection'
import CreateForm from './CreateForm'


class People extends Component {

    constructor (props) {
        super(props)

        this.create = this.create.bind(this)
        this.retrieveCollection = this.retrieveCollection.bind(this)
    }

    componentWillMount () {
        var personId = this.props.routeParams.id
        if (personId) {
            // Not implemented
        } else {
            this.retrieveCollection({})
        }
    }

    create = (data) => {
        return this.props.dispatch(
            createPerson(data, this.props.authKey))
    }

    retrieveCollection = (query) => {
        return this.props.dispatch(
            retrievePeopleCollection(query, this.props.authKey))
    }

    render () {

        // Handle detail view
        var personId = this.props.routeParams.id
        if (personId) {
            var person = {}
            if (this.props.cache.people)
                person = this.props.cache.people[personId]
        }

        //Handle collection view
        else {
            var people = []
            if (this.props.cache.people)
                Object.entries(this.props.cache.people)
                    .forEach(([key, value]) => people.push(value))
            return (
                <div>
                        <Collection
                            people={people} />

                        <div className='container'>
                            <h3>Create Person</h3>
                            <CreateForm
                                onSubmit={this.create}
                                loading={this.props.loading}
                                errors={this.props.errors} />
                        </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    cache: state.api.cache,
    loading: state.ux.people.loading,
    errors: state.ux.people.errors
})

export default connect(mapStateToProps)(People)