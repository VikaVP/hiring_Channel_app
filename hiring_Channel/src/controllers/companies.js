const companiesModel = require('../models/companies')
module.exports = {
  getAll: (req, res) => {
    companiesModel.getCompanies()
      .then(result => {
result.forEach((element, index) => {
                    result[index].Logo = 'http://localhost:3003' + element.Logo
                })
        res.json(result)
      })
      .catch(err => {
        console.log(err)
        res.status(400).json({
          status: 400,
          error: true,
          message: 'Error get all companies'

        })
      })
  },
  postCompanies: (req, res) => {
    const Logo = '/images/' + req.file.filename
    const { Name, Location, Description, email } = req.body
    const data = { Name, Logo, Location, Description, email }
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
  },
  getById: (req, res) => {
    companiesModel.getById(req.params)
      .then(result => {
result[0].Logo = 'http://localhost:3003' + result[0].Logo
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
