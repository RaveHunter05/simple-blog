const {Sequelize, DataTypes} = require('sequelize')

const {db} = require('../main/settings')

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

const Categories = db.define('Categories', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = {Blog, Categories}