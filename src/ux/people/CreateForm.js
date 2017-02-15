import React, { Component } from 'react'

import { InputGroup } from 'ux/Forms'

import { SUCCESS } from 'api/actions'

const propTypes = {
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
            value={state}
            error={!!error}
            errorMsg={error}
            onChange={onChange} />
    )
}

const emptyForm = {
    title: ''
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
        var data = { name: { title: this.state.title } }
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