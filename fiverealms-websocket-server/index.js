const ws = require('ws')
const http = require('http')
const port = 8081
console.log('WebSocket Server Launch at Port: ' + port)
const wss = new ws.WebSocketServer({ port: port })
wss.on('connection', function connection(ws, req) {
    console.log('connection established', req.url)
    ws.on('error', console.error)
    ws.on('message', function message(data) {
        console.log('message', data)
        ws.send(JSON.stringify('Heard ya boss.'))
        let commandData = JSON.parse(data)
        console.log('received: %s', commandData)
        let postData = {
            playerId: '123', 
            command: commandData.command
        }
        let postString = JSON.stringify(postData)
        let request = http.request({
            hostname: '127.0.0.1',
            port: 3000,
            path: '/',
            method: 'POST', 
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': postString.length
            }
        }, res => {
            resBody = ''
            res.on('data', chunk => {
                resBody += chunk.toString()
            })
            res.on('end', ()=>{
                console.log('QUEUE RESPONSE', res.statusCode, resBody)
            })
        })
        request.on('error', e => {
            console.error(e)
        })
        request.write(postString)
        request.end()
    })
    ws.on('close', () => {
        console.log('connection closed')
    })
    ws.send(JSON.stringify("hello"))
})