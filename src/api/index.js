import { importAll } from '../utils'

const modules = require.context('./modules', false, /\.js$/)

export default importAll(modules)
