import { db } from './firebase'

const UserService = {
  getUsers() {
    return db
      .collection('users')
      .get()
      .then(users => {
        const _users = []
        users.forEach(user => {
          _users.push(user.data())
          console.log(user.data())
        })
        return users
      })
  }
}

export default UserService
