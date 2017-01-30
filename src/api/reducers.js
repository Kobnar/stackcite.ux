import { combineReducers } from 'redux'

import orgs from './organizations/reducers'
import users from './users/reducers'

export default combineReducers({
    orgs,
    users
})