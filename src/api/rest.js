export const ROOT_URI = 'http://api.localhost/'

const DEFAULT_HEADERS = { 'Content-Type': 'application/json' }

/**
 * A stateless interface for working with the stackcite API.
 */
export default class REST {

    constructor () {}

    route = ROOT_URI

    defaultHeaders = { 'Content-Type': 'application/json' }

    /** 
     * Compiles a complete URI for the desired API endpoint.
     */
    endpoint (documentId) {
        var endpoint = this.route
        if (documentId)
            endpoint = endpoint + documentId + "/"
        return endpoint
    }

    /**
     * Compiles a valid set of headers. Appends authorization header with the
     * appropreate key if one is provided.
     */
    headers (tokenKey) {
        var headers = {...this.defaultHeaders}
        if (tokenKey)
            headers["Authorization"] = "key ".concat(tokenKey)
        return new Headers(headers)
    }

    /**
     * Creates a document at a given endpoint.
     */
    POST (data, tokenKey) {
        return fetch(this.endpoint(), {
            method: "POST",
            headers: this.headers(tokenKey),
            body: JSON.stringify(data)
        })
    }

    /**
     * Retrieves a document at a given endpoint.
     */
    GET (documentId, tokenKey) {
        return fetch(this.endpoint(documentId), {
            method: "GET",
            headers: this.headers(tokenKey)
        })
    }

    /**
     * Updates a document at a given endpoint.
     */
    PUT (documentId, data, tokenKey) {
        return fetch(this.endpoint(documentId), {
            method: "PUT",
            headers: this.headers(tokenKey),
            body: JSON.stringify(data)
        })
    }

    /**
     * Deletes a document at a given endpoint.
     */
    DELETE (documentId, tokenKey) {
        return fetch(this.endpoint(documentId), {
            method: "DELETE",
            headers: this.headers(tokenKey)
        })
    }

    /**
     * Retrieves all documents from a given endpoint.
     */
    GET_ALL (tokenKey) {
        return fetch(this.endpoint(), {
            method: "GET",
            headers: this.headers(tokenKey)
        })
    }

}