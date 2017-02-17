import React, { Component } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import { SUCCESS } from 'api/actions'
import { InputGroup } from 'ux/Forms'

import {
    retrieveDocument,
    updateDocument,
    deleteDocument } from './actions'

const TitleInput = ({state, error, onChange}) => {
    return (
        <InputGroup
            id='title'
            type='text'
            label='Title'
            placeholder='Title (e.g. "J.N. Doe")'
            value={state}
            error={!!error}
            errorMsg={error}
            onChange={onChange}
            srOnly={false} />
    )
}

const FullNameInput = ({state, error, onChange}) => {
    return (
        <InputGroup
            id='full-name'
            type='text'
            label='Full name'
            placeholder='Full name (e.g. "John Nobody Doe")'
            value={state}
            error={!!error}
            errorMsg={error}
            onChange={onChange}
            srOnly={false} />
    )
}

const DescriptionTextArea = ({state, error, onChange}) => {
    return (
        <div className='form-group'>
            <label
                htmlFor='description'>
                Description
            </label>
            <textarea
                id='description'
                placeholder='Description'
                value={state}
                onChange={onChange} />
        </div>
    )
}

const emptyForm = {
    title: '',
    fullName: '',
    birth: '',
    death: '',
    description: ''
}

class UpdateForm extends Component {

    constructor (props) {
        super(props)

        this.state = { ...emptyForm }

        this.onChangeFactory = this.onChangeFactory.bind(this)
        this.handleSubmission = this.handleSubmission.bind(this)
        this.handleCancel = this.handleCancel.bind(this)
    }

    componentWillMount () {
        this.retrieve()
            .then(action => {
                if (action.status === SUCCESS) {
                    var personId = action.documentId
                    var person = this.props.people[personId]
                    this.setState({
                        title: person.name.title,
                        fullName: person.name.full,
                        birth: person.birth || '',
                        death: person.death || '',
                        description: person.description || ''
                    })
                }
            })
    }

    retrieve () {
        var personId = this.props.params.id
        return this.props.dispatch(
            retrieveDocument(personId, this.props.authKey))
    }

    update (data) {
        var personId = this.props.params.id
        return this.props.dispatch(
            updateDocument(data, personId, this.props.authKey))
    }

    delete () {
        var personId = this.props.params.id
        return this.props.dispatch(
            deleteDocument(personId, this.props.authKey))
                .then(this.props.dispatch(push('/people')))
    }

    onChangeFactory (field) {
        return (event) => { this.setState({ [field]: event.target.value })}
    }

    handleSubmission (event) {
        event.preventDefault()
        var data = {
            name: {
                title: this.state.title,
                full: this.state.fullName
            },
            birth: this.state.birth || null,
            death: this.state.death || null,
            description: this.state.description
        }
        this.props.onSubmit(data)
    }

    handleCancel (event) {
        event.preventDefault()
        var personId = this.props.params.id
        this.props.dispatch(push('/people/' + personId))
    }

    render () {
        var formErrors = this.props.errors
        var nameErrors = formErrors.name || {}
        var personId = this.props.params.id
        var person = this.props.people[personId]
        if (person) {
            return (
                <div className='container'>
                    <h1 className='page-title'>
                        Edit Person ({ person.name.title })
                    </h1>
                    <form onSubmit={this.handleSubmission}>
                        <fieldset>
                            <TitleInput
                                state={this.state.title}
                                error={nameErrors.title}
                                onChange={this.onChangeFactory('title')} />

                            <FullNameInput
                                state={this.state.fullName}
                                error={nameErrors.full}
                                onChange={this.onChangeFactory('fullName')} />
                            
                            <div className='row'>
                                <div className='column'>
                                    <InputGroup
                                        id='birth'
                                        type='number'
                                        label='Birth (year)'
                                        value={this.state.birth}
                                        error={!!formErrors.birth}
                                        errorMsg={formErrors.birth}
                                        onChange={this.onChangeFactory('birth')}
                                        srOnly={false} />
                                </div>
                                <div className='column'>
                                    <InputGroup
                                        id='death'
                                        type='number'
                                        label='Death (year)'
                                        value={this.state.death}
                                        error={!!formErrors.death}
                                        errorMsg={formErrors.death}
                                        onChange={this.onChangeFactory('death')}
                                        srOnly={false} />
                                </div>
                            </div>

                            <DescriptionTextArea
                                state={this.state.description}
                                error={formErrors.description}
                                onChange={this.onChangeFactory('description')} />
                        
                            <div className='float-right'>
                                <input
                                    type='submit'
                                    className='button-primary'
                                    disabled={this.props.loading}
                                    value='Save'/>

                                <input
                                    type='button'
                                    className='button-outline'
                                    onClick={this.handleCancel}
                                    value='Cancel'
                                    style={{marginLeft: '0.5rem'}} />
                            </div>
                        </fieldset>
                    </form>
                </div>
            )
        } else
            return <p>Loading...</p>
    }
}

const mapStateToProps = (state) => ({
    authKey: state.api.auth.token.key,
    people: state.api.cache.people || {},
    loading: state.ux.people.detail.loading,
    errors: state.ux.people.detail.errors
})

export default connect(mapStateToProps)(UpdateForm)