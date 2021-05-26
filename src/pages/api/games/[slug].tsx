import Cors from 'cors'
import { useRouter } from 'next/router'
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

  const slug = req.query.slug

  await cors(req, res)

  const headers = {
    "Authorization": req.headers.authorization,
  }

  const query = `
    fields name, summary, storyline, screenshots.image_id, cover.image_id, first_release_date, videos.video_id, involved_companies.company.name, involved_companies.publisher, genres.name, aggregated_rating, aggregated_rating_count, total_rating, total_rating_count;
    where slug = "${slug}";
    limit: 1;
    offset: 0;
  `

  const gamesReponse = await api.igdb.post('games', query, {
    headers
  })

  const gameResponseData = gamesReponse.data

  let data = gameResponseData.map(game => {
    return {
      ...game, 
    }
  })

  data[0] ?
    res.status(200).json(data[0])
  :
    res.status(404).json("Game not found")
}
