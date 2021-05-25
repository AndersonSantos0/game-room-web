import Cors from 'cors'
import initMiddleware from "../../../lib/init-middleware"
import { api } from "../../../services/api"

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET'],
  })
)


export default async function handler(req, res) {

  await cors(req, res)

  const headers = {
    "Authorization": req.headers.authorization,
  }

  const query = `
    fields name, summary, storyline, cover.image_id, first_release_date, videos.video_id, slug;
    where first_release_date > 0 & first_release_date < ${Math.floor(new Date().getTime() / 1000)} & category = 0;
    sort first_release_date desc;
    limit: ${req.query?.qtd || 30};
    offset: ${Number(req.query.index) > 0 ? Number(req.query.index) * Number(req.query.qtd) : 0};
  `

  const gamesReponse = await api.igdb.post('games', query, {
    headers
  })

  const gameResponseData = gamesReponse.data

  let data = gameResponseData.map(game => {
    return {
      ...game
    }
  })

  res.status(200).json(data)
}
