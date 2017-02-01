import React, { Component } from 'react'
import { connect } from 'react-redux'

import Collection from './Collection'
import Detail from './Detail'

import * as actions from '../../api/organizations/actions'

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
            actions.createOrg(data, this.props.tokenKey)
        )
    }

    retrieveOrg = (orgId) => {
        this.props.dispatch(
            actions.retrieveOrg(this.props.tokenKey, orgId)
        )
    }

    updateOrg = (orgId, data) => {
        this.props.dispatch(
            actions.updateOrg(this.props.tokenKey, orgId, data)
        )
    }
    
    deleteOrg = (orgId) => {
        this.props.dispatch(
            actions.deleteOrg(this.props.tokenKey, orgId)
        )
    }

    retrieveOrgs = () => {
        this.props.dispatch(
            actions.retrieveOrgs(this.props.tokenKey)
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