
const fs = require('fs')


const createPostsJson = () => {
    let postDirs = fs.readdirSync('src/assets/posts')
    let posts = {}
    for(let postDir of postDirs){
        posts[postDir] = JSON.parse(fs.readFileSync(`src/assets/posts/${postDir}/index.json`))
    }
    fs.writeFileSync('src/assets/posts.json', JSON.stringify(posts, null, 2))
}

createPostsJson()