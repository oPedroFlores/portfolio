import React from 'react';
import emailjs from '@emailjs/browser';
import styles from './css/contact.module.css';
import { motion, useInView, useAnimation } from 'framer-motion';
const Contact = ({ lenguage, vhNow }) => {
  const form = React.useRef();
  const [send, setSend] = React.useState(false);
  const [sending, setSending] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const [message, setMessage] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [userEmail, setUserEmail] = React.useState('');
  const [userMessage, setUserMessage] = React.useState('');
  const sendEmail = (e) => {
    if (sending) return;
    setSending(true);
    e.preventDefault();
    const serviceID = 'service_ndnpdpr';
    const templateID = 'template_jxdxadq';
    const userID = 'KBuKQrHHeWsicceTu';

    let params = {
      user_name: userName,
      user_email: userEmail,
      message: userMessage,
    };

    emailjs.send(serviceID, templateID, params, userID).then(
      () => {
        setMessage('Mensagem enviada com sucesso!');
        setSuccess(true);
        params = {
          user_name: '',
          user_email: '',
          message: '',
        };
      },
      () => {
        setMessage('Mensagem não enviada');
        setSuccess(false);
      },
    );

    setSending(false);
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
        {success && message ? (
          <motion.h4
            variants={{
              hidden: { scale: 0.3 },
              visible: { scale: 1 },
            }}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className={success && message ? styles.sendMessage : ''}
          >
            {lenguage ? (
              <h4>Your message has been sent successfully</h4>
            ) : (
              <h4>Sua mensagem foi enviada com sucesso!</h4>
            )}
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
              <input
                type="text"
                name="user_name"
                required
                onChange={(e) => setUserName(e.target.value)}
              />
              <span>{lenguage ? 'Your name' : 'Seu nome'}</span>
            </div>
            <div className={styles.inputBox}>
              <input
                type="text"
                name="user_email"
                required
                onChange={(e) => setUserEmail(e.target.value)}
              />
              <span>{'Email'}</span>
            </div>
            <div className={styles.inputBox}>
              <textarea
                name="message"
                required
                onChange={(e) => setUserMessage(e.target.value)}
              />
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
      </div>
    </section>
  );
};

export default Contact;
