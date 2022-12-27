const { src, dest, parallel, series, task } = require('gulp')
const Ora = require('ora')
const yargs = require('yargs')
const argv = yargs.alias({
    'dist': 'd',
    'env': 'e',
    'lsVersion': 'l',
    'scope': 's',
    'public': 'p'
}).default({
    'dist': 'frontend',
    'env': 'master',
    'lsVersion': 'dev',
    'public': false
}).describe({
    'dist': 'build output dist directory',
    'env': 'environment [dev, test, master, external]',
    'lsVersion': 'localStorage version',
    'public': 'static resource'
}).argv

const { dist, env, lsVersion, scope, public } = argv

task('build', cb => {
    const spinner = new Ora('building bk-ci frontend project').start()
    const scopeCli = scope && typeof scope === 'string'
        ? (scope.split(',').filter(Boolean).length > 1
            ? `--scope=devops-{${scope}}`
            : `--scope=devops-${scope}`)
        : ''
    require('child_process').exec(`lerna run public:${env} ${scopeCli} -- --env.dist=${dist} --env.lsVersion=${lsVersion}`, {
        maxBuffer: 5000 * 1024
    }, (err, res) => {
        if (err) {
            console.log(err)
            process.exit(1)
        }
        spinner.succeed(`Finished building bk-ci frontend project`)
        cb()
    })
})

exports.default = parallel('build')
