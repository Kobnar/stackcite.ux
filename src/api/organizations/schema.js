import { Schema } from 'normalizr'

const organization = new Schema('organizations', { idAttribute: "id" })

export { organization }