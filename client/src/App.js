import { useEffect,useState } from 'react';
import Clients from './components/Clients';
import AuthForm from './components/AuthForm';
import Container from 'react-bootstrap/Container';

const App = ()=>{
  const [user,setUser] = useState({});

  function clearUser(){
    localStorage.clear();
    setUser({})
  }

  useEffect(() => {
    const localUser=localStorage.getItem('User');
    console.log(localUser);
    if (localUser) setUser(JSON.parse(localUser));
  }, [])
  

  return (
    <Container>
      {Object.keys(user).length? <Clients user={user} clearUser={clearUser}/>:<AuthForm setUser={setUser}/>}
    </Container>
  );
}

export default App;
