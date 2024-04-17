import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


const AuthForm = ({setUser}) => {
    const [login,setLogin]=useState('');
    const [password,setPassword] = useState();
    const [check,setCheck] = useState(false)

   async function authUser (){
    await axios.post('http://localhost:5000/api/auth',{
        login:login,
        password:password
    })
    .then(response => {
        console.log(response)
        setUser(response.data);
        if(check){
            localStorage.setItem("User",JSON.stringify(response.data));
        }
    })
    .catch(error => {
        console.log(error.response.status)
        if(error.response.status===404)
            alert('Нет пользователя с таким логином');
        else if(error.response.status===400)
            alert('Не верный пароль');
        else alert('Ошибка при попытки авторизоватся');
    });
    }
    

  return (
    <Row style={{'margin-top':'15%', }} >
        <Col></Col>
            <Col xs={4}>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control placeholder="Login" onChange={(e)=>{setLogin(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" onChange={(e)=>{setPassword(e.target.value)}}/>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Check me out" checked={check} onChange={(e)=>{setCheck(e.target.checked)}}/>
                    </Form.Group>
                    
                    <Button variant="primary" type="button" onClick={()=>authUser()}> Войти </Button>
                </Form>
            </Col>
        <Col></Col>
    </Row>
  )
}

export default AuthForm