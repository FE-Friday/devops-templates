import { importAll } from '@/utils'

const modules = require.context('./', false, /\.js$/)

importAll(modules)
