const engineersModel = require('../models/engineers')
const misc = require('../helpers/misc')
const bcrypt = require('bcrypt')
module.exports = {
    getAll: (req, res) => {
        const s = req.query.s ? req.query.s : '' // to get query params '?' 
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 10
        const sort = req.query.sort ? req.query.sort : 'DESC'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'date_Update'
        let prevPage = parseInt(page) === 1 ? 1 : parseInt(page) - 1
        let nextPage = parseInt(page) + 1

        const pageDetail = {
            search: s,
            page,
            limit,
            sort,
            sortBy,
            prevLink: `${process.env.PORT_API1}${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
            nextLink: req.originalUrl.indexOf('page') === -1 && req.originalUrl.indexOf('?') === -1 ?
                `${process.env.PORT_API1}${req.originalUrl + "?page=" + parseInt(nextPage)}` : req.originalUrl.indexOf('page') === -1 && req.originalUrl.indexOf('?') > -1 ? `${process.env.PORT_API1}${req.originalUrl + "&page=" + parseInt(nextPage)}` : `${process.env.PORT_API1}${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`

        }
        //`http://localhost:3000${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`
        // set key for redis
        // const key = `get-jobs-all-${s}-${page}-${limit}-${sort}-${sortBy}`
        // call redis for selected key
        engineersModel.getEngineers(s, page, limit, sort, sortBy)
            .then(result => {
                //result.forEach((element, index) => {
                   // result[index].Photo = `${process.env.PORT_API1}` + element.Photo
               // })
                return misc.responsePagination(res, 200, false, 'Success get all engineers', pageDetail, result)
            })
            .catch(err => {
                console.log(err)
                return misc.response(res, 400, true, 'Error get all engineers')
            })
    },
    postEngineers: (req, res) => {
        const Photo = typeof req.file === 'undefined' ? '' : `${process.env.PORT_API1}` + '/images/' + req.file.filename
        const Date_created = new Date()
        const Date_update = new Date()
        // const DOB = null
        const { Name, Description, Skill, Location, Showcase, email, expected_salary, password, DOB } = req.body
        bcrypt.hash(password, 10, function (err, hash) {
            const data = { Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email, expected_salary, Photo, password: hash }

            engineersModel.addEngineers(data)
                .then(result => {
                    res.status(200).json({
                        status: 200,
                        error: false,
                        data,
                        message: 'Success add new engineer'
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Error add engineer'
                    })
                })
        })
    },
    getById: (req, res) => {
        engineersModel.getById(req.params)
            .then(result => {
                //result[0].Photo = `${process.env.PORT_API1}` + result[0].Photo
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error get engineer by id'
                })
            })
    },
    updateEngineering: (req, res) => {
        const Photo = typeof req.file === 'undefined' ? null : req.body.Photo ? req.body.Photo : `${process.env.PORT_API1}` + '/images/' + req.file.filename
        const engineer_id = req.params.id
        const date_update = new Date()
        const { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, email, expected_salary } = req.body
        const data = {
            id, Name, Description, Skill, Location, DOB, Showcase, Date_created, date_update, email, expected_salary, Photo
        }
        engineersModel.updateEngineer(data, engineer_id)
            .then(result => {
                res.status(201).json({
                    status: 201,
                    error: false,
                    data,
                    message: 'Success update engineer'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error update engineer'
                })
            })
    },
    deleteEngineer: (req, res) => {
        const id = req.params.id
        engineersModel.deleteById(id)
            .then(result => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Success delete engineer id: ' + id
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error delete engineer'
                })
            })
    }
}
