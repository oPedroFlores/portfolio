import React from 'react';
import emailjs from '@emailjs/browser';
import styles from './css/contact.module.css';
import { motion, useInView, useAnimation } from 'framer-motion';
const Contact = ({ lenguage, vhNow }) => {
  const form = React.useRef();
  const [send, setSend] = React.useState(false);
  const [success, setSuccess] = React.useState();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        'service_ndnpdpr',
        'template_jxdxadq',
        form.current,
        'KBuKQrHHeWsicceTu',
      )
      .then(
        (result) => {
          setSend(true);
          setSuccess(true);
          console.log(result.text);
        },
        (error) => {
          setSend(false);
          setSuccess(false);
          console.log(error.text);
        },
      );
  };

  //Animation
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: false });
  const mainControls = useAnimation();
  React.useEffect(() => {
    if (vhNow === 4) {
      mainControls.start('visible');
    }
  }, [isInView, mainControls, vhNow]);

  return (
    <section className={styles.section}>
      <div className={styles.contactSection} ref={ref}>
        {send ? (
          <motion.h4
            variants={{
              hidden: { scale: 0.3 },
              visible: { scale: 1 },
            }}
            initial="hidden"
            animate={mainControls}
          >
            {lenguage
              ? 'Your message has been sent successfully :)'
              : 'Sua mensagem foi enviada com sucesso!'}
          </motion.h4>
        ) : (
          <h4>
            {lenguage
              ? 'Get in touch with me :)'
              : 'Entre em contato comigo :)'}
          </h4>
        )}
        {send ? (
          ''
        ) : (
          <form ref={form} onSubmit={sendEmail}>
            <div className={styles.inputBox}>
              <input type="text" name="user_name" required />
              <span>{lenguage ? 'Your name' : 'Seu nome'}</span>
            </div>
            <div className={styles.inputBox}>
              <input type="text" name="user_email" required />
              <span>{'Email'}</span>
            </div>
            <div className={styles.inputBox}>
              <textarea name="message" required />
              <span>{lenguage ? 'Your message...' : 'Sua mensagem...'} </span>
            </div>

            <button type="submit" className={styles.cta}>
              <span>{lenguage ? 'Send' : 'Enviar'}</span>
              <svg width="13px" height="10px" viewBox="0 0 13 10">
                <path d="M1,5 L11,5"></path>
                <polyline points="8 1 12 5 8 9"></polyline>
              </svg>
            </button>
          </form>
        )}
        {send ? (
          <button className={styles.sendAgain} onClick={() => setSend(false)}>
            {lenguage ? 'Send another message' : 'Enviar outra mensagem'}
          </button>
        ) : (
          ''
        )}
        {success ? <h4>Erro ao enviar o email!</h4> : ''}
      </div>
    </section>
  );
};

export default Contact;
