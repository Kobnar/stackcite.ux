import { Schema } from 'normalizr'

import user from '../schema'

const confirmToken = new Schema('confirmTokens')
confirmToken.define({
    user: user
})

export { confirmToken }