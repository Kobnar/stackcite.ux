import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const AddButton = ({ onClick }) => {
    return (
        <button
            className='button-outline float-right'
            style={{margin: '0.5rem 0', padding: '0 1.5rem 0 0.5rem'}}
            onClick={onClick}>
            <span className='glyphicons glyphicons-plus' style={{fontSize: '1.6rem', lineHeight: '2.4rem'}} />
            Add
        </button>
    )
}

class People extends Component {

    render () {
        return (
            <div className='container'>
                <div className='page-title'>
                    <h1>People</h1>
                    { this.props.authKey ?
                        <AddButton
                            onClick={() => this.props.dispatch(push('/people/add'))} />
                        : null
                    }
                    <hr />
                </div>
                { this.props.children }
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people || {},
    filter: state.ux.people.ids
})

export default connect(mapStateToProps)(People)