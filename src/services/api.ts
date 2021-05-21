import axios from "axios"

const client_id = "15jkk9eg5ozqiosdn5ev1vcx5j7t5f"
const client_secret = "79vx4dhidl32zqa0pit4lebdz0ordv"
const grant_type = "client_credentials"

export const getGRBT = async () => {

  let grbt = localStorage.getItem('grbt')

  if (grbt) return grbt

  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
    params: {
      client_id,
      client_secret,
      grant_type
    }
  })

  localStorage.setItem('grbt', "Bearer " + response.data.access_token)

  return "Bearer " + response.data.access_token
}

export const api = {
  igdb: axios.create({
    baseURL: 'https://api.igdb.com/v4/',
    headers: {
      "Client-ID": client_id
    },
  })
}