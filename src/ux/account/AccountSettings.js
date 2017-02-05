import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

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

                    <bs.Button
                        block
                        type='submit'
                        bsStyle='primary'
                        disabled={this.props.loading}>
                        Save
                    </bs.Button>
                </form>
            </div>
        )
    }

    static propTypes = propTypes
}

export default AccountSettings