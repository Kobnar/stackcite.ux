import React, { Component } from 'react'
import { connect } from 'react-redux'

import { 
    createSource,
    retrieveSource,
    updateSource,
    deleteSource,
    retrieveSourceCollection } from './actions'

import Detail from './Detail'
import Collection from './Collection'
import CreateForm from './CreateForm'

class Sources extends Component {

    constructor (props) {
        super(props)

        this.sourceId = this.props.routeParams.id

        this.create = this.create.bind(this)
        this.retrieve = this.retrieve.bind(this)
        this.update = this.update.bind(this)
        this.delete = this.delete.bind(this)
        this.retrieveCollection = this.retrieveCollection.bind(this)
    }

    componentWillMount () {
        if (this.sourceId) {
            this.retrieve(this.sourceId)
        } else {
            this.retrieveCollection()
        }
    }

    create = (data) => {
        return this.props.dispatch(
            createSource(data, this.props.tokenKey))
    }

    retrieve = (sourceId) => {
        return this.props.dispatch(
            retrieveSource(sourceId, this.props.tokenKey))
    }

    update = (sourceId, data) => {
        return this.props.dispatch(
            updateSource(sourceId, data, this.props.tokenKey))
    }

    delete = (sourceId) => {
        return this.props.dispatch(
            deleteSource(sourceId, this.props.tokenKey))
    }

    retrieveCollection = () => {
        return this.props.dispatch(
            retrieveSourceCollection(this.props.tokenKey))
    }

    render () {

        var sourceId = this.props.routeParams.id
        if (sourceId) {
            var source = {}
            if (this.props.cache.sources)
                source = this.props.cache.sources[sourceId]
            return <Detail source={source}/>

        } else {
            var sources = []
            if (this.props.cache.sources)
                Object.entries(this.props.cache.sources)
                    .forEach(([key, value]) => sources.push(value))
            return (
                <div>
                    <Collection sources={sources}/>

                    <div className='container'>
                        <h3>Add source</h3>
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
    tokenKey: state.api.auth.token.key,
    cache: state.api.cache
})

Sources = connect(mapStateToProps)(Sources)

export default Sources