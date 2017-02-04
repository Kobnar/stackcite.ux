import { Schema } from 'normalizr'

import user from '../schema'

const authToken = new Schema('authTokens')
authToken.define({
    user: user
})

export { authToken }