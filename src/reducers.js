import { combineReducers } from 'redux'
import { LOCATION_CHANGE } from 'react-router-redux'

import api from './api/reducers'
import ux from './ux/reducers'

export default combineReducers({
    api,
    ux
})