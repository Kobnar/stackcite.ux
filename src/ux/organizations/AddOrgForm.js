import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

const propTypes = {
    errors: React.PropTypes.object,
    createOrg: React.PropTypes.func.isRequired
}

class AddOrgForm extends Component {

    constructor (props) {
        super(props)

        this.state = {
            name: '',
            established: ''
        }

        this.handleNameChange = this.handleNameChange.bind(this)
        this.handleEstChange = this.handleEstChange.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
    }

    handleNameChange (event) {
        this.setState({ name: event.target.value })
    }

    handleEstChange (event) {
        this.setState({ established: event.target.value })
    }

    handleSubmission (event) {
        event.preventDefault()
        var data = {}
        for (var field in this.state) {
            var value = this.state[field]
            if (value)
                data[field] = this.state[field]
        }
        this.props.createOrg(data)
    }

    render = () => {
        var nameError = this.props.errors.name
        var estError = this.props.errors.established
        return (
            <bs.Form onSubmit={this.handleSubmission}>
                <bs.FormGroup
                    className="col-xs-8"
                    validationState={ nameError ? 'error' : null }>
                    <bs.ControlLabel
                        className="sr-only">
                        Name
                    </bs.ControlLabel>
                    <bs.FormControl
                        id="name"
                        type="text"
                        placeholder="Name"
                        value={this.state.name}
                        onChange={this.handleNameChange}/>
                    <bs.HelpBlock>{nameError}</bs.HelpBlock>
                </bs.FormGroup>

                <bs.FormGroup
                    className="col-xs-2"
                    validationState={ estError ? 'error' : null }>
                    <bs.ControlLabel
                        className="sr-only">
                        Established
                    </bs.ControlLabel>
                    <bs.FormControl
                        id="established"
                        type="text"
                        placeholder="Est."
                        value={this.state.established}
                        onChange={this.handleEstChange}/>
                    <bs.HelpBlock>{estError}</bs.HelpBlock>
                </bs.FormGroup>

                <bs.FormGroup
                    className="col-xs-2">
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
}

export default AddOrgForm