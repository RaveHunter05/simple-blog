const {Sequelize, DataTypes} = require('sequelize')

const {db} = require('../main/settings')

const {User} = require('../users/models')


//Blog
const Blog = db.define('Blog',{
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mainImage: {
        type: DataTypes.TEXT
    }
})

const Category = db.define('Category', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },

})

// Associations

// Blog - Categoria

Category.hasMany(Blog,{
    foreignKey: 'categories_id'
},{
    onDelete: 'cascade'
})

Blog.belongsTo(Category,{
    foreignKey: 'categories_id'
},{
    onDelete: 'cascade'
})

// Blog - Usuario

User.hasMany(Blog,{
    foreignKey: 'users_id'
},{
    onDelete: 'cascade'
})

Blog.belongsTo(User,{
    foreignKey: 'users_id'
},{
    onDelete: 'cascade'
})

module.exports = {Blog, Category, User}