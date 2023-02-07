import { ajax } from '../request'

export default {
    getPublicKey: () => ajax('get', '/user/common/secret_key/public_key')
}
