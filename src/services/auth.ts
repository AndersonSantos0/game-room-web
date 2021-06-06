import { auth } from './firebase'
import firebase from 'firebase/app'

const AuthService = {
  async isLoggedIn() {
    const user = await auth().currentUser
    return !!user
  },

  observeStatus(callback) {
    auth().onAuthStateChanged(callback)
  },

  async loginWithGoogle() {
    const Provider = new auth.GoogleAuthProvider()

    return auth()
      .signInWithPopup(Provider)
      .then(res => {
        const token = res.credential as firebase.auth.OAuthCredential
        const user = res.user

        return { token, user }
      })
  },

  async loginWithFacebook() {
    const Provider = new auth.FacebookAuthProvider()

    return auth()
      .signInWithPopup(Provider)
      .then(res => {
        const token = res.credential as firebase.auth.OAuthCredential
        const user = res.user

        return { token, user }
      })
  }
}

export default AuthService
