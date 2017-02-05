import { Schema } from 'normalizr'

import user from 'api/users/schema'

const authToken = new Schema('authTokens')
authToken.define({
    user: user
})

export { authToken }