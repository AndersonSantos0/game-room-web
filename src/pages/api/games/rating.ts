import Cors from 'cors'
import initMiddleware from '../../../lib/init-middleware'
import { api, getGRBT } from '../../../services/api'

const cors = initMiddleware(
  // You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
  Cors({
    // Only allow requests with GET, POST and OPTIONS
    methods: ['GET']
  })
)

export default async function handler(req, res) {
  await cors(req, res)

  const headers = {
    Authorization: await getGRBT()
  }

  const actualDate = Math.floor(new Date().getTime() / 1000)
  const yearDate = Math.floor(
    new Date('1 1 ' + new Date().getFullYear()).getTime() / 1000
  )
  const index =
    Number(req.query.index) > 0
      ? Number(req.query.index) * Number(req.query.qtd)
      : 0

  const query = `
    fields name, summary, storyline, cover.image_id, first_release_date, total_rating, rating, videos.video_id, total_rating_count, slug;
    where first_release_date > ${yearDate} & first_release_date < ${actualDate} & total_rating >= 80 & category = 0;
    sort total_rating_count desc;
    limit: ${req.query?.qtd || 30};
    offset: ${index};
  `

  const gamesReponse = await api.igdb.post('games', query, {
    headers
  })

  const gameResponseData = gamesReponse.data

  const data = gameResponseData.map(game => {
    return {
      ...game
    }
  })

  res.status(200).json(data)
}
