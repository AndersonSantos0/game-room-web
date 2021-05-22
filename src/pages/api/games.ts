import Cors from 'cors'
import initMiddleware from "../../lib/init-middleware"
import { api } from "../../services/api"

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

  //sort first_release_date desc;

  let query

  const RatingGamesQuery = `
    fields name, summary, storyline, cover, first_release_date, total_rating, rating;
    where first_release_date < ${Math.floor(new Date().getTime() / 1000)} & total_rating > 0 & category = 0;
    sort total_rating_count desc;
    limit: ${req.query?.qtd || 30};
    offset: ${Number(req.query.index) > 0 ? Number(req.query.index) * Number(req.query.qtd) : 0};
  `

  const NewestGamesQuery = `
    fields name, summary, storyline, cover, first_release_date;
    where first_release_date > 0 & first_release_date < ${Math.floor(new Date().getTime() / 1000)} & category = 0;
    sort first_release_date desc;
    limit: ${req.query?.qtd || 30};
    offset: ${Number(req.query.index) > 0 ? Number(req.query.index) * Number(req.query.qtd) : 0};
  `

  switch (req.query.section) {
    case 'rating':
      query = RatingGamesQuery
      break;
    case 'newest':
      query = NewestGamesQuery
      break;
  }

  const gamesReponse = await api.igdb.post('games', query, {
    headers
  })

  const coverList = gamesReponse.data.map(game => game.cover).filter(cover => typeof cover === 'number')

  const coverQuery = `
    fields url;
    where id = (${coverList.join(',')});
    limit: ${req.query?.qtd || 30};
  `

  const gameCovers = await api.igdb.post('covers', coverQuery, {
    headers
  })

  const tratedGameCovers = gameCovers.data.map(cover =>{

    const url = cover.url.replace('t_thumb', 't_cover_big')

    return {...cover, url}
  })

  let data = gamesReponse.data.map(game => {
    return {
      ...game, cover: tratedGameCovers.filter(cover => cover.id === game.cover)[0]
    }
  })

  res.status(200).json(data)
}
