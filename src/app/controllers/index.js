const Model = require('../models/index')

module.exports = {
    index(req, res) {
        return res.render('index.njk')
    },
    createPoint(req, res) {
        return res.render('create-point.njk')
    },
    async savePoint(req, res) {
        await Model.create(req.body)

        return res.render('create-point.njk', { saved: true })
    },
    async search(req, res) {
        const { search } = req.query

        if (search == '') return res.render('search-results.njk', { total: 0 })

        const places = await Model.search(search)

        return res.render('search-results.njk', { places, total: places.length })
    }
}