import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

import {
    retrieveDocument,
    updateDocument,
    deleteDocument } from './actions'

import UpdateForm from './UpdateForm'

class Detail extends Component {

    constructor (props) {
        super(props)

        this.retrieve = this.retrieve.bind(this)
        this.update = this.update.bind(this)
    }

    componentWillMount () {
        this.retrieve()
    }

    retrieve () {
        var personId = this.props.routeParams.id
        return this.props.dispatch(
            retrieveDocument(personId, this.props.authKey))
    }

    update (data) {
        var personId = this.props.routeParams.id
        return this.props.dispatch(
            updateDocument(data, personId, this.props.authKey))
    }

    render () {
        var personId = this.props.routeParams.id

        if (personId && this.props.people) {
            var person = this.props.people[personId]
            var hasTitle = person.name.title !== person.name.full
            return (
                <div id='detail'>
                    <div className='container'>
                        <h1 className='page-title'>
                            { person.name.title }
                            { person.birth ?
                                <small>
                                    &nbsp;({ person.birth }&ndash;{ person.death })
                                </small>
                                : null
                            }
                        </h1>
                        { hasTitle ?
                            <h4><strong>Full name:</strong> { person.name.full }</h4>
                            : null
                        }
                        <p>{ person.description }</p>
                    </div>

                    <hr/>

                    <div className='container'>
                        <h3>Update</h3>

                        <UpdateForm
                            person={person}
                            onSubmit={this.update} />
                    </div>
                </div>
            )
        }

        else
            return <p>Loading...</p>
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people
})

export default connect(mapStateToProps)(Detail)