import account from './account/state'
import login from './login/state'
import signup from './signup/state'
import orgs from './organizations/state'

const initialState = {
    mobileNavMenuVisible: false,
    orgs,
    account,
    login,
    signup
}

export default initialState