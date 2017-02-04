import url from 'url'

// Action type
export const REST_API = 'REST_API'

// Methods
export const POST = 'POST'
export const GET = 'GET'
export const PUT = 'PUT'
export const DELETE = 'DELETE'

// Status
export const REQUEST = 'REQUEST'
export const SUCCESS = 'SUCCESS'
export const FAILURE = 'FAILURE'

/**
 * A dispatch-enabled wrapper for calling and signaling CRUD operations with
 * a REST API.
 */
export class APIInterface {

    static DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

    static headers = (authKey) => {
        var headers = { ...APIInterface.DEFAULT_HEADERS }
        if (authKey)
            headers['Authorization'] = 'key '.concat(authKey)
        return new Headers(headers)
    }

    static create = (route, data, authKey, schema) => {
        return (dispatch) => {

            dispatch({
                type: REST_API,
                method: POST,
                status: REQUEST,
                route
            })

            return fetch(route, {
                    method: 'POST',
                    headers: APIInterface.headers(authKey),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: REST_API,
                                method: POST,
                                status: SUCCESS,
                                route,
                                data,
                                schema
                            }))
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: REST_API,
                                method: POST,
                                status: FAILURE,
                                route,
                                error
                            }))
                })
        }
    }

    static retrieve = (route, query, authKey, schema) => {
        return (dispatch) => {

            route = route.concat(
                url.format({ query })
            )

            dispatch({
                type: REST_API,
                method: GET,
                status: REQUEST,
                route
            })

            return fetch(route, {
                    method: 'GET',
                    headers: APIInterface.headers(authKey)
                })
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: REST_API,
                                method: GET,
                                status: SUCCESS,
                                route,
                                data,
                                schema
                            }))
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: REST_API,
                                method: GET,
                                status: FAILURE,
                                route,
                                error
                            }))
                })
        }
    }

    static update = (route, data, authKey, schema) => {
        return (dispatch) => {

            dispatch({
                type: REST_API,
                method: PUT,
                status: REQUEST,
                route
            })

            return fetch(route, {
                    method: 'PUT',
                    headers: APIInterface.headers(authKey),
                    body: JSON.stringify(data)
                })
                .then(response => {
                    if (response.ok)
                        return response.json()
                            .then(data => dispatch({
                                type: REST_API,
                                method: PUT,
                                status: SUCCESS,
                                route,
                                data,
                                schema
                            }))
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: REST_API,
                                method: PUT,
                                status: FAILURE,
                                route,
                                error
                            }))
                })
        }
    }

    static delete = (route, query, authKey) => {
        return (dispatch) => {

            route = route.concat(
                url.format({ query })
            )

            dispatch({
                type: REST_API,
                method: DELETE,
                status: REQUEST,
                route
            })

            return fetch(route, {
                    method: 'DELETE',
                    headers: APIInterface.headers(authKey)
                })
                .then(response => {
                    if (response.ok)
                        return dispatch({
                            type: REST_API,
                            method: DELETE,
                            status: SUCCESS,
                            route
                        })
                    else
                        return response.json()
                            .then(error => dispatch({
                                type: REST_API,
                                method: DELETE,
                                status: FAILURE,
                                route,
                                error
                            }))
                })
        }
    }
}

/**
 * A traversal resource for defining non-data interface nodes of a REST API.
 */
export class IndexResource {

    constructor (name, parent) {
        this.name = name
        this.parent = parent
    }

    connect (resource, name, schema) {
        if (name) {
            this[name] = new resource(name, this, schema)
        } else {
            resource.parent = this
            this[resource.name] = resource
        }
    }

    route () {
        var endpoint = this.name + '/'
        if (this.parent)
            return this.parent.route() + endpoint
        else
            return endpoint
    }

    toString () {
        return this.name
    }
}

/**
 * A traversal resource containing common properties and methods of data
 * interface nodes of a REST API.
 */
class DataResource extends IndexResource {

    constructor (name, parent, schema) {
        super(name, parent)
        this.name = name
        this.parent = parent
        this.schema = schema
    }
}

/**
 * A traversal resource for performing CRUD operations on a REST API document
 * resource.
 */
export class DocumentResource extends DataResource {

    retrieve (query, authKey) {
        return APIInterface.retrieve(this.route(), query, authKey, this.schema)
    }

    update (data, authKey) {
        return APIInterface.update(this.route(), data, authKey, this.schema)
    }

    delete (authKey) {
        return APIInterface.delete(this.route(), undefined, authKey)
    }
}

/**
 * A traversal resource for performing CRUD operations on REST API collection
 * resources.
 */
export class CollectionResource extends DataResource {

    document (documentId) {
        return new DocumentResource(documentId, this, this.schema)
    }

    create (data, authkey) {
        return APIInterface.create(this.route(), data, authkey, this.schema)
    }

    retrieve (query, authKey) {
        return APIInterface.retrieve(this.route(), query, authKey, this.schema)
    }

    update (data, authKey) {
        return APIInterface.update(this.route(), data, authKey, this.schema)
    }

    delete (query, authKey) {
        return APIInterface.delete(this.route(), query, authKey)
    }
}