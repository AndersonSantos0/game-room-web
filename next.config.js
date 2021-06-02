module.exports = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/home',
        permanent: false,
      },
      {
        source: '/hot',
        destination: '/coming',
        permanent: false,
      },
      {
        source: '/favorites',
        destination: '/coming',
        permanent: false,
      },
      {
        source: '/library',
        destination: '/coming',
        permanent: false,
      },
      {
        source: '/store',
        destination: '/coming',
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