import { AuthResource } from './actions'
import * as schema from './schema'

const auth = new AuthResource('auth', schema.authToken)

export default auth