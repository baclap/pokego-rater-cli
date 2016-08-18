// internal dependencies
const api = require('pokemon-go-api')
const pokemonFactory = require('./pokemon-factory')
const jsonfile = require('jsonfile')
const credsFile = './credentials.json'

const creds = jsonfile.readFileSync(credsFile)

api.login(creds.username, creds.password, creds.provider)
    .then(() => {
        return api.location.set('address', creds.location).then(api.getPlayerEndpoint)
    })
    .then(api.inventory.get)
    .then((inventory) => {
        const filterName = process.argv[2]
        const allPokemon = []
        inventory.forEach(function(item) {
            const pokemon = pokemonFactory(item)
            if (pokemon) {
                if (filterName) {
                    if (
                        filterName.replace(/[^a-z0-9+]+/gi, '').toLowerCase()
                        ===
                        pokemon.name.replace(/[^a-z0-9+]+/gi, '').toLowerCase()
                    ) {
                        allPokemon.push(pokemon)
                    }
                } else {
                    allPokemon.push(pokemon)
                }
            }
        })
        return allPokemon
    })
    .then((allPokemon) => {
        // order by name alphabetically
        // then IV total
        // then CP
        // TODO clean this up, allow ordering to be pass in as args...
        allPokemon.sort((a, b) => {
            if (a.name < b.name) {
                return -1
            }
            if (a.name > b.name) {
                return 1
            }
            if (a.name === b.name) {
                if (a.iv_total < b.iv_total) {
                    return 1
                }
                if (a.iv_total > b.iv_total) {
                    return -1
                }
                if (a.iv_total === b.iv_total) {
                    if (a.cp < b.cp) {
                        return 1
                    }
                    if (a.cp > b.cp) {
                        return -1
                    }
                }
            }
            return 0;
        })
        // print out
        console.log(allPokemon)
    })
    .catch((error) => {
        console.log('error', error.stack);
    })
