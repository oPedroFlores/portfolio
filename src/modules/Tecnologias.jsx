import React from 'react';
import tecnologiesData from '../json/technologies.json';
import anime from 'animejs';
import { motion, useInView, useAnimation } from 'framer-motion';
import tecImage from '../images/tecimage.png';
import TecCard from './TecCard';

const Tecnologias = ({ vhNow, lenguage }) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  React.useEffect(() => {
    if (vhNow === 1) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls, vhNow]);

  React.useEffect(() => {
    // Parallax
    let tl = anime.timeline({
      loop: true,
      direction: 'alternate',
      delay: 300,
      endDelay: 300,
      easing: 'easeInOutExpo',
      duration: 2400,
    });

    tl.add(
      {
        targets: '.parallax-text.front',
        translateY: '-120px',
      },
      0,
    )
      .add(
        {
          targets: '.parallax-text.back',
          translateY: '45px',
        },
        0,
      )
      .add(
        {
          targets: '.tecImage',
          translateY: '-35px',
          boxShadow: '0 10px 20px rgba(0,0,0, 0.82)',
        },
        0,
      );
  }, []);

  //Carousel
  const [width, setWidth] = React.useState(0);
  const carousel = React.useRef();
  React.useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  const [translation, setTranslation] = React.useState([]);

  const [isLoaded, setIsLoaded] = React.useState(false); // Flag de carregamento

  React.useEffect(() => {
    // Função assíncrona para carregar o arquivo JSON
    const loadTranslations = async () => {
      try {
        const importedTranslations = await import('../json/techs.json');
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

  const [tecnologiesDataTranslated, setTecnologiesDataTranslated] =
    React.useState([]);

  React.useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    if (lenguage) {
      setTecnologiesDataTranslated(tecnologiesData['en']);
    } else {
      setTecnologiesDataTranslated(tecnologiesData['pt']);
    }
  }, [lenguage, tecnologiesDataTranslated]);

  return (
    <section className="technologies" id="tecnologias" ref={ref}>
      <motion.div
        className="techsDivImage"
        variants={{
          hidden: { opacity: 0, scale: 0.4 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.8 }}
      >
        <span className={`parallax-text back`}>{translation['parallax']}</span>
        <span className={`parallax-text front `}>
          {translation['parallax']}
        </span>

        <img src={tecImage} alt="" className={`tecImage `} />
      </motion.div>
      <motion.div
        className={`resumeTechs`}
        variants={{
          hidden: { opacity: 0, scale: 0.4 },
          visible: { opacity: 1, scale: 1 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.5 }}
      >
        {translation['resume']}
      </motion.div>
      <motion.div
        className="carousel"
        ref={carousel}
        whileTap={{ cursor: 'grabbing' }}
      >
        <motion.div
          className="inner-carousel"
          drag="x"
          variants={{
            hidden: { opacity: 1 },
            moving: { x: -width },
          }}
          initial="initial"
          transition={{ duration: 32 }}
          dragConstraints={{ right: 0, left: -width }}
        >
          {tecnologiesDataTranslated
            .sort((a, b) => b.level - a.level)
            .map((tec, index) => (
              <motion.div className="carousel-item" key={tec.id}>
                <TecCard tec={tec} key={tec.id} index={index} vhNow={vhNow} />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Tecnologias;
