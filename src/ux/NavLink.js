import React, { Component } from 'react'
import classNames from 'classnames'
import { Link } from 'react-router'

class NavLink extends Component {
    render () {
        const { to, active, disabled, onClick, className, style, ...props } = this.props;
        return (
        <li
            role="presentation"
            className={classNames(className, { active, disabled })}
            style={style}>
            <Link to={to} role="button" onClick={onClick}>{this.props.children}</Link>
        </li>)
    }
}

NavLink.propTypes = {
    to: React.PropTypes.string,
    active: React.PropTypes.bool,
    disabled: React.PropTypes.bool,
    role: React.PropTypes.string,
    href: React.PropTypes.string,
    onClick: React.PropTypes.func,
    onSelect: React.PropTypes.func,
    eventKey: React.PropTypes.any
}

export default NavLink