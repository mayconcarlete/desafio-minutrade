import server from './main/config/app'

const port = 3000 || process.env.SERVER_PORT

server.listen(port, () => {
  console.log(`We are running on port: ${port}`)
})
