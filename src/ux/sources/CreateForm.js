import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

import { SUCCESS } from '../../api/actions'

const propTypes = {
    createSource: React.PropTypes.func.isRequired,
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
            title: '',
            description: ''
        }

        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleDescChange = this.handleDescChange.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
    }

clearForm () {
    this.setState({
        title: '',
        description: ''
    })
}

    handleTitleChange (event) {
        this.setState({ title: event.target.value })
    }

    handleDescChange (event) {
        this.setState({ description: event.target.value })
    }

    handleSubmission (event) {
        event.preventDefault()
        this.props.createSource({
            title: this.state.title,
            description: this.state.description
        }).then(action => {
            if (action.status === SUCCESS)
                this.clearForm()
        })
    }

    render () {
        var titleError = this.props.errors.title
        var descError = this.props.errors.description
        return (
            <bs.Form onSubmit={this.handleSubmission}>
                <bs.FormGroup
                    validationState={ titleError ? 'error' : null }>
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
                    <bs.HelpBlock>{titleError}</bs.HelpBlock>
                </bs.FormGroup>

                <bs.FormGroup
                    validationState={ descError ? 'error' : null }>
                    <bs.ControlLabel
                        className="sr-only">
                        Description
                    </bs.ControlLabel>
                    <bs.FormControl
                        id="description"
                        type="text"
                        placeholder="Description"
                        value={this.state.description}
                        onChange={this.handleDescChange}/>
                    <bs.HelpBlock>{descError}</bs.HelpBlock>
                </bs.FormGroup>

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