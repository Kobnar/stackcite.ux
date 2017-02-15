import React, { Component } from 'react'

import { InputGroup } from 'ux/Forms'

const propTypes = {
    user: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

const mapGroupsToState = (groups) => {
    console.log(groups)
    var newGroups = {}
    for (var group in groups)
        newGroups[group] = !!groups.includes(group)
    return newGroups
}

const mapStateToGroups = (groups) => {
    var newGroups = []
    for (var group in groups) {
        if (groups[group])
            newGroups.push(group)
    }
    return newGroups
}

const EmailControl = ({placeholder, state, error, onChange}) => {
    return (
        <InputGroup
            id='email'
            type='email'
            label='Email'
            placeholder={placeholder}
            value={state}
            error={error}
            errorMsg={error}
            onChange={onChange}/>
    )
}

const NewPasswordControl = ({state, error, onChange}) => {
    return (
        <InputGroup
            id='new-password'
            type='password'
            label='New Password'
            value={state}
            error={error}
            errorMsg={error}
            onChange={onChange}/>
    )
}

const PasswordControl = ({state, error, onChange}) => {
    return  (
        <InputGroup
            id='password'
            type='password'
            label='Current Password'
            value={state}
            error={error}
            errorMsg={error}
            onChange={onChange}/>
    )
}

const GroupsControl = ({state, error, onChange}) => {
    return (
        <div className='form-group'>
            <label className='label-inline' forHtml='usersGroup'>
                <input
                    id='usersGroup'
                    type='checkbox'
                    value='users'
                    checked={state.users}
                    onChange={onChange} />
                Users
            </label>

            <label className='label-inline' forHtml='usersGroup'>
                <input
                    id='staffGroup'
                    type='checkbox'
                    value='staff'
                    checked={state.staff}
                    onChange={onChange} />
                Staff
            </label>

            <label className='label-inline' forHtml='usersGroup'>
                <input
                    id='adminGroup'
                    type='checkbox'
                    value='admin'
                    checked={state.admin}
                    onChange={onChange} />
                Administrators
            </label>

            { error ? <p className='help-block error'>{error}</p> : null}
        </div>
    )
}

class AccountSettings extends Component {
    constructor (props) {
        super(props)

        this.state = {
            email: '',
            newPassword: '',
            password: '',
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
        // var formData = {
        //     [email]: this.state.email,
        //     [password]: this.state.password,
        //     [new_password]: this.state.newPassword,
        //     [groups]: mapStateToGroups(this.state.groups)
        // }
        // this.props.onSubmit(formData)
    }

    render = () => {
        return (
            <div>
                <h2>Account Settings</h2>
                <form onSubmit={this.handleSubmission}>

                    <h3>Profile</h3>

                    <EmailControl
                        placeholder={this.props.user.email}
                        state={this.state.email}
                        error={this.props.errors.email}
                        onChange={this.handleEmailChange} />

                    <h3>Security</h3>

                    <h4>Update password</h4>
                    <NewPasswordControl
                        state={this.state.newPassword}
                        error={this.props.errors.new_password}
                        onChange={this.handleNewPasswordChange} />
                    <PasswordControl
                        state={this.state.password}
                        error={this.props.errors.password}
                        onChange={this.handlePasswordChange} />

                    <h4>Modify groups</h4>

                    <GroupsControl
                        state={this.state.groups}
                        error={this.props.errors.groups}
                        onChange={this.handleGroupsChange} />
                        
                    <input
                        type='submit'
                        className='button-primary'
                        disabled={this.props.loading}
                        value='Save'/>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default AccountSettings