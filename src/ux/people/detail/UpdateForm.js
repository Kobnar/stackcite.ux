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
            birth: this.props.person.birth,
            death: this.props.person.death,
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
            birth: this.state.birth || null,
            death: this.state.death || null,
            description: this.state.description
        }
        this.props.onSubmit(data)
    }

    render () {
        var formErrors = this.props.errors
        var nameErrors = formErrors.name || {}
        return (
            <form onSubmit={this.handleSubmission}>
                <fieldset>
                    <TitleInput
                        state={this.state.title}
                        error={nameErrors.title}
                        onChange={this.onChangeFactory('title')} />

                    <FullNameInput
                        state={this.state.fullName}
                        error={nameErrors.full}
                        onChange={this.onChangeFactory('fullName')} />
                    
                    <div className='row'>
                        <div className='column'>
                            <InputGroup
                                id='birth'
                                type='number'
                                label='Birth (year)'
                                value={this.state.birth}
                                error={!!formErrors.birth}
                                errorMsg={formErrors.birth}
                                onChange={this.onChangeFactory('birth')}
                                srOnly={false} />
                        </div>
                        <div className='column'>
                            <InputGroup
                                id='death'
                                type='number'
                                label='Death (year)'
                                value={this.state.death}
                                error={!!formErrors.death}
                                errorMsg={formErrors.death}
                                onChange={this.onChangeFactory('death')}
                                srOnly={false} />
                        </div>
                    </div>

                    <DescriptionTextArea
                        state={this.state.description}
                        error={formErrors.description}
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