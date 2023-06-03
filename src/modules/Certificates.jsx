import React, { useState } from 'react';
import styles from './css/certificates.module.css';
import { motion, useInView, useAnimation } from 'framer-motion';

const Certificates = ({ lenguage, vhNow }) => {
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [certificatesData, setCertificatesData] = React.useState([]);

  const handleCertificateHover = (index) => {
    setSelectedCertificate(index);
  };

  const handleCertificateLeave = () => {
    setSelectedCertificate(null);
  };

  //Animation
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  React.useEffect(() => {
    if (vhNow === 3) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls, vhNow]);

  const [isLoaded, setIsLoaded] = useState(false); // Flag de carregamento
  React.useEffect(() => {
    // Função assíncrona para carregar o arquivo JSON
    const loadTranslations = async () => {
      try {
        // Simulação de uma requisição assíncrona para importar o arquivo JSON
        const importedTranslations = await import('../json/certificates.json');
        const translatedData = lenguage
          ? importedTranslations['en']
          : importedTranslations['pt'];
        setCertificatesData(translatedData);
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
    <section className={styles.section}>
      <div className={styles.certificates} ref={ref}>
        {certificatesData.map((certificate, index) => {
          const isSelected = selectedCertificate === index;
          const certificateClasses = `${styles.certificate} ${
            isSelected ? styles.selected : ''
          }`;

          return (
            <motion.div
              key={index}
              className={certificateClasses}
              onMouseEnter={() => handleCertificateHover(index)}
              onMouseLeave={handleCertificateLeave}
              variants={{
                hidden: { scale: 0.3 },
                visible: { scale: 1 },
              }}
              initial="hidden"
              animate={mainControls}
              transition={{ duration: 0.3 + index * 0.09, type: 'spring' }}
            >
              <h4>{certificate.name}</h4>
              <span className={styles.certificateDesc}>{certificate.desc}</span>
              <span className={styles.certificateTime}>{certificate.time}</span>
              <a
                href={certificate.link}
                rel="noreferrer"
                target="_blank"
                className={styles.certificateLink}
              >
                {lenguage ? 'View Certificate' : 'Ver Certificado'}
              </a>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;
