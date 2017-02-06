import { combineReducers } from 'redux'

import { loading as ldg } from 'ux/utils'

import detail from './detail/reducers'

import { SOURCE_COL } from './actions'

const loading = (state = false, action) => {
    return ldg(SOURCE_COL, state, action)
}

export default combineReducers({
    loading,
    detail
})