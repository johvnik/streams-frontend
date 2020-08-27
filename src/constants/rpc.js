import { watchedEnum } from './util'
import { endpoints } from '../rpc/services/index'
import masterBackend from '../rpc/services/master-backend'

const _RPC_IDS = endpoints
export const RPC_IDS = watchedEnum(_RPC_IDS, 'RPC')
