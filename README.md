# pokego-rater-cli

Command line tool to get actual IV values of your Pokemon in Pokemon Go.

## Setup

Create a `credentials.json` based on the example.

- `provider` - must be either `google` or `pokemon-club`
- `location` - mostly irrelevant for now but required to be there
- `username` - email address associated with the google/pokemon-club account
- `password` - account password (if you're using 2 step auth with Google see: https://support.google.com/accounts/answer/185833)

## Usage

`node pokemon`  
Prints all Pokemon in alphabetical order, ranked by IV total then CP.

`node pokemon <pokemon name>`
Printsa all of that kind of Pokemon in alphabetical order, ranked by IV total then CP.
