import React from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useInView, useAnimation, useIsPresent } from 'framer-motion';
import { ReactComponent as HTMLsvg } from '../images/tecIcons/html.svg';
import { ReactComponent as CSSsvg } from '../images/tecIcons/css.svg';
import { ReactComponent as JSsvg } from '../images/tecIcons/js.svg';
import { ReactComponent as JSXsvg } from '../images/tecIcons/jsx.svg';
import { ReactComponent as WORDPRESSsvg } from '../images/tecIcons/wordpress.svg';
import { ReactComponent as MYSQLsvg } from '../images/tecIcons/mysql.svg';
import { ReactComponent as EXPRESSsvg } from '../images/tecIcons/express.svg';
import { ReactComponent as BOOTSTRAPsvg } from '../images/tecIcons/bootstrap.svg';
import { ReactComponent as PHPsvg } from '../images/tecIcons/php.svg';
import { ReactComponent as NODEsvg } from '../images/tecIcons/node.svg';

const TecCard = ({ tec, index, vhNow }) => {
  let SvgComponent;
  switch (tec.icon) {
    case 'html':
      SvgComponent = HTMLsvg;
      break;
    case 'css':
      SvgComponent = CSSsvg;
      break;
    case 'js':
      SvgComponent = JSsvg;
      break;
    case 'jsx':
      SvgComponent = JSXsvg;
      break;
    case 'node':
      SvgComponent = NODEsvg;
      break;
    case 'express':
      SvgComponent = EXPRESSsvg;
      break;
    case 'mysql':
      SvgComponent = MYSQLsvg;
      break;

    case 'bootstrap':
      SvgComponent = BOOTSTRAPsvg;
      break;
    case 'wordpress':
      SvgComponent = WORDPRESSsvg;
      break;
    case 'php':
      SvgComponent = PHPsvg;
      break;
    default:
      SvgComponent = null;
      break;
  }

  const progressBarAnimation = keyframes`
    0% {
      width: 0;
    }
    100% {
      width: ${tec.level * 20}%;
    }
  `;

  const ProgressBar = styled.div`
    width: 80%;
    height: 24px;
    top: 90px;
    left: 175px;
    position: absolute;
    border-radius: 24px;
    border: 2px solid white;
    transform: translate(-50%, -50%);
    overflow: hidden;

    &::after {
      content: '';
      position: absolute;
      background: white;
      width: 0;
      height: 100%;
      border-radius: 20px;
      animation: ${progressBarAnimation} 1.7s linear forwards;
    }

    @media (max-width: 750px) {
      width: 70%;
      left: 50%;
      top: 35%;
    }
  `;

  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  React.useEffect(() => {
    if (vhNow === 1) {
      mainControls.start('visible').then(() => {
        mainControls.start('visibleCarousel');
      });
    }
  }, [isInView, mainControls, vhNow]);

  return (
    <motion.div
      className="tecCard"
      variants={{
        hidden: { opacity: 0, x: -300 * index },
        visible: { opacity: 1, x: 0 },
        visibleCarousel: { opacity: 1 },
      }}
      initial="hidden"
      animate={mainControls}
      transition={{ duration: 0.8 + index * 0.1 }}
    >
      <div className="tecInfo">
        {tec.tec.toUpperCase()}
        {SvgComponent && <SvgComponent className="tecIcon" />}
      </div>
      <ProgressBar />
      <span className="tecLevelDesc">{tec.levelDesc}</span>
      <p className="tecInfoDesc">{tec.desc}</p>
    </motion.div>
  );
};

export default TecCard;
