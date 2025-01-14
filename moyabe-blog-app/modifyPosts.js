
const fs = require('fs')


const modifyPosts = () => {
    let postDirs = fs.readdirSync('src/assets/posts')
    for(let postDir of postDirs){
        let post = JSON.parse(fs.readFileSync(`src/assets/posts/${postDir}/index.json`))
        post.cover = 'assets/images/hello-i-m-nik-MAgPyHRO0AA-unsplash.jpg'
        fs.writeFileSync(`src/assets/posts/${postDir}/index.json`, JSON.stringify(post, null, 2))
    }
}

modifyPosts()