const path = require('path')
const express = require('express')
const hbs = require('hbs')
const request = require('request')
const cotacao = require('./util/cotacao')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


app.use(express.static(publicDirectoryPath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Cotação',
        author: 'Felipe'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: 'Sobre',
        author: 'Felipe Teixeira'
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        title: 'Ajuda'
    })
})

//definindo rotas com express

app.get('/cotacoes', (req, res) =>{

    if(!req.query.ativo){
        return res.status(400).json({
            error: {
                mensage: 'O ativo deve ser informado',
                code: 400
            }
        })
    }

    const symbol = req.query.ativo.toUpperCase()

    cotacao(symbol, (err, body) =>{
        if(err){

            return res.status(err.code).json({error: {
                mensage: err.mensage,
                code: err.code
            }})
        }
        res.status(200).json(body)
    })

})

app.get('/help*', (req, res) =>{
    //res.send('Ops 404 do Help')
    res.render('404', {
        title: '404',
        errormensage: 'Não existe pagina depois do /Help',
        author: 'Felipe Teixeira'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        title: '404',
        errormensage: 'Página não encontrada',
        author: 'Felipe Teixeira'
    })
})

const port = process.env.PORT || 3000

app.listen(port, () =>{
    console.log(`Server online na porta ${port}`)
})