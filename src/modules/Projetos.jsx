import React, { useState } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '../images/projectImages';
import { motion, useInView, useAnimation } from 'framer-motion';
import projectsDataOriginal from '../json/projects.json';
import styles from './css/projetos.module.css';

const SimpleSlider = ({ vhNow, lenguage }) => {
  //Traduzido
  const [projectsData, setProjectsData] = React.useState(
    projectsDataOriginal['pt'],
  );

  React.useEffect(() => {
    if (lenguage) {
      setProjectsData(projectsDataOriginal['en']);
    } else {
      setProjectsData(projectsDataOriginal['pt']);
    }
  }, [lenguage]);

  const [searchValue, setSearchValue] = useState('');
  const [selectedTech, setSelectedTech] = useState('');
  const uniqueTechs = Array.from(
    new Set(projectsData.flatMap((project) => project.tecs)),
  );
  const filteredProjects = projectsData.filter((project) => {
    const nameMatch = project.name
      .toLowerCase()
      .includes(searchValue.toLowerCase());
    const techMatch = selectedTech ? project.tecs.includes(selectedTech) : true;
    return nameMatch && techMatch;
  });

  const handleSearchInputChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedTech(e.target.value);
  };

  // arrows
  function SampleNextArrow(props) {
    const { onClick } = props;
    return <div className={styles.buttonUp} onClick={onClick} />;
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return <div className={styles.buttonDown} onClick={onClick} />;
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    appendDots: (dots) => (
      <div
        style={{
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <ul style={{ margin: '-10px' }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: '30px',
          color: '#abccbd',
        }}
      >
        {i + 1}
      </div>
    ),
  };

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  React.useEffect(() => {
    mainControls.start('visible');
  }, [isInView, mainControls, vhNow, filteredProjects]);

  // Tradução

  return (
    <section className={styles.projectsSection} ref={ref}>
      <motion.div className={styles.search}>
        <motion.input
          type="text"
          placeholder={lenguage ? 'Search...' : 'Pesquisar por nome...'}
          value={searchValue}
          onChange={handleSearchInputChange}
          variants={{
            hidden: { opacity: 0, scale: 0.4, x: -600 },
            visible: { opacity: 1, scale: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 1 }}
        />
        <motion.select
          value={selectedTech}
          onChange={handleSelectChange}
          variants={{
            hidden: { opacity: 0, scale: 0.4, x: 600 },
            visible: { opacity: 1, scale: 1, x: 0 },
          }}
          initial="hidden"
          animate={mainControls}
          transition={{ duration: 1 }}
        >
          <option value="">{lenguage ? 'Tech' : 'Tecnologia'}</option>
          {uniqueTechs.map((tech) => (
            <option key={tech} value={tech}>
              {tech}
            </option>
          ))}
        </motion.select>
      </motion.div>
      <Slider {...settings} className={styles.projectsSlide}>
        {filteredProjects.map((project) => (
          <motion.div
            key={project.id}
            className={`${styles.project}`}
            variants={{
              hidden: { opacity: 0, scale: 0.4 },
              visible: { opacity: 1, scale: 1 },
            }}
            initial="hidden"
            animate={mainControls}
            transition={{ duration: 0.5 }}
          >
            <div className={styles.projectContent}>
              <div className={styles.projectTop}>
                <h3>{project.name}</h3>
                <span>{project.desc}</span>
              </div>
              <div className={styles.projectImage}>
                <img src={images[project.image]} alt="" />
              </div>
              <div className={styles.projectTechs}>
                {project.tecs.map((tech) => (
                  <span key={tech} className={styles.tecCard}>
                    {tech}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className={styles.linkProject}
                target="_blank"
                rel="noreferrer"
              >
                {lenguage ? 'View repository' : 'Ver repositório'}
              </a>
            </div>
          </motion.div>
        ))}
      </Slider>
    </section>
  );
};

export default SimpleSlider;
