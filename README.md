<br />
<p align="center"><img height="64px" src="./public/favicon.png" /></p>
<hr />

<p align="center"><img src="https://game-room.vercel.app/assets/image/preview.png"></p>


# About

The Game room uses the IGDB (internet game database), Twitch's API which is responsible for 100% of the game information presented on the project (for now). Unfortunately the IGDB API has no translation of the contents so the site is 80/20 English and Portuguese.

### <img height="12" src="./public/favicon.png" /> [Vercel project](https://game-room.vercel.app/home)

<br />

## Usage

### Get the project

```
$ git clone https://github.com/AndersonSantos0/game-room.git
```

### Install Dependencies

```
# using yarn
$ yarn

# using npm
$ npm install
```

### Config env variables

get client_id and client_secret on
[Twitch developers console](https://dev.twitch.tv/console)

```
create a .env.local file in the root

add CLIENT_ID and CLIENT_SECRET, like .env.example
use your client_secret and client_id 
```
[how to get client_id and client_secret](https://api-docs.igdb.com/#about)

### Use it

```
# development mode
$ yarn dev or npm run dev

# production build
$ yarn build or npm run build
$ yarn start or npm run start
```
