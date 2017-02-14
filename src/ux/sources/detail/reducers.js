import { combineReducers } from 'redux'

import { loading as ldg } from 'ux/utils'

import { SOURCE_DOC } from './actions'

const loading = (state = false, action) => {
    return ldg(SOURCE_DOC, state, action)
}

export default combineReducers({
    loading
})