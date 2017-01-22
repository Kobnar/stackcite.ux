import React, { Component } from 'react'
import { connect } from 'react-redux'

class Account extends Component {
    render () {
        return (
            <div className="container">
                <h4>Account Settings</h4>
                <h5>{ this.props.user.id }</h5>
            </div>
        )
    }

    static propTypes = {
        user: React.PropTypes.object.isRequired
    }
}

const mapStateToProps = (state) => ({
    user: state.app.auth.user
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(Account)