import React, { Component } from 'react'

import { InputGroup } from 'ux/Forms'

import { SUCCESS } from 'api/actions'

const propTypes = {
    person: React.PropTypes.object.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

const defaultProps = {
    loading: false,
    errors: {}
}

const TitleInput = ({state, error, onChange}) => {
    return (
        <InputGroup
            id='title'
            type='text'
            label='Title'
            placeholder='Title (e.g. "J.N. Doe")'
            value={state}
            error={!!error}
            errorMsg={error}
            onChange={onChange}
            srOnly={false} />
    )
}

const FullNameInput = ({state, error, onChange}) => {
    return (
        <InputGroup
            id='full-name'
            type='text'
            label='Full name'
            placeholder='Full name (e.g. "John Nobody Doe")'
            value={state}
            error={!!error}
            errorMsg={error}
            onChange={onChange}
            srOnly={false} />
    )
}

const DescriptionTextArea = ({state, error, onChange}) => {
    return (
        <div className='form-group'>
            <label
                htmlFor='description'>
                Description
            </label>
            <textarea
                id='description'
                placeholder='Description'
                value={state}
                onChange={onChange} />
        </div>
    )
}

class UpdateForm extends Component {

    constructor (props) {
        super(props)

        this.state = {
            title: this.props.person.name.title,
            fullName: this.props.person.name.full,
            description: this.props.person.description || ''
        }

        this.onChangeFactory = this.onChangeFactory.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
    }

    onChangeFactory (field) {
        return (event) => { this.setState({ [field]: event.target.value })}
    }

    handleSubmission (event) {
        event.preventDefault()
        var data = {
            name: {
                title: this.state.title,
                full: this.state.fullName
            },
            description: this.state.description
        }
        this.props.onSubmit(data)
    }

    render () {
        return (
            <form onSubmit={this.handleSubmission}>
                <fieldset>
                    <TitleInput
                        state={this.state.title}
                        error={this.props.errors.title}
                        onChange={this.onChangeFactory('title')} />

                    <FullNameInput
                        state={this.state.fullName}
                        error={this.props.errors.fullName}
                        onChange={this.onChangeFactory('fullName')} />

                    <DescriptionTextArea
                        state={this.state.description}
                        error={this.props.errors.description}
                        onChange={this.onChangeFactory('description')} />
                        
                    <input
                        type='submit'
                        className='button-primary float-right'
                        disabled={this.props.loading}
                        value='Save'/>
                </fieldset>
            </form>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default UpdateForm