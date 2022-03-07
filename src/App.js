import './App.css';
import Login from '../src/components/login/index.js';
import { Route, Routes } from 'react-router-dom';


export function App() {
  return (
    <div className="App">
      <header>aqui va mi header que no va a cambiar entre rutas</header>
      <Routes>
        <Route path= "/" element= {<Login/>}/>
        <Route path= "/main" element= {"aqui va mi segunda vista"}/>
      </Routes>
  
    </div>
  );
}

export default App;
