const express = require('express')
const routes = express.Router()

const db = require("./database/db")

routes.get("/", (req, res) => {
    return res.render("index.njk")
})

routes.get("/create-point", (req, res) => {
    return res.render("create-point.njk")
})

routes.post("/savepoint", (req, res) => {
    const query = `
        INSERT INTO places (
            image,
            name,
            address,
            address2,
            state,
            city,
            items
        ) VALUES (?,?,?,?,?,?,?);
    `
    const values = [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items
    ]

    function afterInsertData(err) {
        if (err) {
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso")
        console.log(this)

        return res.render("create-point.njk", { saved: true })
    }

    db.run(query, values, afterInsertData)

})

routes.get("/search", (req, res) => {
    const search = req.query.search

    if (search == "") return res.render("search-results.njk", { total: 0 })

    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function (err, rows) {
        if (err) {
            return console.log(err)
        }
        const total = rows.length

        return res.render("search-results.njk", { places: rows, total: total })
    })
})


module.exports = routes