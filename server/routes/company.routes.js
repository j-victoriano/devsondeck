const CompanyController = require("../controllers/company.controller")
const {authenticateCompany} = require("../config/jwt.config")

module.exports = (app) => {
    app.get('/api/company/allCompanies', CompanyController.findAllCompanies)
    app.post('/api/company/register', CompanyController.register)
    app.post('/api/company/login', CompanyController.login)
    app.post('/api/company/logout', CompanyController.logout)
    app.get('/api/company',authenticateCompany, CompanyController.getLoggedInCompany)
}