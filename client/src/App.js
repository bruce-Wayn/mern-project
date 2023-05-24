
import './App.css';
import Speed from './components/Comp1';
import { useState, useEffect } from 'react';
import Dummy from './components/Dummy';
import axios from 'axios';
import DummyForm from './components/Form';

function App() {

  const [isOnline, setIsOnline] = useState(true);

  const [users, setUsers] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
    .then(response => {
      console.log(response);
      setUsers(response.data)
    }).catch(error => {
      setError(error.message)
    })
  }, []);


  return (
    <div className="App">
      {/* 
      {users && <pre>{JSON.stringify(users, null,2)}</pre>}
      {error && <h4>error is : {error}</h4>}

            
      {isOnline ? <Speed /> : <Dummy />}
      
      <button onClick={() => {setIsOnline(!isOnline)}}>isOnline is : {isOnline.toString()}</button>
      */}
      <DummyForm />



    </div>
  );
}

export default App;
