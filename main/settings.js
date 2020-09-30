const Sequelize = require('sequelize')

const db= new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host:process.env.DB_HOST,
    dialect: 'postgres'
})

function forceTable(){
    db.sync({force: true})
    .then(()=>console.log('Connection succeeded'))
    .catch(err => console. log('There was an error', err))
}

function alterTable(){
    db.sync({alter: true})
    .then(()=>console.log('Connection succeeded'))
    .catch(err => console. log('There was an error', err))
}

module.exports = {db, forceTable, alterTable}