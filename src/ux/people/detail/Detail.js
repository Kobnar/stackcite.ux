import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import { push, goBack } from 'react-router-redux'

import { readDate } from 'ux/utils'

import { retrieveDocument } from './actions'
import PageControl from './PageControl'

class Detail extends Component {

    constructor (props) {
        super(props)

        this.retrieve = this.retrieve.bind(this)
    }

    componentWillMount () {
        this.retrieve()
    }

    retrieve () {
        var personId = this.props.params.id
        return this.props.dispatch(
            retrieveDocument(personId, this.props.authKey))
    }

    render () {
        var personId = this.props.params.id
        var person = this.props.people[personId]
        if (person) {
            var hasTitle = person.name.title !== person.name.full
            return (
                <div>
                    <PageControl
                        loggedIn={!!this.props.authKey}
                        permalink={this.props.location.pathname} />

                    <div className='container'>
                        <h1 className='page-title'>
                            { person.name.title }
                            { person.birth || person.death ?
                                <small style={{paddingLeft: '1rem'}}>
                                    ({ readDate(person.birth) || ' ?' }
                                    &nbsp;&ndash;&nbsp;
                                    { readDate(person.death) })
                                </small>
                                : null
                            }
                        </h1>
                        { hasTitle ?
                            <h4>{ person.name.full }</h4>
                            : null
                        }
                        <p>{ person.description }</p>

                        <hr />
                    </div>
                </div>
            )
        } else
            return <p>Loading...</p>
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people || {}
})

export default connect(mapStateToProps)(Detail)