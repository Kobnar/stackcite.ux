// TODO: Need a better deep-cloning method
const clone = (obj) => ({
    ...JSON.parse(JSON.stringify(obj))
})

/**
 * Updates an existing cache of data by performing a deep clone of both the
 * existing cache and the update, then concecrating the two.
 * 
 * NOTE: This method operates on the collection level, wiping previous data.
 */
export const updateCache = (cache, update) => {
    var newCache = { ...clone(cache) }
    for (var collection in update) {
        newCache[collection] = {
            ...newCache[collection],
            ...clone(update[collection])
        }
    }
    return newCache
}

/**
 * Deletes an object ID from the cache.
 * 
 * NOTE: This method assumes a unique bson-style object ID, so it does not care
 * what collection it meddles with.
 */
export const deleteDocument = (cache, documentId) => {
    // HACK: Need a better deep-clone method
    var newCache = clone(cache)
    Object.values(newCache).forEach(collection => {
        if (documentId in collection)
            delete collection[documentId]
    })
    return newCache
}