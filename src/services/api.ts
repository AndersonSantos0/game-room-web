import axios from "axios"

const client_id = "15jkk9eg5ozqiosdn5ev1vcx5j7t5f"
const client_secret = "79vx4dhidl32zqa0pit4lebdz0ordv"
const grant_type = "client_credentials"
const isProd = process.env.NODE_ENV === "production"

export const getGRBT = async () => {

  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id,
      client_secret,
      grant_type
    }
  })

  return "Bearer " + response.data.access_token
}

export const api = {
  igdb: axios.create({
    baseURL: 'https://api.igdb.com/v4/',
    headers: {
      "Client-ID": client_id
    },
  }),
  grapi: axios.create({
    baseURL: isProd ? 'https://game-room.vercel.app/api/' : 'http://localhost:3000/api/',
    headers: {
      "Client-ID": client_id
    },
  }),
}