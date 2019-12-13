require('dotenv/config')
const { response } = require('../helpers/helper')
const accountsModel = require('../models/accounts')
const bcrypt = require('bcryptjs')
module.exports = {
    getAll: (req, res) => {
        const limit = req.query.limit
        const offset = req.query.offset
        const search = req.query.search
        const order = req.query.order
        accountsModel.getAccounts(search, limit, offset, order)
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
        const salt = bcrypt.genSaltSync(10)
        bcrypt.hash(req.body.password, salt, (err, hash) => {
            const { username, email, password, role } = req.body
            const data = {
                username,
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
        const { id, username, password, role } = req.body
        const data = {
            id, username, password, role
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
