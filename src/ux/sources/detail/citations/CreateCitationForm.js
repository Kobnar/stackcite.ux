import React, { Component } from 'react'
import * as bs from 'react-bootstrap'

const propTypes = {
    source: React.PropTypes.string.isRequired,
    onSubmit: React.PropTypes.func.isRequired
}

class CreateCitationForm extends Component {

    constructor (props) {
        super(props)

        this.state = {
            source: '',
            text: '',
            pages: '',
            note: ''
        }
    }

    clean (data) {
        var [text, pages] = this.parseText(this.state.text)
        var pages = this.parsePages(pages)
    }

    parseText (text) {

    }

    parsePages (pages) {

    }

    static propTypes = propTYpes
}

export default CreateCitationForm