// internal dependencies
const api = require('pokemon-go-api')
const jsonfile = require('jsonfile')
const credsFile = './credentials.json'

const creds = jsonfile.readFileSync(credsFile)

api.login(creds.username, creds.password, creds.provider)
    .then(() => {
        return api.location.set('address', creds.location).then(api.getPlayerEndpoint)
    })
    .then(api.profile.get)
    .then((profile) => {
        console.log(profile)
    })
    .catch((error) => {
        console.log('error', error.stack);
    })
