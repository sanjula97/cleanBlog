const mongoose = require('mongoose')

const Post = require('./database/models/post.js')

mongoose.connect('mongodb://localhost/test-blog')

// Post.create({
//     title: 'My Second blog post',
//     description: 'Second Blog post description',
//     content: 'Second Lorem ipsum content'

// }, (error,post) => {
//     console.log(error,post)
// })

Post.find({
    title: 'My first blog post'
},(error,posts) => {
    console.log(error,posts)
})