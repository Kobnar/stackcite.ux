import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

import { SUCCESS } from '../../api/actions'

const SOURCE = 'SOURCE'
const TEXT = 'TEXT'
const BOOK = 'BOOK'
const SOURCE_TYPES = [SOURCE, TEXT, BOOK]

const propTypes = {
    onSubmit: React.PropTypes.func.isRequired,
    loading: React.PropTypes.bool,
    errors: React.PropTypes.object
}

const defaultProps = {
    loading: false,
    errors: {}
}

class CreateForm extends Component {

    constructor (props) {
        super(props)

        this.state = {
            type: TEXT,
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

        this.handleTypeChange = this.handleTypeChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescChange = this.handleDescChange.bind(this)
        this.handleAuthorsChange = this.handleAuthorsChange.bind(this)

        this.handleSubmission = this.handleSubmission.bind(this)
    }

clearForm () {
    this.setState({
        title: '',
        description: ''
    })
}

    handleTypeChange (event) { this.setState({ type: event.target.value }) }
    handleTitleChange (event) { this.setState({ title: event.target.value }) }
    handleDescChange (event) { this.setState({ description: event.target.value }) }
    handleAuthorsChange (event) { this.setState({ authors: event.target.value}) }

    handleSubmission (event) {
        event.preventDefault()
        this.props.onSubmit({
            title: this.state.title,
            description: this.state.description
        }).then(action => {
            if (action.status === SUCCESS)
                this.clearForm()
        })
    }

    typeSelection () {
        return (
            <bs.FormGroup>
                <bs.ControlLabel
                    className="sr-only">
                    Source Type
                </bs.ControlLabel>
                <bs.FormControl
                    componentClass="select"
                    value={this.state.type}
                    onChange={this.handleTypeChange}>
                        <option value={TEXT}>Text</option>
                        <option value={BOOK}>- Book</option>
                </bs.FormControl>
            </bs.FormGroup>
        )
    }

    titleInput (error) {
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
                    placeholder="Name"
                    value={this.state.title}
                    onChange={this.handleTitleChange}/>
                <bs.HelpBlock>{error}</bs.HelpBlock>
            </bs.FormGroup>
        )
    }

    descInput (error) {
        return(
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
                    value={this.state.description}
                    onChange={this.handleDescChange}/>
                <bs.HelpBlock>{error}</bs.HelpBlock>
            </bs.FormGroup>
        )
    }

    authorsInput (error) {
        return(
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
                    value={this.state.authors}
                    onChange={this.handleAuthorsChange}/>
                <bs.HelpBlock>{error}</bs.HelpBlock>
            </bs.FormGroup>
        )
    }

    render () {
        var titleError = this.props.errors.title
        var descError = this.props.errors.description
        var authorsError = this.props.errors.authors
        return (
            <bs.Form onSubmit={this.handleSubmission}>

                { this.typeSelection() }
                { this.titleInput(titleError) }
                { this.state.type === BOOK ? this.authorsInput(authorsError) : null }
                { this.descInput(descError) }

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