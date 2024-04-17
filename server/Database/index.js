const { DataTypes } = require('sequelize');
const { Sequelize } = require('sequelize');
//const Database = require('./Database/index.js')
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database/database.sqlite',
    logging:false,
  });

const Users = sequelize.define('Users', {
    full_name:{
        type:DataTypes.STRING,
        unique:true,
        allowNull:false,
        primaryKey:true
    },
    login: {
        type:DataTypes.STRING,
        allowNull:false
    },
    password:{
        type: DataTypes.STRING,
        allowNull:false
    }
},{createdAt:false,updatedAt:false});

const Clients = sequelize.define('Clients', {
    account_number: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey:true
    },
    last_name:{
          type:DataTypes.STRING,
          allowNull:false
      },
    first_name: {
        type:DataTypes.STRING,
        allowNull:false
    },
    middle_name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    birthday_DATE:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    INN:{
        type: DataTypes.STRING,
        allowNull:false
    },
    responsible_full_name:{
        type: DataTypes.STRING,
        allowNull:false,
        references:{
            model:Users,
            key: 'full_name',
        }
    },
    status:{
        type: DataTypes.ENUM,
        values:['В работе','Отказ','Сделка закрыта', 'Не в работе'],
        defaultValue:'Не в работе',
        allowNull:false
    }
  },{createdAt:false,updatedAt:false});
    
module.exports = { Users, Clients,  sequelize }; 