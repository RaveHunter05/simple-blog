const {Sequelize, DataTypes} = require('sequelize')

const {db} = require('../main/settings')


//Blog
const Blog = db.define('Blog',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    }
})

//Categorias

const Categories = db.define('Categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {Blog, Categories}