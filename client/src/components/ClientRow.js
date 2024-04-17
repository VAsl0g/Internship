import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from 'axios';

const ClientRow = ({client}) => {
    const [status,setStatus] = useState(client.status);

  const updateStatus = (value, account_number)=>{
    axios.put('http://localhost:5000/api/'+account_number,{
      status:value,
    })
    .then(response => {
      setStatus(response.data.status);
    })
    .catch(error => {
        alert('Error: Ошибка при обновить статус');
    });
} 

    return(
    <tr>
        <td>{client.account_number}</td>
        <td>{client.last_name}</td>
        <td>{client.first_name}</td>
        <td>{client.middle_name}</td>
        <td>{client.birthday_DATE}</td>
        <td>{client.INN}</td>
        <td>{client.responsible_full_name}</td>
        <td>
        <select value={status} onChange={e=>updateStatus(e.target.value, client.account_number)}>
            <option value="Не в работе">Не в работе</option>
            <option value="В работе">В работе</option>
            <option value="Отказ">Отказ</option>
            <option value="Сделка закрыта">Сделка закрыта</option>
        </select>
        </td>
    </tr>)
    
}

export default ClientRow