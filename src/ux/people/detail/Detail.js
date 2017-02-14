import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'

import {
    retrieveDocument,
    updateDocument,
    deleteDocument } from './actions'

class Detail extends Component {

    constructor (props) {
        super(props)

        this.retrieve = this.retrieve.bind(this)
    }

    componentWillMount () {
        this.retrieve()
    }

    retrieve () {
        var personId = this.props.routeParams.id
        return this.props.dispatch(
            retrieveDocument(personId, this.props.authKey))
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
                            <h2>{ person.name.full }</h2>
                            : null
                        }
                        <p>{ person.description }</p>
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