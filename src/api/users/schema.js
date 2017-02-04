import { Schema } from 'normalizr'

const user = new Schema('users', { idAttribute: "id" })

export { user }