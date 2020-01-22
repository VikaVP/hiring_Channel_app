require('dotenv/config')
const accountsModel = require('../models/accounts')
const bcrypt = require('bcrypt')
module.exports = {
    getAll: (req, res) => {
        const s = req.query.s ? req.query.s : '' // to get query params '?' 
        const page = req.query.page ? req.query.page : 1
        const limit = req.query.limit ? req.query.limit : 10
        const sort = req.query.sort ? req.query.sort : 'DESC'
        accountsModel.getAccounts(s, page, limit, sort)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error get all accounts'
                })
            })
    },
    postAccounts: (req, res) => {
        const { Name, email, password, role } = req.body
        const salt = bcrypt.genSalt(10)
        //const hashedPassword = bcrypt.hash(password, salt)

        console.log(req.body, "cekkkk")
        bcrypt.hash(password, 10, function (err, hash) {
            // Store hash in your password DB.
            const data = {
                Name,
                email,
                password: hash,
                role
            }
            accountsModel.addAccounts(data)
                .then(result => {
                    res.status(200).json({
                        status: 200,
                        error: false,
                        data,
                        message: 'Success add new account'
                    })
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({
                        status: 400,
                        error: true,
                        message: 'Error add account'
                    })
                })

        })
    },
    getById: (req, res) => {
        accountsModel.getById(req.params)
            .then(result => {
                res.json(result)
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error get account by id'
                })
            })
    },
    updateAccounts: (req, res) => {
        const id = req.params.id
        const { Name, password, role } = req.body
        const data = {
            id, Name, password, role
        }
        accountsModel.updateAccounts(data, id)
            .then(result => {
                res.status(201).json({
                    status: 201,
                    error: false,
                    data,
                    message: 'Success update account'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error update account'
                })
            })
    },
    deleteAccounts: (req, res) => {
        const id = req.params.id
        accountsModel.deleteById(id)
            .then(result => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    message: 'Success delete account id: ' + id
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error delete account'
                })
            })
    },
    sort: (req, res) => {
        const limit = req.query.limit
        const offset = req.query.offset
        const order = req.query.order
        accountsModel.readAllSortBy(req.params.sort, limit, offset, order)
            .then(result => {
                res.status(200).json({
                    status: 200,
                    error: false,
                    result,
                    message: 'Success sort account'
                })
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error sort account'
                })
            })
    },
    page: (req, res) => {
        const limit = req.query.limit
        accountsModel.page(req.params.page, limit)
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
                            message: 'accounts data in mode pagination'
                        })
                    }
                }
            })
            .catch(err => {
                console.log(err)
                res.status(400).json({
                    status: 400,
                    error: true,
                    message: 'Error pagination accounts data'
                })
            })
    }
}
