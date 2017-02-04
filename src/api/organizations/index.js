import { CollectionResource } from '../actions'

import * as schema from './schema'

const organizations = new CollectionResource('organizations', undefined, schema.organization)

export default organizations