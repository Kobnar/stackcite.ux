import { Schema } from 'normalizr'

const person = new Schema('people', { idAttribute: 'id' })

export { person }