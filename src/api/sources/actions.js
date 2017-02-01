import Endpoint, { API_URI } from '../actions'

import * as schema from './schema'

export const POST_SOURCE = 'POST_SOURCE'
export const GET_SOURCE = 'GET_SOURCE'
export const PUT_SOURCE = 'PUT_SOURCE'
export const DELETE_SOURCE = 'DELETE_SOURCE'
export const GET_SOURCES = 'GET_SOURCES'

export const POST_TEXT = 'POST_TEXT'
export const GET_TEXT = 'GET_TEXT'
export const PUT_TEXT = 'PUT_TEXT'
export const DELETE_TEXT = 'DELETE_TEXT'
export const GET_TEXTS = 'GET_TEXTS'

export const POST_BOOK = 'POST_BOOK'
export const GET_BOOK = 'GET_BOOK'
export const PUT_BOOK = 'PUT_BOOK'
export const DELETE_BOOK = 'DELETE_BOOK'
export const GET_BOOKS = 'GET_BOOKS'

class Sources extends Endpoint {

    route = API_URI + 'sources/'

    SCHEMA = schema.source

    actionTypes = {
        create: POST_SOURCE,
        retrieve: GET_SOURCE,
        update: PUT_SOURCE,
        delete: DELETE_SOURCE,
        retrieveCollection: GET_SOURCES
    }
}

class Texts extends Endpoint {

    route = API_URI + 'sources/text/'

    SCHEMA = schema.text

    actionTypes = {
        create: POST_SOURCE,
        retrieve: GET_SOURCE,
        update: PUT_SOURCE,
        delete: DELETE_SOURCE,
        retrieveCollection: GET_SOURCES
    }
}

class Books extends Endpoint {

    route = API_URI + 'sources/text/books/'

    SCHEMA = schema.book

    actionTypes = {
        create: POST_BOOK,
        retrieve: GET_BOOK,
        update: PUT_BOOK,
        delete: DELETE_BOOK,
        retrieveCollection: GET_BOOKS
    }
}

const sources = new Sources ()
sources.texts = new Texts()
sources.texts.books = new Books()

export default sources