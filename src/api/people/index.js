import { CollectionResource } from 'api/actions'

import * as schema from './schema'

const people = new CollectionResource('people', undefined, schema.person)

export default people