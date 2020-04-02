const path = require('path')
const express = require('express')
const expressEdge = require('express-edge')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const fileUpload = require('express-fileupload')

const Post = require('./database/models/post')

const app = new express()

mongoose.connect('mongodb://localhost/cleanblog')

app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)

app.set('views', `${__dirname}/views`)

app.use(bodyParser.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', async(req,res) => {

    const posts = await Post.find({})
    // console.log(posts)
    res.render('index' , {
        posts
    })
})

app.get('/posts/new' , (req,res) => {
    res.render('create')
})

app.post('/posts/store' , (req,res) => {

   console.log(req.files) 
   
    Post.create(req.body , (error,post) => {
        res.redirect('/')
    });
});

app.get('/about', (req,res) => {
    res.render('about')
})

app.get('/post/:id', async(req,res) => {

    const post = await Post.findById(req.params.id)

    res.render('post', {
        post
    })
})

app.get('/contact', (req,res) => {
    res.render('contact')
})

app.listen(9000, () => {
    console.log('App is listning on port 9000')
})