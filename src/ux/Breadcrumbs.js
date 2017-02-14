import React, { Component } from 'react'
import { Link } from 'react-router'
import * as bs from 'react-bootstrap'


const Breadcrumbs = ({ path }) => {
    return (
        <div className='container'>
            <bs.Breadcrumb>
                <bs.Breadcrumb.Item
                    href='/'>
                    Home
                </bs.Breadcrumb.Item>
            </bs.Breadcrumb>
        </div>
    )
}

export default Breadcrumbs