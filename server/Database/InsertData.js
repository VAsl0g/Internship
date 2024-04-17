
const { Users, Clients} = require('./index.js')
const { getRandomFullName,  generateString, getRandomLastName, getRandomFirstName, getRandomMiddleName, getRandomDate } = require('./GenerateData.js')

async function incertUsers(){
    try {
        let arrayFullName=[];
        for(let i=0;i<500;i++){
            arrayFullName.push({
                full_name: getRandomFullName(),
                login: generateString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',5,25),
                password: generateString('ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*?',10,35)
            })
        }
        await Users.bulkCreate(arrayFullName,{ignoreDuplicates:true}).then(()=>{
            console.log("Данные в таблицу Users добавлены")
        });
    } catch (error) {
        console.log(error)
    }    
}

async function incertClients(){
    try {
        const newArrayClients=[];
        const status = ['В работе','Отказ','Сделка закрыта'];
       const arrayUsers= await Users.findAll({attributes: ['full_name']});
        for(let i=0;i<10000;i++){
           
            newArrayClients.push({
                account_number: generateString('0123456789',20,21),
                last_name:getRandomLastName(),
                first_name:getRandomFirstName(),
                middle_name:getRandomMiddleName(),
                INN: generateString('0123456789',12,10),
                birthday_DATE: getRandomDate(new Date(1950, 0, 1), new Date(2001, 0, 1)),
                responsible_full_name: arrayUsers[Math.floor(Math.random() *arrayUsers.length)].full_name
            });
        };
        await Clients.bulkCreate(newArrayClients,{ignoreDuplicates:true}).then(()=>{
            console.log("Данные в таблицу Clients добавлены")
        });

    } catch (error) {
        console.log(error)
    }
}

async function incertUsersAndClients(){
    try {
        const users = await Users.findAll({limit:1});
        if (!users.length)
            await incertUsers();
        const clients = await Clients.findAll({limit:1});
        if(!clients.length)
            await incertClients();
    } catch (error) {
        console.log(error)
    }
}



module.exports = { incertUsersAndClients}