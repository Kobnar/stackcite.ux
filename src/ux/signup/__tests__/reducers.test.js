import deepFreeze from 'deep-freeze'

import signup from '../reducers'
import initialState from '../state'
import * as actions from '../../../api/users/actions'

describe('signup', () => {

    it('copies errors from dispatch', () => {
        var action = {
            type: actions.SIGNUP_FAILURE,
            errors: {
                email: 'Invalid email.'
            }
        }
        var expected = { errors: { email: 'Invalid email.' }}
        var result = signup(undefined, action)
        expect(result).toEqual(expected)
    })

})