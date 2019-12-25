require('dotenv/config')
const companiesModel = require('../models/companies')
const misc = require('../helpers/misc')
const bcrypt = require('bcrypt')
module.exports = {
  getAll: (req, res) => {
    const s = req.query.s ? req.query.s : '' // to get query params '?' 
    const page = req.query.page ? req.query.page : 1
    const limit = req.query.limit ? req.query.limit : 10
    const sort = req.query.sort ? req.query.sort : 'DESC'
    let prevPage = parseInt(page) === 1 ? 1 : parseInt(page) - 1
    let nextPage = parseInt(page) + 1
    const pageDetail = {
      search: s,
      page,
      limit,
      sort,
      prevLink: `${process.env.PORT_API1}}${req.originalUrl.replace('page=' + page, 'page=' + prevPage)}`,
      nextLink: req.originalUrl.indexOf('page') === -1 && req.originalUrl.indexOf('?') === -1 ?
        `${process.env.PORT_API1}${req.originalUrl + "?page=" + parseInt(nextPage)}` : req.originalUrl.indexOf('page') === -1 && req.originalUrl.indexOf('?') > -1 ? `${process.env.PORT_API1}${req.originalUrl + "&page=" + parseInt(nextPage)}` : `${process.env.PORT_API1}${req.originalUrl.replace('page=' + page, 'page=' + nextPage)}`

    }
    companiesModel.getCompanies(s, page, limit, sort)
      .then(result => {
        result.forEach((element, index) => {
          result[index].Logo = `${process.env.PORT_API1}` + element.Logo
        })
        return misc.responsePagination(res, 200, false, 'Success get all Companies', pageDetail, result)
      })
      .catch(err => {
        console.log(err)
        return misc.response(res, 400, true, 'Error get all companies')
      })
  },
  postCompanies: (req, res) => {
    const Logo = '/images/' + req.file.filename
    const { Name, Location, Description, email, password } = req.body
    bcrypt.hash(password, 10, function (err, hash) {
      const data = { Name, Logo, Location, Description, email, password: hash }
      companiesModel.addCompanies(data)
        .then(result => {
          res.status(200).json({
            status: 200,
            error: false,
            data,
            message: 'Success add new companies'
          })
        })
        .catch(err => {
          console.log(err)
          res.status(400).json({
            status: 400,
            error: true,
            message: 'Error add companies'
          })
        })
    })
  },
  getById: (req, res) => {
    companiesModel.getById(req.params)
      .then(result => {
        result[0].Logo = `${process.env.PORT_API1}` + result[0].Logo
        res.json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Error get company by id'
        })
      })
  },
  updateCompanies: (req, res) => {
    const Logo = '/images/' + req.file.filename
    const company_id = req.params.id
    const { id, Name, Location, Description, email } = req.body
    const data = {
      id, Name, Logo, Location, Description, email
    }
    companiesModel.updateCompany(data, company_id)
      .then(result => {
        res.status(201).json({
          status: 201,
          error: false,
          data,
          message: 'Success update company'
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Error update company'
        })
      })
  },
  deleteCompany: (req, res) => {
    const id = req.params.id
    companiesModel.deleteById(id)
      .then(result => {
        res.status(200).json({
          status: 200,
          error: false,
          message: 'Success delete company id: ' + id
        })
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Error delete company'
        })
      })
  }
}
