import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

import { SUCCESS } from 'api/actions'

import { BOOK } from './actions'

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

const defaultProps = {
    loading: false,
    errors: {}
}

const TypeSelection = ({state, onChange}) => {
    return (
        <bs.FormGroup>
            <bs.ControlLabel
                className="sr-only">
                Source Type
            </bs.ControlLabel>
            <bs.FormControl
                componentClass="select"
                value={state}
                onChange={onChange}>
                    <option value={BOOK}>Book</option>
            </bs.FormControl>
        </bs.FormGroup>
    )
}

const TitleInput = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Title
            </bs.ControlLabel>
            <bs.FormControl
                id="title"
                type="text"
                placeholder="Title"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const EditionInput = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Edition
            </bs.ControlLabel>
            <bs.FormControl
                id="title"
                type="text"
                placeholder="Edition"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const DescriptionTextarea = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Description
            </bs.ControlLabel>
            <bs.FormControl
                id="description"
                componentClass="textarea"
                placeholder="Description"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const AuthorsInput = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Authors
            </bs.ControlLabel>
            <bs.FormControl
                id="authors"
                type="text"
                placeholder="Authors"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const EditorsInput = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Editors
            </bs.ControlLabel>
            <bs.FormControl
                id="editors"
                type="text"
                placeholder="Editors"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const PublisherInput = ({state, error, onChange}) => {
    return (
        <bs.FormGroup
            validationState={ error ? 'error' : null }>
            <bs.ControlLabel
                className="sr-only">
                Publisher
            </bs.ControlLabel>
            <bs.FormControl
                id="publisher"
                type="text"
                placeholder="Publisher"
                value={state}
                onChange={onChange}/>
            <bs.HelpBlock>{error}</bs.HelpBlock>
        </bs.FormGroup>
    )
}

const BookControls = ({state, errors, onChange}) => {
    return (
        <div>
            <EditionInput
                state={state.edition}
                error={errors.edition}
                onChange={onChange('edition')} />

            <AuthorsInput
                state={state.authors}
                error={errors.authors}
                onChange={onChange('authors')} />

            <EditorsInput
                state={state.editors}
                error={errors.editors}
                onChange={onChange('editors')} />

            <PublisherInput
                state={state.publisher}
                error={errors.publisher}
                onChange={onChange('publisher')} />
        </div>
    )
}

const emptyForm = {
    type: BOOK,
    title: '',
    description: '',
    authors: '',
    editors: '',
    edition: '',
    publisher: '',
    published: '',
    location: '',
    isbn13: ''
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

    clean (data, listFields = []) {
        var formData = {}
        Object.entries(data)
            .forEach(([key, value]) => {
                if (value)
                    if (listFields.includes(key))
                        formData[key] = value.trim().split(/[\s]*,[\s]*/)
                    else
                        formData[key] = value
            })
        return formData
    }

    handleSubmission (event) {
        event.preventDefault()
        var formData = this.clean(this.state, ['authors', 'editors'])
        this.props.onSubmit(formData, formData.type)
            .then(action => {
                if (action.status === SUCCESS)
                    this.clearForm()
            })
    }

    render () {
        return (
            <bs.Form onSubmit={this.handleSubmission}>

                <TypeSelection
                    state={this.state.type}
                    onChange={this.onChangeFactory('type')} />

                <TitleInput
                    state={this.state.title}
                    error={this.props.errors.title}
                    onChange={this.onChangeFactory('title')} />
                
                { this.state.type === BOOK ?
                    <BookControls
                        state={this.state}
                        errors={this.props.errors}
                        onChange={this.onChangeFactory} /> : null }

                <DescriptionTextarea
                    state={this.state.description}
                    error={this.props.errors.description}
                    onChange={this.onChangeFactory('description')} />

                <bs.FormGroup
                    className="col-sm-2 pull-right">
                    <bs.Button
                        block
                        type="submit"
                        bsStyle="primary"
                        disabled={this.props.loading}>
                        Add
                    </bs.Button>
                </bs.FormGroup>
            </bs.Form>
        )
    }

    static propTypes = propTypes
    static defaultProps = defaultProps
}

export default CreateForm