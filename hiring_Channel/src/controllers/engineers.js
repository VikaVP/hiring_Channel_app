const engineersModel = require('../models/engineers')
module.exports = {
    getAll: (req, res) => {
        const search = req.query.search
        engineersModel.getEngineers(search)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error get all engineers'
                })
            })
    },
    postEngineers: (req, res) => {
        const { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email } = req.body
        const data = { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email }
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
        const engineer_id = req.params.id
        const { id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email } = req.body
        const data = {
            id, Name, Description, Skill, Location, DOB, Showcase, Date_created, Date_update, email
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
    },
    sort: (req, res) => {
        engineersModel.readAllSortBy(req.params.sort)
            .then(result => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    result,
                    message: 'Success sort engineer'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error sort engineer'
                })
            })
    },
    page: (req, res) => {
        engineersModel.page(req.params.page)
            .then(result => {
                if (typeof (result) === 'number') {
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'oops there is no page again'
                    })
                } else {
                    if (result.length === 0) {
                        res.status(400).json({
                            status: 400,
                            error: true,
                            message: 'oops there is no page again'
                        })
                    } else {
                        res.status(200).json({
                            status: 200,
                            error: false,
                            result,
                            message: 'Engineers data in mode pagination'
                        })
                    }

                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error pagination engineers data'
                })
            })
    }
}