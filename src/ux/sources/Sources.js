import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
    SOURCE,
    createSource,
    retrieveSourceCollection } from './actions'

import {
    retrieveSource,
    updateSource,
    deleteSource } from './detail/actions'

import Collection from './Collection'
import CreateForm from './CreateForm'
import { Detail } from './detail'

class Sources extends Component {

    constructor (props) {
        super(props)

        this.create = this.create.bind(this)
        this.retrieve = this.retrieve.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.retrieveCollection = this.retrieveCollection.bind(this)
    }

    componentWillMount () {
        var sourceId = this.props.routeParams.id
        if (sourceId) {
            this.retrieve(sourceId)
        } else {
            this.retrieveCollection({}, SOURCE)
        }
    }

    create = (data, type = SOURCE) => {
        return this.props.dispatch(
            createSource(data, type, this.props.authKey))
    }

    retrieve = (sourceId, type = SOURCE) => {
        return this.props.dispatch(
            retrieveSource(sourceId, type, this.props.authKey))
    }

    update = (sourceId, data, type = SOURCE) => {
        return this.props.dispatch(
            updateSource(data, sourceId, type, this.props.authKey))
    }

    delete = (sourceId, type = SOURCE) => {
        return this.props.dispatch(
            deleteSource(type, sourceId, type, this.props.authKey))
    }

    retrieveCollection = (query, type = SOURCE) => {
        return this.props.dispatch(
            retrieveSourceCollection(query, type, this.props.authKey))
    }

    render () {
        
        // Handle detail view
        var sourceId = this.props.routeParams.id
        if (sourceId) {
            var source = {}
            if (this.props.cache.sources)
                source = this.props.cache.sources[sourceId]
            return <Detail source={source}/>

        // Handle collection view
        } else {
            var sources = []
            if (this.props.cache.sources)
                Object.entries(this.props.cache.sources)
                    .forEach(([key, value]) => sources.push(value))

            return (
                <div>
                    <Collection
                        sources={sources}
                        onDelete={this.delete}/>

                    <div className='container'>
                        <h3>Create source</h3>
                        <CreateForm
                            onSubmit={this.create}
                            loading={this.props.loading}
                            errors={this.props.errors}/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    cache: state.api.cache
})

Sources = connect(mapStateToProps)(Sources)

export default Sources