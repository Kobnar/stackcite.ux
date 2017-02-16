import React, { Component } from 'react'

import { SUCCESS } from 'api/actions'

import { getFormData } from 'ux/utils'
import { InputGroup, TextAreaGroup } from 'ux/Forms'

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
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
    }

    clearForm () {
        this.setState({ ...emptyForm })
    }

    onChangeFactory (field) {
        return (event) => { this.setState({ [field]: event.target.value })}
    }

    handleSubmission (event) {
        event.preventDefault()
        var data = {}
        var nameData = {}
        if (this.state.title)
            nameData['title'] = this.state.title
        if (this.state.fullName)
            nameData['full'] = this.state.fullName
        if (nameData)
            data['name'] = nameData
        if (this.state.birth)
            data['birth'] = this.state.birth
        if (this.state.death)
            data['death'] = this.state.death
        if (this.state.description)
            data['description'] = this.state.description
        this.props.onSubmit(data)
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
                        
                    <input
                        type='submit'
                        className='button-primary'
                        disabled={this.props.loading}
                        value='Create'/>
                </fieldset>
            </form>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default CreateForm