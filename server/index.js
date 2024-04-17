const express = require('express');
const {sequelize} = require('./Database/index.js');
const { incertUsersAndClients } = require('./Database/InsertData.js');
const router = require('./routers.js');

const App = express();
App.use(express.json());
App.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, PATCH, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
App.use('/api',router);




async function StartServer(){
    try {
        await sequelize.authenticate();
        await sequelize.sync().then(() => {
            console.log('Models synchronized successfully.');
          });
          incertUsersAndClients();
        App.listen(5000,()=>{   
            console.log("Server started on port ", 5000)
        })
    } catch (error) {
        console.log(error)
    }
}
StartServer();
