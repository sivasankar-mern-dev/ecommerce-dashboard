import { useState } from 'react';
import { login } from '../../redux/apiCalls';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

const Login = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const history = useHistory();

  const handleClick = (e) => {
    e.preventDefault();
    login(dispatch, { username, password });
    history.push('/')
  }
  
  return (
    <div style={{ 
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <input style={{ padding: 10, marginBottom: 20 }} type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
      <input style={{ padding: 10, marginBottom: 20 }} type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button style={{ padding: 10, backgroundColor: 'green', color: 'white', width: '10%' }} onClick={handleClick}>Login</button>
    </div>
  )
}

export default Login
