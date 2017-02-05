import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as bs from 'react-bootstrap'

import { retrieve } from './actions'

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
        <bs.FormGroup
            validationState={error ? 'error' : null}>

            <bs.ControlLabel
                className='sr-only'>
                Email address
            </bs.ControlLabel>

            <bs.FormControl
                id='email'
                type='email'
                placeholder={placeholder || 'Email'}
                value={state}
                onChange={onChange}/>

            <bs.HelpBlock>{error}</bs.HelpBlock>

        </bs.FormGroup>
    )
}

const NewPasswordControl = ({state, error, onChange}) => {
    return <bs.FormGroup
        validationState={error ? 'error' : null}>

        <bs.ControlLabel
            className='sr-only'>
            New password
        </bs.ControlLabel>

        <bs.FormControl
            id='newPassword'
            type='password'
            placeholder='New password'
            value={state}
            onChange={onChange}/>

        <bs.HelpBlock>{error}</bs.HelpBlock>

    </bs.FormGroup>
}

const PasswordControl = ({state, error, onChange}) => {
    return <bs.FormGroup
        validationState={error ? 'error' : null}>

        <bs.ControlLabel
            className='sr-only'>
            Old password
        </bs.ControlLabel>

        <bs.FormControl
            id='password'
            type='password'
            placeholder='Current password'
            value={state}
            onChange={onChange}/>

        <bs.HelpBlock>{error}</bs.HelpBlock>

    </bs.FormGroup>
}

const GroupsControl = ({state, error, onChange}) => {
    return <bs.FormGroup
        validationState={error ? 'error' : null}>

        <bs.ControlLabel
            className='sr-only'>
            Groups
        </bs.ControlLabel>

        <bs.Checkbox
            id='usersGroup'
            value='users'
            checked={state.users}
            onChange={onChange}>
            Users
        </bs.Checkbox>

        <bs.Checkbox
            id='usersGroup'
            value='staff'
            checked={state.staff}
            onChange={onChange}>
            Staff
        </bs.Checkbox>

        <bs.Checkbox
            id='usersGroup'
            value='admin'
            checked={state.admin}
            onChange={onChange}>
            Administrators
        </bs.Checkbox>

        <bs.HelpBlock>{error}</bs.HelpBlock>

    </bs.FormGroup>
}

class Form extends Component {
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
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentWillMount () {
        var userId = this.props.auth.user.id
        var authKey = this.props.auth.token.key
        this.props.dispatch(retrieve(userId, authKey))
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
            if (value !== '') {
                formData[field] = value
            }
        }
        formData['groups'] = mapStateToGroups(this.state.groups)
        this.props.updateUser(this.props.tokenKey, this.props.userId, formData)
    }

    handleDelete(event) {
        this.props.deleteUser(this.props.tokenKey, this.props.userId)
    }

    form () {
        return (
            <div>
                <h1>Account Settings</h1>
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

                    <bs.Button
                        block
                        type='submit'
                        bsStyle='primary'
                        disabled={this.props.loading}>
                        Save
                    </bs.Button>
                </form>

                <h3>Delete account</h3>
                <bs.Button
                    block
                    bsStyle='danger'
                    disabled={this.props.loading}
                    onClick={this.handleDelete}>
                    Delete account
                </bs.Button>
            </div>
        )
    }

    render = () => {
        return this.form()
    }
}

const mapStateToProps = (state) => ({
    auth: state.api.auth,
    user: state.ux.account.user,
    loading: state.ux.account.loading,
    errors: state.ux.account.errors
})

export default connect(mapStateToProps)(Form)