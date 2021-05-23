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
    fields name, summary, storyline, cover, first_release_date, total_rating, rating, videos;
    where first_release_date > ${Math.floor(new Date('1 1 ' + new Date().getFullYear()).getTime() / 1000)} & first_release_date < ${Math.floor(new Date().getTime() / 1000)} & total_rating > 0 & category = 0;
    sort total_rating desc;
    limit: ${req.query?.qtd || 30};
    offset: ${Number(req.query.index) > 0 ? Number(req.query.index) * Number(req.query.qtd) : 0};
  `

  const NewestGamesQuery = `
    fields name, summary, storyline, cover, first_release_date, videos;
    where first_release_date > 0 & first_release_date < ${Math.floor(new Date().getTime() / 1000)} & category = 0;
    sort first_release_date desc;
    limit: ${req.query?.qtd || 30};
    offset: ${Number(req.query.index) > 0 ? Number(req.query.index) * Number(req.query.qtd) : 0};
  `

  const ComingGamesQuery = `
    fields name, summary, storyline, cover, first_release_date, videos;
    where first_release_date > ${Math.floor(new Date().getTime() / 1000)} & category = 0;
    sort first_release_date asc;
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
    case 'coming':
      query = ComingGamesQuery
      break;
  }

  const gamesReponse = await api.igdb.post('games', query, {
    headers
  })

  const gameResponseData = gamesReponse.data

  const coverList = gameResponseData.map(game => game.cover).filter(cover => typeof cover === 'number')

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

  const videos = gameResponseData.map(game => game.videos && game.videos[game.videos.length - 1]).filter(cover => typeof cover === 'number')

  const videoQuery = `
    fields video_id, game;
    sort id desc;
    where id = (${videos.join(',')});
    limit: ${req.query?.qtd || 30};
  `

  const gameVideos = await api.igdb.post('game_videos', videoQuery, {
    headers
  })

  let data = gameResponseData.map(game => {

    delete game.videos

    return {
      ...game, 
      cover: tratedGameCovers.filter(cover => cover.id === game.cover)[0],
      video: gameVideos.data.filter(video => video.game === game.id)[0]?.video_id
    }
  })

  res.status(200).json(data)
}
