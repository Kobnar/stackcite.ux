import account from './account/state'
import login from './login/state'
import signup from './signup/state'

const initialState = {
    mobileNavMenuVisible: false,
    account,
    login,
    signup
}

export default initialState