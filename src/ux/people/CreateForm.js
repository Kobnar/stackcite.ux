import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

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
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Known Title
            </bs.ControlLabel>
            <bs.FormControl
                id="title"
                type="text"
                placeholder="Known Title"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
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
        // Submit the form
    }

    render () {
        return (
            <bs.Form onSubmit={this.handleSubmission}>
                <TitleInput
                    state={this.state.title}
                    error={this.props.errors.title}
                    onChange={this.onChangeFactory('title')} />
            </bs.Form>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default CreateForm