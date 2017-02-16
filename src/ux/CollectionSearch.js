import React, { Component } from 'react'

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
            <form
                className='search-form'
                onSubmit={this.handleSubmit}>
                <fieldset
                    style={{margin: '0'}}>
                    <div
                        className='form-group'
                        style={{margin: '0'}}>
                        <label
                            htmlFor='query'
                            className='sr-only'>
                            Search
                        </label>
                        <input
                            id='query'
                            type='search'
                            placeholder='Search...'
                            value={this.state.query}
                            onChange={this.handleChange}/>
                    </div>
                </fieldset>
            </form>
        )
    }

    static propTypes = propTypes
}

export default CollectionSearch