
const http = require('http')
const JSONdb = require('simple-json-db')
const hostname = '127.0.0.1'
const port = 4000
const users = new JSONdb('db/users.json')
const server = http.createServer((req, res) => {
    console.log('request received', req.method, req.url)
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET')
    res.setHeader('Access-Control-Max-Age', 2592000)
    let lowerl = req.url.toLowerCase()
    if(lowerl.startsWith('/authenticate')){
        res.setHeader('Content-Type', 'text/plain')
        let body = ''
        req.on('data', chunk => {
            console.log('data bit')
            body += chunk.toString()
        });
        req.on('end', () => {
            let loginAttempt = JSON.parse(body)
            let user = users.get(loginAttempt.username)
            if(user && user.password === loginAttempt.password){
                res.statusCode = 200
                console.log('LOGIN SUCCESS')
                res.end('TOKEN')
            }else{
                res.statusCode = 401
                console.log('LOGIN REJECTED')
                res.end('LOGIN REJECTED')
            }
        });
    } else if(lowerl.startsWith('/authorize')){
        res.statusCode = 403
        res.statusCode = 200
        res.setHeader('Content-Type', 'text/plain')
        res.end('Authorize')
    } else {
        res.statusCode = 404
        console.log('BAD PATH')
        res.end('Path not valid.')
    }
})
server.listen(port, hostname, () => {
  console.log(`Identity Server at http://${hostname}:${port}/`)
}) 