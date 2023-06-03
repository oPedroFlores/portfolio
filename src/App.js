import { useState } from 'react';
import './App.css';
import NavBar from './modules/NavBar';
import SobreMim from './modules/SobreMim';
import Tecnologias from './modules/Tecnologias';
import Projetos from './modules/Projetos';
import Certificates from './modules/Certificates';
import Contact from './modules/Contact';

function App() {
  const [vhNow, setVhNow] = useState(0);
  const [lenguage, setLenguage] = useState(0);
  return (
    <>
      <NavBar
        vhNow={vhNow}
        setVhNow={setVhNow}
        lenguage={lenguage}
        setLenguage={setLenguage}
      />
      <SobreMim lenguage={lenguage} />
      <Tecnologias vhNow={vhNow} setVhNow={setVhNow} lenguage={lenguage} />
      <Projetos vhNow={vhNow} lenguage={lenguage} />
      <Certificates lenguage={lenguage} vhNow={vhNow} />
      <Contact lenguage={lenguage} vhNow={vhNow} />
    </>
  );
}

export default App;
