import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'Admin User',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    isAdmin: true
  },

  {
    name: 'Mustafa Zakaria',
    email: 'Mustafa@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
  {
    name: 'Yousef',
    email: 'Yousef@test.com',
    password: bcrypt.hashSync('123456', 10),
  },
]

export default users