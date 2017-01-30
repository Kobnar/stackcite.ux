const apiEndpoint = 'http://api.localhost/v0/'

const defaultHeaders = { 'Content-Type': 'application/json' }

const _endpoint = (route, documentId) => {
    var endpoint = apiEndpoint + route
    if (documentId)
        endpoint = endpoint + documentId + "/"
    return endpoint
}

const _headers = (tokenKey) => {
    var headers = {...defaultHeaders}
    if (tokenKey)
        headers["Authorization"] = "key ".concat(tokenKey)
    return new Headers(headers)
}

export const retrieveDocument = (route, documentId, tokenKey) => {
    return fetch(_endpoint(route, documentId), {
        method: "GET",
        headers: _headers(tokenKey)
    })
}

export const updateDocument = (route, documentId, data, tokenKey) => {
    return fetch(_endpoint(route, documentId), {
        method: "PUT",
        headers: _headers(tokenKey),
        body: JSON.stringify(data)
    })
}

export const deleteDocument = (route, documentId, tokenKey) => {
    return fetch(_endpoint(route, documentId), {
        method: "DELETE",
        headers: _headers(tokenKey)
    })
}

export const createDocument = (route, data, tokenKey) => {
    return fetch(_endpoint(route), {
        method: "POST",
        headers: _headers(tokenKey),
        body: JSON.stringify(data)
    })
}

export const retrieveCollection = (route, tokenKey) => {
    return fetch(_endpoint(route), {
        method: "GET",
        headers: _headers(tokenKey)
    })
}