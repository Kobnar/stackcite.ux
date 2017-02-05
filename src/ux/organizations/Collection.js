import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import orgsEndpoint from '../../api/organizations/actions'

import CollectionTable from './CollectionTable'
import AddOrgForm from './AddOrgForm'

class Collection extends Component {

    constructor (props) {
        super (props)
    }

    componentDidMount() {
        this.props.retrieveOrgs(this.props.tokenKey)
    }

    createOrg = (data) => {
        var tokenKey = this.props.tokenKey
        return this.props.createOrg(data, this.props.tokenKey)
    }

    render = () => {
        var orgs = []
        if (this.props.cache.organizations)
            Object.entries(this.props.cache.organizations)
                .forEach(([orgId, org]) => orgs.push(org))

        return (
            <div className="container">
                <h1 className="page-title">Organizations</h1>
                
                <CollectionTable orgs={orgs}/>

                { this.props.tokenKey ?
                    <AddOrgForm
                        createOrg={this.createOrg}
                        errors={this.props.errors}/> :
                    null }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    tokenKey: state.api.users.auth.token.key,
    cache: state.api.cache,
    errors: state.ux.orgs.errors
})

const mapDispatchToProps = (dispatch) => ({
    createOrg (data, tokenKey) {
        return dispatch(orgsEndpoint.create(data, tokenKey))},
    retrieveOrgs (tokenKey) {
        return dispatch(orgsEndpoint.retrieveCollection(tokenKey)) }
})

Collection = connect(mapStateToProps, mapDispatchToProps)(Collection)

export default Collection