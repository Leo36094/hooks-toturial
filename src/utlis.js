export const login = ({ username, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (username === 'leo' && password === '123') {
        resolve(console.log('login success'))
      } else reject(console.error('Wrong username or password!'))
    }, 1000)
  })
}
