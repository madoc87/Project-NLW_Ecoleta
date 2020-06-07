const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta publica
server.use(express.static("public"))

//Habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded ({ extended: true }))


//utilizando template engine
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})

// Configurar caminhos da minha aplicacao
// Pagina inicial
server.get("/", (req, res) => {
    return res.render("index.html", { title: "Seu marketplace de coleta de resídos" })
})



server.get("/create-point", (req, res) => {

    //req.query: São os Query Strings da nossa url
    // console.log(req.query)



    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    // req.body: O corpo do nosso formulario
    // Inserir dados no banco de dados 
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

    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.render("create-point.html", { error: true })
        }

        console.log("Cadastrado com sucesso")
        console.log(this)
        return res.render("create-point.html", { saved: true })
    }
    db.run(query, values, afterInsertData)



})





server.get("/search-results", (req, res) => {

    const search = req.query.search

    if(search == ""){
        return res.render("search-results.html", { total: 0 })
    }

    //Pegar os dados do banco de dados [Comando LIKE serve para deixar a buscar mais flexivel podendo ser qualque valor antes ou depois]
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
    if(err){
        return console.log(err)
    }

    const total = rows.length
    //Mostrar a pagina html com os dados do bd
    return res.render("search-results.html", { places: rows, total: total})
    })


    
}) 

//ligar o servidor
server.listen(5000)