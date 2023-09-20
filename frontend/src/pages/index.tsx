import { FormEvent, useContext, useState } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/home.module.scss'

import logoImg from '../../public/logo.svg'

import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { toast } from 'react-toastify'

import { AuthContext } from '../contexts/AuthContext'

import Link from 'next/link'

import { canSSRGuest } from '../utils/canSSRGuest'


export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent) { 
    event.preventDefault()

    if(email == '' || password == '') {
      toast.warning('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      email,
      password
    }

    await signIn(data)

    setLoading(false);

  }

  return (
    <>
      <Head>
        <title>Pizzaria</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <div className={styles.login}>
          <form onSubmit={handleSubmit}>
            <Input
              placeholder='E-mail'
              type='text'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />

            <Input
              placeholder='Senha'
              type='password'
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />

            <Button
              type='submit'
              loading={loading}
            >Acessar
            </Button>

            <Link legacyBehavior href='/signup'>
            <a className={styles.text}>Não possui uma conta? Cadastre-se</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});