import { CollectionResource } from 'api/actions'

import * as schema from './schema'

const sources = new CollectionResource('sources', undefined, schema.source)
sources.connect(CollectionResource, 'text', schema.text)
sources.text.connect(CollectionResource, 'books', schema.book)

export default sources