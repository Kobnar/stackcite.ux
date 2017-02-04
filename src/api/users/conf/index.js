import { ConfirmResource } from './actions'
import * as schema from './schema'

const conf = new ConfirmResource('conf', undefined, schema.confirmToken)

export default conf