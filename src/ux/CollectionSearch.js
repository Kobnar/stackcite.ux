import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

import { debounce } from 'ux/utils'

const propTypes = {
    retrieve: React.PropTypes.func
}

const defaultState = {
    query: ''
}

class CollectionSearch extends Component {

    constructor (props) {
        super(props)

        this.state = { ...defaultState }

        this.retrieve = debounce(this.retrieve.bind(this), 200)
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    retrieve () {
        var query = {}
        if (this.state.query)
            query['q'] = this.state.query
        this.props.retrieve(query)
    }

    handleChange (event) {
        this.setState({query: event.target.value})
        this.retrieve()
    }

    handleSubmit (event) {
        event.preventDefault()
        this.retrieve()
    }

    render () {
        return (
            <form onSubmit={this.handleSubmit}>
                <bs.FormGroup>
                    <bs.ControlLabel
                        className="sr-only">
                        Search
                    </bs.ControlLabel>
                    <bs.FormControl
                        id="query"
                        type="text"
                        placeholder="Search"
                        value={this.state.query}
                        onChange={this.handleChange}/>
                </bs.FormGroup>
            </form>
        )
    }

    static propTypes = propTypes
}

export default CollectionSearch