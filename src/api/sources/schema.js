import { Schema, arrayOf } from 'normalizr'

import { person } from '../people/schema'
import { organization } from '../people/schema'

const sourceKeys = {}

const textKeys = {
    ...sourceKeys,
    authors: arrayOf(person),
    editors: arrayOf(person)
}

const bookKeys = {
    ...textKeys,
    publisher: organization
}

const source = new Schema('sources')

const text = new Schema('texts')
text.define(textKeys)

const book = new Schema('books')
book.define(bookKeys)

export { source, text, book }