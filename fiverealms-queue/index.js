const queue = []

const JSONdb = require('simple-json-db')
const world = new JSONdb('db/world.json')
const rooms = new JSONdb('db/rooms.json')
const items = new JSONdb('db/items.json')
const skills = new JSONdb('db/skills.json')
const players = new JSONdb('db/players.json')
const monsters = new JSONdb('db/monsters.json')

const http = require('http')
const hostname = '127.0.0.1'
const port = 3000
const server = http.createServer((req, res) => {
    console.log('request received', req.method)
    let body = '';
    req.on('data', chunk => {
        body += chunk.toString()
    })
    req.on('end', () => {
        let command = JSON.parse(body)
        console.log('ADDED TO QUEUE', command)
        queue.push(command)
        res.end('ADDED TO QUEUE')
    })
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/plain')
})
server.listen(port, hostname, () => {
  console.log(`Queue Server at http://${hostname}:${port}/`)
}) 

function processQueue(){
    if(queue.length === 0) return setTimeout(()=>{processQueue()}, 500)
    let input = queue.shift()
    console.log('QUEUE COMMAND PROCESSED', input)
}
processQueue()