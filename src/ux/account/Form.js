import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import * as bs from 'react-bootstrap'

import * as userActions from '../../api/users/actions'

class Form extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: "",
            newPassword: "",
            password: "",
            groups: {
                users: false,
                staff: false,
                admin: false
            }
        }

        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleNewPasswordChange = this.handleNewPasswordChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.handleGroupsChange = this.handleGroupsChange.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount() {
        if (!this.props.user.id)
            this.props.retrieveUser(this.props.tokenKey, this.props.userId)
                .then(action => {
                    // Maps list of groups to dict
                    var groups = {}
                    for (var group in this.state.groups)
                        groups[group] = !!this.props.user.groups.includes(group)
                    this.setState({ groups })
                })
    }

    handleEmailChange (event) { this.setState({email: event.target.value}) }
    handleNewPasswordChange (event) { this.setState({newPassword: event.target.value}) }
    handlePasswordChange (event) { this.setState({password: event.target.value}) }

    handleGroupsChange (event) { 
        var group = event.target.value
        var checked = event.target.checked
        this.setState({
            groups: {
                ...this.state.groups,
                [group]: checked
            }
        })
     }

    handleSubmission(event) {
        event.preventDefault();
        var formData = {}
        // Map state data
        for (var field in this.state) {
            var value = this.state[field]
            if (value !== "") {
                formData[field] = value
            }
        }
        // Map dict of groups to list of groups
        var groups = []
        for (var group in formData.groups) {
            if (formData.groups[group])
                groups.push(group)
        }
        // Replace dict of groups with list
        formData.groups = groups
        this.props.updateUser(this.props.tokenKey, this.props.userId, formData)
    }

    handleDelete(event) {
        this.props.deleteUser(this.props.tokenKey, this.props.userId)
    }

    _emailControl = (emailError) => {
        return (
            <bs.FormGroup
                validationState={emailError ? 'error' : null}>

                <bs.ControlLabel
                    className="sr-only">
                    Email address
                </bs.ControlLabel>

                <bs.FormControl
                    id="email"
                    type="email"
                    placeholder={this.props.user.email || "Email"}
                    value={this.state.email}
                    onChange={this.handleEmailChange}/>

                <bs.HelpBlock>{emailError}</bs.HelpBlock>

            </bs.FormGroup>
        )
    }

    _newPasswordControl = (newPasswordError) => {
        return (
            <bs.FormGroup
                validationState={newPasswordError ? 'error' : null}>

                <bs.ControlLabel
                    className="sr-only">
                    New password
                </bs.ControlLabel>

                <bs.FormControl
                    id="newPassword"
                    type="password"
                    placeholder={"New password"}
                    value={this.state.newPassword}
                    onChange={this.handleNewPasswordChange}/>

                <bs.HelpBlock>{newPasswordError}</bs.HelpBlock>

            </bs.FormGroup>
        )
    }

    _passwordControl = (passwordError) => {
        return (
            <bs.FormGroup
                validationState={passwordError ? 'error' : null}>

                <bs.ControlLabel
                    className="sr-only">
                    Old password
                </bs.ControlLabel>

                <bs.FormControl
                    id="password"
                    type="password"
                    placeholder={"Old password"}
                    value={this.state.password}
                    onChange={this.handlePasswordChange}/>

                <bs.HelpBlock>{passwordError}</bs.HelpBlock>

            </bs.FormGroup>
        )
    }

    _groupsControl = (groupsError) => {
        return (
            <bs.FormGroup
                validationState={groupsError ? 'error' : null}>

                <bs.ControlLabel
                    className="sr-only">
                    Groups
                </bs.ControlLabel>

                <bs.Checkbox
                    id="usersGroup"
                    value="users"
                    checked={this.state.groups.users}
                    onChange={this.handleGroupsChange}>
                    Users
                </bs.Checkbox>

                <bs.Checkbox
                    id="usersGroup"
                    value="staff"
                    checked={this.state.groups.staff}
                    onChange={this.handleGroupsChange}>
                    Staff
                </bs.Checkbox>

                <bs.Checkbox
                    id="usersGroup"
                    value="admin"
                    checked={this.state.groups.admin}
                    onChange={this.handleGroupsChange}>
                    Administrators
                </bs.Checkbox>

                <bs.HelpBlock>{groupsError}</bs.HelpBlock>

            </bs.FormGroup>
        )
    }

    _form = () => {
        var emailError = this.props.errors.email
        var newPasswordError = this.props.errors.new_password
        var passwordError = this.props.errors.password
        var groupsError = this.props.errors.groups
        return (
            <div>
                <h1>Account Settings</h1>
                <form onSubmit={this.handleSubmission}>

                    <h3>Profile</h3>

                    {this._emailControl(emailError)}

                    <h3>Security</h3>

                    <h4>Update password</h4>

                    {this._newPasswordControl(newPasswordError)}
                    {this._passwordControl(passwordError)}

                    <h4>Modify groups</h4>

                    {this._groupsControl(groupsError)}

                    <bs.Button
                        block
                        type="submit"
                        bsStyle="primary"
                        disabled={this.props.loading}>
                        Save
                    </bs.Button>
                </form>

                <h3>Delete account</h3>
                <bs.Button
                    block
                    bsStyle="danger"
                    disabled={this.props.loading}
                    onClick={this.handleDelete}>
                    Delete account
                </bs.Button>
            </div>
        )
    }

    render = () => {
        return this._form()
    }

}

const mapStateToProps = (state) => ({
    loading: state.api.users.loading,
    user: state.ux.account.user,
    errors: state.ux.account.errors
})

const mapDispatchToProps = (dispatch) => ({
    retrieveUser(tokenKey, userId) {
        return dispatch(userActions.retrieveUser(tokenKey, userId)) },
    updateUser(tokenKey, userId, data) {
        return dispatch(userActions.updateUser(tokenKey, userId, data)) },
    deleteUser(tokenKey, userId) {
        return dispatch(userActions.deleteUser(tokenKey, userId))
            .then(dispatch(push("/")))}
})

export default connect(mapStateToProps, mapDispatchToProps)(Form)