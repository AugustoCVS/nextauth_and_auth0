/* eslint-disable @next/next/no-html-link-for-pages */
// pages/index.js
'use client';
import { useUser } from '@auth0/nextjs-auth0/client';
import Image from "next/image";
import adianteLogo from "../../public/adiante.svg";
import registerDivider from "../../public/register-bg.svg";
import icon1 from "../../public/icon1.svg"
import icon2 from "../../public/icon2.svg"
import arrow1 from "../../public/arrow-blue.svg"
import styles from '../styles/page.module.css';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Index() {
  const { user, error, isLoading } = useUser();
  const router = useRouter()

  async function handleRedirectToPageLogin(){
    router.push('/api/auth/login')
  }

  async function sendData(){
    await fetch('api', {
        method: 'POST',
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
}

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (user) {
    console.log(user)
    return (
      // eslint-disable-next-line react/jsx-no-comment-textnodes
      <div>
          Welcome {user.nickname}! <a href="/api/auth/logout">Logout</a>
      </div>
      
    );
   
  }

  return (
    <main>
          <div className={styles.content}>
            <div className={styles.infosContent}>
              <div className={styles.infos}>
              <Image alt="arrow" loading="lazy" width={172} height={69} decoding="async" 
              data-nimg="1" className={styles['arrow-1']} src={arrow1}/>
                <span>#DinheiroEmUmClique</span>
                <div className={styles['carrousel-infos']}>
                <h2>Seja bem-vindo ao <strong>Adiante</strong>!<br/>
                Antecipe suas notas fiscais de produto com <strong>a fintech mais rápida do Brasil.</strong></h2>
                </div>
                <div className={styles['icons-examples-content']}>
                  <div>
                    <div className={styles.icon}>
                        <Image alt='' src={icon1} width={46} height={46}/>
                    </div>
                    <p className={styles['text-icon']}>Cadastre-se em <br/><strong>poucos segundos</strong></p>
                  </div>
                  <div>
                    <div className={styles.icon}>
                        <Image alt='' src={icon2} width={46} height={46}/>
                    </div>
                    <p className={styles['text-icon']}>Sua análise de <br/>crédito em apenas <br/><strong>15 segundos</strong> </p>
                  </div>
                </div>
              </div>
              <Image alt="arrow" loading="lazy" width={172} height={69} decoding="async" 
                data-nimg="1" className={styles['arrow-2']} src={arrow1}/>
              <Image alt="background" loading="lazy" width={300} height={1080}
              decoding="async" data-nimg="1" className={styles['bg-divider']} src={registerDivider} 
              />
              
            </div>
            <div className={styles['login-cadastro-content']}>
              <div className={styles['login-content']}>
                  <div className={styles['adiante-logo']}>
                    <Image alt='logo do adiante' width={138} height={44.89} src={adianteLogo}/>
                  </div>
                  <h2>Faça login</h2>
                  <span>Não possui cadastro? <Link href="/api/auth/login">Crie uma conta</Link></span>
                  <button className={styles['btn-logar']}  onClick={handleRedirectToPageLogin}>
                    <div>Fazer login</div>
                  </button>
              </div>
            </div>
            
          </div>
      </main>
  );
}