import { Schema } from 'normalizr'

import user from 'api/users/schema'

const confirmToken = new Schema('confirmTokens')
confirmToken.define({
    user: user
})

export { confirmToken }