import { normalize, schema } from 'normalizr'

import user from '../schema'

export const confToken = new schema.Entity('confTokens', {
    user
})