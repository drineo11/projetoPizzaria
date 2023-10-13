import { FormEvent, useState, useContext } from 'react'

import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'


import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import { AuthContext } from '../../contexts/AuthContext'
import { toast } from 'react-toastify'

import Link from 'next/link'

export default function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  const [loading, setLoading] = useState(false)

  async function handleSignUp(event: FormEvent) {
    event.preventDefault()

    if (name == '' || email == '' || password == '') {
      toast.error('Preencha todos os campos');
      return;
    }

    setLoading(true);

    let data = {
      name,
      email,
      password
    }

    await signUp(data)

    console.log(data);

    setLoading(false);


  }

  return (
    <>
      <Head>
        <title>Faça Seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />



        <div className={styles.login}>
          <h1>Criando a Sua Conta</h1>
          <form onSubmit={handleSignUp}>
            <Input
              placeholder='Digite seu nome'
              type='text'
              value={name}
              onChange={(event) => setName(event.target.value)}
            />

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
            >Cadastrar
            </Button>

            <Link href='/'>
              <a className={styles.text}>Já possui uma conta? Faça Login</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
