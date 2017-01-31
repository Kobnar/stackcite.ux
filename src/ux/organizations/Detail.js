import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import * as actions from '../../api/organizations/actions'

class Detail extends Component {

    constructor (props) {
        super(props)

        this.state = {
            organization: {}
        }
    }

    componentWillMount () {
        this.props.retrieveOrganization(this.props.tokenKey, this.props.orgId)
            .then(action => this.setState({
                organization: this.props.cache.organizations[this.props.orgId]
            }))
    }

    _loading = () => {
        return <p>Loading...</p>
    }

    _detail = () => {
        return (
            <div>
                <h1>{this.state.organization.name} <small>({this.state.organization.established})</small></h1>
            </div>
        )
    }

    render = () => {
        var isLoaded = !!this.state.organization.id
        return (
                <div className="container">
                    { isLoaded ? 
                        this._detail() :
                        this._loading() }
                </div>
        )
    }

    static propTypes = {
        orgId: React.PropTypes.string.isRequired
    }
}

const mapStateToProps = (state) => ({
    tokenKey: state.api.users.auth.token.key,
    cache: state.api.cache
})

const mapDispatchToProps = (dispatch) => ({
    retrieveOrganization (tokenKey, orgId) {
        return dispatch(actions.retrieveOrg(tokenKey, orgId)) }
})

Detail = connect(mapStateToProps, mapDispatchToProps)(Detail)

export default Detail