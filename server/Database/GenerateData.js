const User = require("./index")
const fs = require('fs')
    
    let arrayFullName=[]

   function readArrayFullName(){
        if (arrayFullName.length===0){
            arrayFullName = fs.readFileSync(__dirname+"/FIO.txt").toString().split("\n");
        }
        return arrayFullName;
    }

    function getRandomFirstName(){
        const results =  readArrayFullName().map((FIO)=>{
            return FIO.split(' ')[0]
        });
        return results[Math.floor(
            Math.random()*results.length
        )];
    }


    function getRandomLastName(){
        const results =  readArrayFullName().map((FIO)=>{
            return FIO.split(' ')[1]
        });
        return results[Math.floor(
            Math.random()*results.length
        )];
    }


    function getRandomMiddleName(){
        const results =  readArrayFullName().map((FIO)=>{
            return FIO.split(' ')[2].replace('\r','')
        });
        return results[Math.floor(
            Math.random()*results.length
        )];
    }

    function getRandomFullName(){
        return `${getRandomFirstName()} ${getRandomLastName()} ${getRandomMiddleName()}`
    }

    function getRandomDate(start,end){
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    function generateString(characters,min,max){
        let result=''
        let counter = 0;

        while (counter < Math.floor(Math.random()*(max - min) + min)) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
        counter += 1;
        }
        return result;
    }
module.exports = {getRandomFirstName,getRandomLastName,getRandomMiddleName,getRandomFullName, generateString, getRandomDate}