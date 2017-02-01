import React, { Component } from 'react'
import { connect } from 'react-redux'

import Collection from './Collection'
import Detail from './Detail'

import orgsEndpoint from '../../api/organizations/actions'

class Organizations extends Component {

    componentWillMount = () => {
        var orgId = this.props.routeParams.id
        if (orgId) {
            this.retrieveOrg(orgId)
        } else {
            this.retrieveOrgs()
        }
    }

    createOrg = (data) => {
        this.props.dispatch(
            orgsEndpoint.create(data, this.props.tokenKey)
        )
    }

    retrieveOrg = (orgId) => {
        this.props.dispatch(
            orgsEndpoint.retrieve(orgId, this.props.tokenKey)
        )
    }

    updateOrg = (orgId, data) => {
        this.props.dispatch(
            orgsEndpoint.update(orgId, data, this.props.tokenKey)
        )
    }
    
    deleteOrg = (orgId) => {
        this.props.dispatch(
            orgsEndpoint.delete(orgId, this.props.tokenKey)
        )
    }

    retrieveOrgs = () => {
        this.props.dispatch(
            orgsEndpoint.retrieveCollection(this.props.tokenKey)
        )
    }

    render () {
        var orgId = this.props.routeParams.id
        if (orgId) {
            var org = this.props.cache.organizations[orgId]
            return <Detail
                organization={org}
                retrieveMethod={this.retrieveOrg}
                updateMethod={this.updateOrg}
                deleteMethod={this.deleteOrg}/>
        } else
            return <Collection
                retrieveMethod={this.retrieveOrgs}/>
    }
}

const mapStateToProps = (state) => ({
    tokenKey: state.api.users.auth.token.key,
    loading: state.api.orgs.loading,
    cache: state.api.cache
})

Organizations = connect(mapStateToProps)(Organizations)

export default Organizations