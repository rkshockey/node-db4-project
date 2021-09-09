const express = require('express');
const recipeRouter = require('./recipes/recipe_router')

const server = express()

server.use(express.json())

server.use('/api/recipes', recipeRouter)

server.use('*', (req, res) => {
    res.status(404).json({ message: 'The endpoint you are trying to reach does not exist'})
})

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({ message: err.message })
})

module.exports = server
