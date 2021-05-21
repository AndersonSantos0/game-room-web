module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: true,
      },
    ]
  },
  images:{
    domains: ['images.igdb.com'],
    loader: "imgix",
    path: "",
  },
}