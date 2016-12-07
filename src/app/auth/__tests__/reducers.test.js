import deepFreeze from 'deep-freeze';
import * as actions from '../actions';
import auth from '../reducers';

describe('auth', () => {

    it('reducer returns default initial state without any action', () => {
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(undefined, {});
        expect(result).toEqual(initialState)
    })

    it('TOUCH_TOKEN_REQUEST does not mutate existing state', () => {
        var action = { type: actions.TOUCH_TOKEN_REQUEST }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

    it('TOUCH_TOKEN_REQUEST sets loading state true', () => {
        var action = { type: actions.TOUCH_TOKEN_REQUEST }
        var result = auth(undefined, action)
        expect(result.loading).toEqual(true)
    });

    it('TOUCH_TOKEN_SUCCESS does not mutate existing state', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

    it('TOUCH_TOKEN_SUCCESS sets loading state false', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        const initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.loading).toEqual(false)
    });

    it('TOUCH_TOKEN_SUCCESS sets user id', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        const initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.user.id).toEqual('58479a173b360409947baf75')
    });

    it('TOUCH_TOKEN_SUCCESS sets token key', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        const initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.token.key).toEqual('89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4')
    });

    it('TOUCH_TOKEN_SUCCESS sets token issued datetime', () => {
        var now = new Date().getTime()
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: now, touched: null }
        }
        const initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.token.issued).toEqual(now)
    });

    it('TOUCH_TOKEN_SUCCESS sets token touched datetime', () => {
        var now = new Date().getTime()
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: now }
        }
        const initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.token.touched).toEqual(now)
    });

    it('TOUCH_TOKEN_FAILURE does not mutate existing state', () => {
        var action = { type: actions.TOUCH_TOKEN_FAILURE }
        var initialState = {
            loading: false,
            user: {
                id: ''
            },
            token: {
                key: '',
                issued: null,
                touched: null
            }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    });

    it('TOUCH_TOKEN_FAILURE returns default state', () => {
        var action = { type: actions.TOUCH_TOKEN_FAILURE }
        var initialState = {
            loading: true,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var expected = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result).toEqual(expected)
    });

    it('LOGOUT_REQUEST does not mutate existing state', () => {
        var action = { type: actions.LOGOUT_REQUEST }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

    it('LOGOUT_SUCCESS returns default state', () => {
        var action = { type: actions.LOGOUT_SUCCESS }
        var initialState = {
            loading: true,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        var expected = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result).toEqual(expected)
    })

    it('LOGOUT_FAILURE returns default state', () => {
        var action = { type: actions.LOGOUT_FAILURE }
        var initialState = {
            loading: true,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        var expected = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result).toEqual(expected)
    })

    it('TOUCH_TOKEN_REQUEST does not mutate existing state', () => {
        var action = { type: actions.TOUCH_TOKEN_REQUEST }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

    it('TOUCH_TOKEN_SUCCESS does not mutate existing state', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

    it('TOUCH_TOKEN_SUCCESS sets loading state false', () => {
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        const initialState = {
            loading: true,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: null, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.loading).toEqual(false)
    });

    it('TOUCH_TOKEN_SUCCESS sets token touched datetime', () => {
        var now = new Date().getTime()
        var then = now - 60000
        var action = {
            type: actions.TOUCH_TOKEN_SUCCESS,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: then, touched: now }
        }
        const initialState = {
            loading: true,
            user: { id: '58479a173b360409947baf75' },
            token: { key: '89f3ae9c3679d15fa7d4821d37755ae4cb4da216c55cbfd3dc615fe4', issued: then, touched: null }
        }
        var result = auth(initialState, action)
        expect(result.token.touched).toEqual(now)
    });

    /** NOTE:
     * TOUCH_TOKEN_SUCCESS minutiae is skipped because it shares underlying
     * logic with LOGIN_SUCCESS w/ cluttered tests
     * */

    it('TOUCH_TOKEN_FAILURE does not mutate existing state', () => {
        var action = { type: actions.TOUCH_TOKEN_FAILURE }
        var initialState = {
            loading: false,
            user: { id: '' },
            token: { key: '', issued: null, touched: null }
        }
        deepFreeze(initialState)
        auth(initialState, action)
    })

})