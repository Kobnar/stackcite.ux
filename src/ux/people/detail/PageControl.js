import React, { Component } from 'react'
import { Link } from 'react-router'

const PageControl = ({permalink, loggedIn}) => {
    return (
        <div className='page-control'>
            <Link
                to='/people'
                type='button'
                className='button button-clear'>
                <span className='glyphicons glyphicons-chevron-left' />
                People
            </Link>
            <div className='float-right'>
                { loggedIn ?
                    <Link
                        type='button'
                        className='button button-clear'
                        to={permalink + '/edit'} >
                        <span className='glyphicons glyphicons-edit' />
                    </Link>
                    : null
                }
                { loggedIn ?
                    <Link
                        type='button'
                        className='button button-clear'
                        to={permalink + '/history'} >
                        <span className='glyphicons glyphicons-history' />
                    </Link>
                    : null
                }
                <button
                    className='button button-clear'>
                    <span className='glyphicons glyphicons-link' />
                </button>
                <button
                    className='button button-clear'>
                    <span className='glyphicons glyphicons-share' />
                </button>
            </div>
        </div>
    )
}

export default PageControl