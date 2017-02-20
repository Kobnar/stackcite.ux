import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import CopyToClipboard from 'react-copy-to-clipboard'

const propTypes = {
    permalink: React.PropTypes.string.isRequired,
    isLoggedIn: React.PropTypes.bool
}

class PageControl extends Component {

    constructor (props) {
        super(props)

        this.state = {
            permalinkVisible: false
        }

        this.togglePermalink = this.togglePermalink.bind(this)
    }

    togglePermalink () {
        this.setState({permalinkVisible: !this.state.permalinkVisible})
    }

    hidePermalink () {
        this.setState({permalinkVisible: false})
    }

    render() {
        var permalink = 'http://stackcite.com' + this.props.permalink
        return (
            <div className='page-control'>
                <Link
                    to='/people'
                    type='button'
                    className='button button-clear'>
                    <span className='glyphicons glyphicons-chevron-left' />
                    People
                </Link>
                <ul className='float-right'>
                    { this.props.loggedIn ?
                        <li>
                            <Link
                                type='button'
                                className='button button-clear'
                                to={permalink + '/edit'} >
                                <span className='glyphicons glyphicons-edit' />
                            </Link>
                        </li>
                        : null
                    }
                    {/*{ this.props.loggedIn ?
                        <li>
                            <Link
                                type='button'
                                className='button button-clear'
                                to={permalink + '/history'} >
                                <span className='glyphicons glyphicons-history' />
                            </Link>
                        </li>
                        : null
                    }*/}
                    <li>
                        <button
                            className='button button-clear'
                            onClick={this.togglePermalink}>
                            <span className='glyphicons glyphicons-link' />
                        </button>
                        <div
                            className={this.state.permalinkVisible ? 'permalink' : ' hidden' }>
                            <CopyToClipboard
                                text={permalink}
                                onCopy={this.togglePermalink}>
                                <button
                                    className='button button-clear'>
                                    <span className='glyphicons glyphicons-copy' />
                                </button>
                            </CopyToClipboard>
                            <input type='text' value={permalink} disabled/>
                        </div>
                    </li>
                    {/*<li>
                        <button
                            className='button button-clear'>
                            <span className='glyphicons glyphicons-share' />
                        </button>
                    </li>*/}
                </ul>
            </div>
        )
    }

    static propTypes = propTypes
}

export default PageControl