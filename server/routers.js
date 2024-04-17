const Router = require("express");
const { Clients, Users } = require("./Database");
const { where } = require("sequelize");
const router = new Router();

router.get('/clients/:full_name', async (req , res)=>{
    try {
        const clients = await Clients.findAll({
            where:{
                responsible_full_name: req.params.full_name.replace(/_/gi, ' ')
            }
        })
        if (!clients) res.json({massage:"Клиенты не найдены"});
        return res.json(clients);
    } catch (error) {
        return res.json(error)
    }
});

router.put('/:account_number', async (req,res)=>{
    try {
        const client = await Clients.findOne({
            where:{
                account_number: req.params.account_number
            }
        });
        client.status=req.body.status;
        await client.save();
        res.json(client);
    } catch (error) {
        res.json(error);
    }
});

router.post('/auth',async (req,res)=>{
    try {
        
        const {login, password} = req.body;
        
        const user = await Users.findOne({
            where:{
                login: login
            }
        });

        if (!user) return res.status(404).json({message:"Пользователь не найден"})

        if (password!==user.password) return res.status(400).json({
            message:"Некорректный пароль"
        })

        return res.json(user);
    } catch (error) {
        res.json(error);
    }
});

module.exports = router;