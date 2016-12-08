import React, { Component } from 'react'
import { browserHistory, IndexLink, Link } from 'react-router'
import { push } from 'react-router-redux'
import { connect } from 'react-redux'

import * as actions from './auth/actions'

import MainNavigationMenu from './MainNavigationMenu'
import MobileNavigationMenu from './MobileNavigationMenu'

import './css/nav.css'

const NavigationBar = () => (
    <div className="navbar-contaner">
        <MainNavigationMenu />
        <MobileNavigationMenu />
    </div>
)

export default NavigationBar