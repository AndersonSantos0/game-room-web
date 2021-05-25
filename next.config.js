module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
    ]
  },
  images:{
    domains: ['images.igdb.com'],
    loader: "imgix",
    path: "",
  },
}