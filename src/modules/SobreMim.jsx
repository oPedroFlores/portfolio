import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ReactComponent as GitHub } from '../svg/github.svg';
import { ReactComponent as Linkedin } from '../svg/linkedin.svg';
import { ReactComponent as Curriculo } from '../svg/cv3.svg';
import portugueseCV from '../portuguesecv.pdf';
import englishCV from '../englishcv.pdf';

const SobreMim = ({ lenguage }) => {
  const cvFile = lenguage ? englishCV : portugueseCV;
  const textAprRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false); // Flag de carregamento

  useEffect(() => {
    const typeWritter = (element) => {
      const array = element.innerHTML.split('');
      element.innerHTML = '';
      array.forEach((letra, i) => {
        setTimeout(function () {
          element.innerHTML += letra;
        }, 45 * i);
      });
    };

    if (textAprRef.current) {
      typeWritter(textAprRef.current);
    }
  }, [isLoaded]);

  const [translation, setTranslation] = React.useState([]);
  React.useEffect(() => {
    // Função assíncrona para carregar o arquivo JSON
    const loadTranslations = async () => {
      try {
        // Simulação de uma requisição assíncrona para importar o arquivo JSON
        const importedTranslations = await import('../json/aboutme.json');
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

  if (!isLoaded) {
    return <div>Loading...</div>; // Exibe um indicador de carregamento enquanto as traduções estão sendo carregadas
  }

  return (
    <section className="sobreMim" id="sobre-mim">
      <div>
        <motion.h3
          className="nameApresentation hoverText"
          variants={{
            hidden: { opacity: 0, x: -125 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          Pedro Flores <span class="waveHand">👋</span>
        </motion.h3>
        <motion.div className="containerApresentation">
          <motion.p
            className="textApresentation"
            ref={textAprRef}
            variants={{
              hidden: { opacity: 0, x: -125 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            {translation['resume']}
          </motion.p>
        </motion.div>
      </div>
      <motion.div className="contactApresentation">
        <motion.div
          className="infoSvgPhoto"
          variants={{
            hidden: { opacity: 0, x: 225 },
            visible: { opacity: 1, x: 0 },
          }}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a href="https://github.com/oPedroFlores/" target="_blank">
            <GitHub className="svgPhoto" />
          </a>
          <a href="https://www.linkedin.com/in/pedrolpflores/" target="_blank">
            <Linkedin className="svgPhoto" />
          </a>
          <a href={cvFile} download="pedroflores.pdf">
            <Curriculo className="svgPhoto" />
          </a>
        </motion.div>
        <div className="svgContact">
          <motion.img
            variants={{
              hidden: { opacity: 0, x: 125 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
            className="photoApresentation"
            src="https://avatars.githubusercontent.com/u/100242638?v=4"
            alt=""
          />
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 125 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
            className="photoBorder"
          ></motion.div>
          <motion.div
            variants={{
              hidden: { opacity: 0, x: 125 },
              visible: { opacity: 1, x: 0 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.25 }}
            className="photoBorderGradient"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default SobreMim;
