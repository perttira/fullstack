const loginResponse = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1sdXVra2FpIiwiaWQiOiI1ZDUxNmY2NmViNjhhNjBjNmIwNGRmZTYiLCJpYXQiOjE1NjY5MDc0ODN9.rLoqkGhGaPGjDK7Utt-zgbaekT-E0SlDE5SGh1tX9hQ",
  "username": "mluukkai",
  "name": "Matti Luukkainen",
  "id": "5d516f66eb68a60c6b04dfe6"
}

const login = () => {
  return Promise.resolve(loginResponse)
}

export default { login }