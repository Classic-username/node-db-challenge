const express = require("express");

const db = require('./data/db-config.js')

const server = express();

server.use(express.json());

server.get('/api/projects', (req, res) => {
    db('project')
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.get('/api/resources', (req, res) => {
    db('resource')
        .then(resources => {
            res.status(200).json(resources)
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.get('/api/tasks', (req, res) => {
    db('task')
    .then(tasks => {
        res.status(200).json(tasks)
    })
    .catch(error => {
        res.status(500).json(error)
    })
})

server.post('/api/projects', (req, res) => {
    db('project').insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('project')
                .where({id})
                .first()
            .then(project => {
                res.status(201).json(project)
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.post('/api/resources', (req, res) => {
    db('resource').insert(req.body)
        .then(ids => {
            const id = ids[0]
            db('resource')
                .where({id})
                .first()
            .then(resource => {
                res.status(201).json(resource)
            })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})

server.post('/api/projects/:id/tasks', (req, res) => {
    const thisId = req.params.id
    const taskInfo = req.body
    // console.log(taskInfo)
    
    db('task').insert(taskInfo)
        .then(ids => {
            console.log(ids)
            // const id = ids[0]
            // db('task')
            //     .where({id})
            //     .first()
            // .then(task => {
            //     res.status(201).json(task)
            // })
        })
        .catch(error => {
            res.status(500).json(error)
        })
})


module.exports = server;