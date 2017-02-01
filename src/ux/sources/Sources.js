import React, { Component } from 'react'
import { connect } from 'react-redux'

import sources from '../../api/sources/actions'

import Detail from './Detail'
import Collection from './Collection'
import CreateForm from './CreateForm'

class Sources extends Component {

    componentWillMount () {
        var sourceId = this.props.routeParams.id
        if (sourceId) {
            this.retrieveSource(sourceId)
        } else {
            this.retrieveSources()
        }
    }

    createSource = (data) => {
        return this.props.dispatch(
            sources.create(data, this.props.tokenKey))
    }

    retrieveSource = (sourceId) => {
        return this.props.dispatch(
            sources.retrieve(sourceId, this.props.tokenKey))
    }

    updateSource = (sourceId, data) => {
        return this.props.dispatch(
            sources.update(sourceId, data, this.props.tokenKey))
    }

    deleteSource = (sourceId) => {
        return this.props.dispatch(
            sources.delete(sourceId, this.props.tokenKey))
    }

    retrieveSources = () => {
        return this.props.dispatch(
            sources.retrieveCollection(this.props.tokenKey))
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
                            createSource={this.createSource}
                            loading={this.props.loading}
                            errors={this.props.errors}/>
                    </div>
                </div>
            )
        }
    }
}

const mapStateToProps = (state) => ({
    tokenKey: state.api.users.auth.token.key,
    cache: state.api.cache
})

Sources = connect(mapStateToProps)(Sources)

export default Sources