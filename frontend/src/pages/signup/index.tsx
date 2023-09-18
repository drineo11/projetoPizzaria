import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../styles/home.module.scss'

import logoImg from '../../../public/logo.svg'

import { Input } from '../../components/ui/Input'
import { Button } from '../../components/ui/Button'

import Link from 'next/link'

export default function SignUp() {
  return (
    <>
      <Head>
        <title>Faça Seu Cadastro</title>
      </Head>
      <div className={styles.containerCenter}>
        <Image src={logoImg} alt="Logo" />

        <div className={styles.login}>
            <h1>Criando a Sua Conta</h1>
          <form>
          <Input
              placeholder='Digite seu nome'
              type='text'
            />

            <Input
              placeholder='E-mail'
              type='text'
            />

            <Input
              placeholder='Senha'
              type='password'
            />

            <Button
              type='submit'
              loading={false}
            >Cadastrar
            </Button>

            <Link legacyBehavior href='/'>
              <a className={styles.text}>Já possui uma conta? Faça Login</a>
            </Link>
          </form>
        </div>
      </div>
    </>
  )
}
