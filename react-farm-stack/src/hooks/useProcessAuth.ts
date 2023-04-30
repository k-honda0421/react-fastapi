import { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { useQueryClient } from 'react-query'
import { useMutateAuth } from './useMutateAuth'

export const useProcessAuth = () => {
  const history = useHistory()
  const querClinent = useQueryClient()
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')
  const [isLogin, setIslogin] = useState(true)
  const { loginMutation, registerMutation, logoutMutation } = useMutateAuth()

  const processAuth = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      loginMutation.mutate({
        email: email,
        password: pw,
      })
    } else {
      await registerMutation
        .mutateAsync({
          email: email,
          password: pw,
        })
        .then(() =>
          loginMutation.mutate({
            email: email,
            password: pw,
          })
        )
        .catch(() => {
          setPw('')
          setEmail('')
        })
    }
  }
  const logout = async () => {
    await logoutMutation.mutateAsync()
    querClinent.removeQueries('tasks')
    querClinent.removeQueries('user')
    querClinent.removeQueries('single')
    history.push('/')
  }
  return {
    email,
    setEmail,
    pw,
    setPw,
    isLogin,
    setIslogin,
    processAuth,
    registerMutation,
    loginMutation,
    logout,
  }
}
