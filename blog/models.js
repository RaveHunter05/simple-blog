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
    },
    mainImage: {
        type: DataTypes.TEXT
    }
})

const User = db.define('User', {
    name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    nickname:{
        type: DataTypes.STRING,
        allowNull: false
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