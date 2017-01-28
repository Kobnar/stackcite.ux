import { normalize, schema } from 'normalizr'

import user from '../schema'

export const authToken = new schema.Entity('authTokens', {
    user
})