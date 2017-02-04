import { Schema, arrayOf } from 'normalizr'

import { person } from '../people/schema'
import { organization } from '../people/schema'

const source = new Schema('sources')
const sourceKeys = {}

const text = new Schema('texts')
const textKeys = {
    ...sourceKeys,
    authors: arrayOf(person),
    editors: arrayOf(person)
}
text.define(textKeys)

const book = new Schema('books')
const bookKeys = {
    ...textKeys,
    publisher: organization
}
book.define(bookKeys)

export { source, text, book }