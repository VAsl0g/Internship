import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';
import ClientRow from './ClientRow';
import Button from 'react-bootstrap/Button';


const Clients = ({user,clearUser}) => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/clients/'+user.full_name)
    .then(response => {
      setClients(response.data);
    })
    .catch(error => {
        alert('Ошибка при обновить статуса');
    });
    
  }, [])

  return (
    <div>
      <h4>Вы вошли под именем: {user.full_name}{'  '} <Button variant="danger" onClick={()=>clearUser()} >Выйти</Button></h4>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Номер счёта</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>День Рождения</th>
            <th>ИНН</th>
            <th>Фио ответсвенного</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
            {clients? clients.map((client)=>{
              return <ClientRow client={client}/>
            }):
          ""}
        </tbody>
      </Table>
    </div>
  )
}

export default Clients