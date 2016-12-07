import * as actions from '../actions';

describe('loginRequest', () => {

    it('sets correct action type', () => {
        var result = actions.loginRequest()
        expect(result.type).toEqual(actions.LOGIN_REQUEST)
    })

})

describe('loginSuccess', () => {

    it('sets correct action type', () => {
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: null,
            touched: null
        }
        var result = actions.loginSuccess(request)
        expect(result.type).toEqual(actions.LOGIN_SUCCESS)
    })

    it('maps token.user to user key', () => {
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: null,
            touched: null
        }
        var expected = { id: '58479a173b360409947baf75' }
        var result = actions.loginSuccess(request)
        expect(result.user).toEqual(expected)
    })

    it('maps token attributes to token key', () => {
        var now = new Date().getTime()
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: now,
            touched: now
        }
        var expected = {
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: now,
            touched: now
        }
        var result = actions.loginSuccess(request)
        expect(result.token).toEqual(expected)
    })

})

describe('loginFailure', () => {

    it('sets correct action type', () => {
        var result = actions.loginFailure()
        expect(result.type).toEqual(actions.LOGIN_FAILURE)
    })

})

describe('logoutRequest', () => {

    it('sets correct action type', () => {
        var result = actions.logoutRequest()
        expect(result.type).toEqual(actions.LOGOUT_REQUEST)
    })

})

describe('logoutSuccess', () => {

    it('sets correct action type', () => {
        var result = actions.logoutSuccess()
        expect(result.type).toEqual(actions.LOGOUT_SUCCESS)
    })

})

describe('logoutFailure', () => {

    it('sets correct action type', () => {
        var result = actions.logoutFailure()
        expect(result.type).toEqual(actions.LOGOUT_FAILURE)
    })

})

describe('touchTokenRequest', () => {

    it('sets correct action type', () => {
        var result = actions.touchTokenRequest()
        expect(result.type).toEqual(actions.TOUCH_TOKEN_REQUEST)
    })

})

describe('touchTokenSuccess', () => {

    it('sets correct action type', () => {
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: null,
            touched: null
        }
        var result = actions.touchTokenSuccess(request)
        expect(result.type).toEqual(actions.TOUCH_TOKEN_SUCCESS)
    })

    it('maps token.user to user key', () => {
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: null,
            touched: null
        }
        var expected = { id: '58479a173b360409947baf75' }
        var result = actions.touchTokenSuccess(request)
        expect(result.user).toEqual(expected)
    })

    it('maps token attributes to token key', () => {
        var now = new Date().getTime()
        var request = {
            user: { id: '58479a173b360409947baf75' },
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: now,
            touched: now
        }
        var expected = {
            key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4',
            issued: now,
            touched: now
        }
        var result = actions.touchTokenSuccess(request)
        expect(result.token).toEqual(expected)
    })

})

describe('touchTokenFailure', () => {

    it('sets correct action type', () => {
        var result = actions.touchTokenFailure()
        expect(result.type).toEqual(actions.TOUCH_TOKEN_FAILURE)
    })

})