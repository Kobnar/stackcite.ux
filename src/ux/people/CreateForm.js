import React, { Component } from 'react'

import { SUCCESS } from 'api/actions'

import { getFormData } from 'ux/utils'
import { InputGroup, TextAreaGroup } from 'ux/Forms'

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object,
    onCancel: React.PropTypes.func
}

const defaultProps = {
    loading: false,
    errors: {}
}

const emptyForm = {
    title: '',
    fullName: '',
    birth: '',
    death: '',
    description: ''
}

class CreateForm extends Component {

    constructor (props) {
        super(props)

        this.state = { ...emptyForm }

        this.onChangeFactory = this.onChangeFactory.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    clearForm () {
        this.setState({ ...emptyForm })
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

    handleCancel (event) {
        event.preventDefault()
        this.props.onCancel()
    }

    render () {
        var formErrors = this.props.errors
        var nameErrors = formErrors.name || {}
        return (
            <form onSubmit={this.handleSubmission}>
                <fieldset>
                    <InputGroup
                        id='title'
                        type='text'
                        label='Title'
                        value={this.state.title}
                        error={!!nameErrors.title}
                        errorMsg={nameErrors.title}
                        onChange={this.onChangeFactory('title')} />

                    <InputGroup
                        id='full-name'
                        type='text'
                        label='Full name'
                        value={this.state.fullName}
                        error={!!nameErrors.full}
                        errorMsg={nameErrors.full}
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
                                onChange={this.onChangeFactory('birth')} />
                        </div>
                        <div className='column'>
                            <InputGroup
                                id='death'
                                type='number'
                                label='Death (year)'
                                value={this.state.death}
                                error={!!formErrors.death}
                                errorMsg={formErrors.death}
                                onChange={this.onChangeFactory('death')} />
                        </div>
                    </div>

                    <TextAreaGroup
                        id='description'
                        label='Description'
                        value={this.state.description}
                        error={!!formErrors.description}
                        errorMsg={formErrors.description}
                        onChange={this.onChangeFactory('description')} />
                    
                    <div className='float-right'>
                        <input
                            type='submit'
                            className='button-primary'
                            disabled={this.props.loading}
                            value='Create'/>

                        { this.props.onCancel ?
                            <input
                                type='button'
                                className='button-outline'
                                onClick={this.handleCancel}
                                value='Cancel'
                                style={{marginLeft: '0.5rem'}} />
                            : null
                        }
                    </div>
                </fieldset>
            </form>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default CreateForm