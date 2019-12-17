const engineersModel = require('../models/engineers')
const misc = require('../helpers/misc')
module.exports = {
    getAll: (req, res) => {
        const s = req.query.s ? req.query.s : '' // to get query params '?'
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 10
        const sort = req.query.sort ? req.query.sort : 'DESC'
        const sortBy = req.query.sortBy ? req.query.sortBy : 'date_Update'
        const prevPage = parseInt(page) === 1 ? 1 : parseInt(page) - 1
        const nextPage = parseInt(page) + 1
        const pageDetail = {
            search: s,
            page,
            limit,
            sort,
            sortBy,
            prevLink: `http://localhost:3000/${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
            nextLink: `http://localhost:3000/${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`
        }
        // set key for redis
        // const key = `get-jobs-all-${s}-${page}-${limit}-${sort}-${sortBy}`
        // call redis for selected key
        engineersModel.getEngineers(s, page, limit, sort, sortBy)
            .then(result => {
                return misc.responsePagination(res, 200, false, 'Success get all Jobs', pageDetail, result)
            })
            .catch(err => {
                console.log(err)
                return misc.response(res, 400, true, 'Error get all engineers')
            })
    },
    postEngineers: (req, res) => {
        const Photo = '/images/' + req.file.filename
        const { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email, expected_salary } = req.body
        const data = { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email, expected_salary, Photo }
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
    },
    getById: (req, res) => {
        engineersModel.getById(req.params)
            .then(result => {
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
        const Photo = '/images/' + req.file.filename
        const engineer_id = req.params.id
        const dateUpdate = Date.now()
        const { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, email, expected_salary } = req.body
        const data = {
            id, Name, Description, Skill, Location, DOB, Showcase, Date_created, dateUpdate, email, expected_salary, Photo
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
