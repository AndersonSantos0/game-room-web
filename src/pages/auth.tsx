import Head from 'next/head'
import { useState } from 'react'
import { FaFacebook } from 'react-icons/fa'
import CheckBox from '../components/CheckBox'
import Input from '../components/Input'
import {
  AuthIcons,
  AuthScreenContainer,
  AuthSeparator,
  GoToSignUp,
  GoToSignIn
} from '../styles/pages/auth'
import { ImGoogle3 } from 'react-icons/im'
import { IoIosArrowRoundDown, IoIosArrowRoundUp } from 'react-icons/io'
import AuthService from '../services/auth'

const AuthScreen = () => {
  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')
  const [stayConnected, setStayConnected] = useState(false)
  const [acceptTerms, setAcceptTerms] = useState(false)

  const [signUpName, setSignUpName] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpBirth, setSignUpBirth] = useState(new Date())
  const [signUpPassword, setSignUpPassword] = useState('')

  const loginWithGoogle = () => {
    AuthService.loginWithGoogle().then(user => console.log(user.user))
  }

  const loginWithFacebook = () => {
    AuthService.loginWithFacebook().then(user => console.log(user.user))
  }

  return (
    <AuthScreenContainer>
      <Head>
        <title>Acesso</title>
      </Head>
      <section>
        <div id="SignIn">
          <form>
            <h1>Entrar</h1>
            <Input
              value={signInEmail}
              onChange={e => setSignInEmail(e)}
              placeholder="Email"
            />
            <Input
              value={signInPassword}
              onChange={e => setSignInPassword(e)}
              type="password"
              placeholder="Senha"
            />
            <CheckBox
              checked={stayConnected}
              onChange={e => setStayConnected(e)}
              label="Permanecer conectado"
            />
            <Input value={'Entrar'} type="button" />
            <p style={{ marginTop: '-0.5rem' }}>Esqueci minha senha</p>
          </form>
          <h2>ou</h2>
          <AuthIcons>
            <div onClick={loginWithFacebook} className="icon">
              <FaFacebook size={'2.5rem'} />
            </div>
            <div onClick={loginWithGoogle} className="icon">
              <ImGoogle3 size={'2.5rem'} />
            </div>
          </AuthIcons>
          <GoToSignUp href="#SignUp">
            <p>Cadastrar-se</p>
            <IoIosArrowRoundDown size={'2rem'} />
          </GoToSignUp>
        </div>
        <AuthSeparator />
        <div id="SignUp">
          <GoToSignIn href="#SignIn">
            <IoIosArrowRoundUp size={'2rem'} />
            <p>Já possúo uma conta</p>
          </GoToSignIn>
          <form>
            <h1>Cadastrar-se</h1>
            <Input
              value={signUpName}
              onChange={e => setSignUpName(e)}
              placeholder="Nome"
            />
            <Input
              value={signUpEmail}
              onChange={e => setSignUpEmail(e)}
              placeholder="Email"
            />
            <Input
              value={signUpBirth}
              onChange={e => setSignUpBirth(e)}
              placeholder="Data de nascimento"
              type="date"
            />
            <Input
              value={signUpPassword}
              onChange={e => setSignUpPassword(e)}
              type="password"
              placeholder="Senha"
            />
            <CheckBox
              checked={acceptTerms}
              onChange={e => setAcceptTerms(e)}
              label="Concordo com os termos de uso"
            />
            <Input value={'Cadastrar'} type="button" />
          </form>
        </div>
      </section>
    </AuthScreenContainer>
  )
}

export default AuthScreen
