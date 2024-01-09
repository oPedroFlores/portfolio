import React, { useEffect } from 'react';
import { ReactComponent as GitHub } from '../svg/github.svg';
import { ReactComponent as Linkedin } from '../svg/linkedin.svg';
import { ReactComponent as Menu } from '../svg/bars-solid.svg';
import { ReactComponent as Brazil } from '../svg/br.svg';
import { ReactComponent as US } from '../svg/us.svg';
import translations from '../json/navbar.json';

const NavBar = ({ vhNow, setVhNow, lenguage, setLenguage }) => {
  const lastSection = 4;

  const [isLoaded, setIsLoaded] = React.useState(false); // Flag de carregamento

  let lastY = null; // Variável para armazenar a última posição do toque

  const handleTouchMove = (event) => {
    const touch = event.touches[0];
    const currentY = touch.pageY;

    if (lastY !== null) {
      if (currentY > lastY) {
        // Scroll down
        setVhNow(vhNow - 1);
        console.log('Scroll Up');
      } else if (currentY < lastY) {
        // Scroll up
        setVhNow(vhNow + 1);
        console.log('Scroll Down');
      }
    }

    lastY = currentY; // Atualiza a última posição do toque
  };

  useEffect(() => {
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [vhNow, setVhNow]);

  useEffect(() => {
    // Função assíncrona para carregar o arquivo JSON
    const loadTranslations = async () => {
      try {
        // Simulação de uma requisição assíncrona para importar o arquivo JSON
        const importedTranslations = await import('../json/navbar.json');
        const translatedData = lenguage
          ? importedTranslations['en']
          : importedTranslations['pt'];
        setTranslation(translatedData);
        setIsLoaded(true); // Marca o carregamento como concluído
      } catch (error) {
        console.error('Erro ao carregar as traduções:', error);
      }
    };

    loadTranslations();
  }, [lenguage]);

  const vh = window.innerHeight;
  const shouldAddClass = vhNow % 2 === 1;

  const handleScrollDirection = (event) => {
    event.preventDefault();
    const delta = event.deltaY;
    if (delta > 0) {
      // Scroll down
      if (vh === lastSection) {
        return;
      } else {
        setVhNow((prevVhNow) => prevVhNow + 1);
      }
    } else if (delta < 0) {
      // Scroll up
      if (vhNow < 0) setVhNow(0);
      setVhNow((prevVhNow) => Math.max(0, prevVhNow - 1));
    }
  };

  useEffect(() => {
    if (vhNow > lastSection) setVhNow(lastSection);
    if (vhNow < 0) setVhNow(0);
  }, [vhNow, setVhNow]);

  useEffect(() => {
    window.addEventListener('wheel', handleScrollDirection, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleScrollDirection);
    };
  }, []);

  useEffect(() => {
    const scrollToPosition = vhNow * vh;
    window.scrollTo({
      top: scrollToPosition,
      behavior: 'smooth',
    });
  }, [vhNow, vh]);

  //Clique nos links ancoras com movimento suave
  const handleSmoothScroll = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop,
        behavior: 'smooth',
      });
    }
  };
  const [translation, setTranslation] = React.useState([]);
  const handleLenguageInputChange = (event) => {
    setLenguage(event.target.checked);

    if (event.target.checked) {
      setTranslation(translations['en']);
    } else {
      setTranslation(translations['pt']);
    }
  };

  if (!isLoaded) {
    return <div>Loading...</div>; // Exibe um indicador de carregamento enquanto as traduções estão sendo carregadas
  }

  function handleMenu() {
    const menu = document.querySelector('.sectionInfo');
    menu.classList.toggle('showMenu');
    console.log(menu);
  }

  return (
    <nav className={`navbar ${shouldAddClass ? 'blacknavbar' : ''}`}>
      <input type="checkbox" id="menu" className="inputmenu" />
      <label htmlFor="menu" onClick={handleMenu}>
        <Menu className="menu" />
      </label>
      <div className="navContact">
        <a
          href="https://github.com/oPedroFlores/"
          target="_blank"
          rel="noreferrer"
        >
          <GitHub /> Github
        </a>
        <a
          href="https://www.linkedin.com/in/pedrolpflores/"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin /> Linkedin
        </a>
      </div>
      <div className="sectionInfo">
        <a
          className={vhNow === 0 ? 'selectedSection hoverText' : 'hoverText'}
          href="#sobre-mim"
          rel="noreferrer"
          onClick={(event) => {
            handleSmoothScroll(event);
            setVhNow(0);
          }}
        >
          {vhNow === 0
            ? translation['aboutMeSelected']
            : translation['aboutMe']}
        </a>
        <a
          className={vhNow === 1 ? 'selectedSection hoverText' : 'hoverText'}
          href="#tecnologias"
          rel="noreferrer"
          onClick={(event) => {
            handleSmoothScroll(event);
            setVhNow(1);
          }}
        >
          {vhNow === 1 ? translation['techsSelected'] : translation['techs']}
        </a>
        <a
          className={vhNow === 2 ? 'selectedSection hoverText' : 'hoverText'}
          href="#projetos"
          rel="noreferrer"
          onClick={(event) => {
            handleSmoothScroll(event);
            setVhNow(2);
          }}
        >
          {vhNow === 2
            ? translation['projectsSelected']
            : translation['projects']}
        </a>
        <a
          className={vhNow === 3 ? 'selectedSection hoverText' : 'hoverText'}
          href="#cursos"
          rel="noreferrer"
          onClick={(event) => {
            handleSmoothScroll(event);
            setVhNow(3);
          }}
        >
          {vhNow === 3
            ? translation['certificatesSelected']
            : translation['certificates']}
        </a>
        <a
          className={vhNow === 4 ? 'selectedSection hoverText' : 'hoverText'}
          href="#sobreMim"
          rel="noreferrer"
          onClick={(event) => {
            handleSmoothScroll(event);
            setVhNow(4);
          }}
        >
          {vhNow === 4
            ? translation['contactSelected']
            : translation['contact']}
        </a>
        <div className="chooseLenguageDiv">
          <Brazil className="brazilFlag" />
          <div className="lenguageDiv">
            <input
              type="checkbox"
              id="lenguage"
              className="lenguageInput"
              checked={lenguage}
              onChange={handleLenguageInputChange}
            />
            <label htmlFor="lenguage" className="lenguageButton"></label>
          </div>
          <US className="usFlag" />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
