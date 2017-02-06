/**
 * Updates an existing cache of data by performing a deep clone of both the
 * existing cache and the update, then concecrating the two.
 * 
 * NOTE: This method operates on the collection level, wiping previous data.
 */
export const updateCache = (cache, update) => {
    // HACK: Need a better deep-clone method
    return {
        ...JSON.parse(JSON.stringify(cache)),
        ...JSON.parse(JSON.stringify(update))
    }
}

/**
 * Deletes an object ID from the cache.
 * 
 * NOTE: This method assumes a unique bson-style object ID, so it does not care
 * what collection it meddles with.
 */
export const deleteDocument = (cache, documentId) => {
    // HACK: Need a better deep-clone method
    var newCache = JSON.parse(JSON.stringify(cache))
    Object.values(newCache).forEach(collection => {
        if (documentId in collection)
            delete collection[documentId]
    })
    return newCache
}