import organizations from './organizations'
import people from './people'
import sources from './sources'
import users from './users'

import { IndexResource, CollectionResource } from './actions'

const ROOT_URI = 'http://api.localhost/'
const API_VERSION = 'v0'

const api = new IndexResource(ROOT_URI + API_VERSION)
api.connect(organizations)
api.connect(people)
api.connect(sources)
api.connect(users)

export default api