import React from 'react'

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