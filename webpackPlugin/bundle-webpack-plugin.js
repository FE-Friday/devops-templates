const fs = require('fs')
const path = require('path')

module.exports = class BundleWebpackPlugin {
    // Define `apply` as its prototype method which is supplied with compiler as its argument
    constructor (props) {
        const dist = props.dist || '.'
        const bundleName = props.bundleName || 'assets_bundle'
        this.SERVICE_ASSETS_JSON_PATH = path.join(__dirname, '..', dist, `${bundleName}.json`)
        this.SERVICE_ASSETS_DIR = path.dirname(this.SERVICE_ASSETS_JSON_PATH)
    }

    apply (compiler) {
        compiler.hooks.done.tapAsync(
            'BundleWebpackPlugin',
            (compilation, callback) => {
                console.log('This is an example plugin!')
                const { SERVICE_ASSETS_JSON_PATH, SERVICE_ASSETS_DIR } = this
                const entryNames = Array.from(compilation.compilation.entrypoints.keys())
                const extensionRegexp = /\.(css|js|mjs)(\?|$)/
                const entryPointPublicPathMap = {}
                const assetsMap = {}

                for (let i = 0; i < entryNames.length; i++) {
                    const entryName = entryNames[i]
                    const entryPointFiles = compilation.compilation.entrypoints.get(entryName).getFiles()
                    const assets = {
                        js: [],
                        css: []
                    }
                    entryPointFiles
                        .map(chunkFile => chunkFile.split('/').map(encodeURIComponent).join('/'))
                        .map(entryPointPublicPath => {
                            const extMatch = extensionRegexp.exec(entryPointPublicPath)
                            // Skip if the public path is not a .css, .mjs or .js file
                            if (!extMatch) {
                                return
                            }
                            // Skip if this file is already known
                            // (e.g. because of common chunk optimizations)
                            if (entryPointPublicPathMap[entryPointPublicPath]) {
                                return
                            }
                            entryPointPublicPathMap[entryPointPublicPath] = true
                            // ext will contain .js or .css, because .mjs recognizes as .js
                            const ext = extMatch[1] === 'mjs' ? 'js' : extMatch[1]
                            assets[ext].push(entryPointPublicPath)
                        })
                
                    assetsMap[entryName] = assets
                }

                let json = {}
                if (fs.existsSync(SERVICE_ASSETS_JSON_PATH)) {
                    json = JSON.parse(fs.readFileSync(SERVICE_ASSETS_JSON_PATH).toString())
                }
                json = {
                    ...json,
                    ...assetsMap
                }
                if (!fs.existsSync(SERVICE_ASSETS_DIR)) {
                    fs.mkdirSync(SERVICE_ASSETS_DIR)
                }
                fs.writeFileSync(SERVICE_ASSETS_JSON_PATH, JSON.stringify(json))
          
                callback()
            }
        )
    }
}
