import { CollectionResource } from 'api/actions'

import auth from './auth'
import conf from './conf'

const users = new CollectionResource('users')
users.connect(auth)
users.connect(conf)

export default users