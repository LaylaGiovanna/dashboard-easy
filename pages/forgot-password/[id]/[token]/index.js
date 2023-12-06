import { useState, useEffect, Suspense } from 'react';
import { useRouter } from 'next/router';
import React from 'react';

import CardForm from '../../../../components/Card';
import Input from "../../../../components/CustomInput";
import Model from "../../../../components/Model";
import second from "../../../../components/images/teste.svg"
import Loading from '../../../../components/Loading';
import { sendData } from '../../../../utils/api'

const ErrorMessage = React.lazy(() => import('../../../../components/Message'));

export default function ForgotPassword() {
  const [password, setPassword] = useState("");
  const [sucess, setSucess] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [info, setInfo] = useState("");

  const router = useRouter();
  const { id, token } = router.query;
  const userId = router.query.id ? +router.query.id : undefined;

  const handlePassword = (password) => {
    setPassword(password);
  };

  const handleConfirmPassword = (confirmPassword) => {
    setConfirmPassword(confirmPassword);
  };

  const validatePassword = (password, confirmPassword) => {
    if (password !== confirmPassword) {
      setErrorMessage("As senhas não coincidem!");
      return false;
    } else if (!password || !confirmPassword) {
      setErrorMessage("Preencha os campos necessários!");
      return false;
    } else if (password === confirmPassword) {
      setSucess(true)
      setErrorMessage("");
      return true;
    }
  };

  const handleSubmit = async () => {
    const isValid = validatePassword(password, confirmPassword);
    if (isValid) {
      const data = await sendData(`forgot-password/${userId}/${token}`, "POST", { password: confirmPassword });
      console.log(data)
      if (data.statusCode === 201) {
        setInfo("Senha alterada com sucesso!");
      } else {
        setErrorMessage("Houve um erro ao enviar para o servidor! Por favor, volte mais tarde :(")
      }
    } else {
      setErrorMessage("As senhas não coincidem!");
    }
  };

  useEffect(() => {
    console.log('ID do cliente:', userId);
    console.log('Token:', token);
  }, [userId, token]);

  return (
    <Model image={{
      url: second, alt: "teste",
    }}>
      <CardForm
        title="Redefinir Senha"
        subtitle="Guarde sua nova senha!"
        buttonText="Enviar"
        onClick={handleSubmit}
      >
        <Input
          text="Nova Senha"
          type="password"
          data={password}
          onChange={handlePassword}
        />
        <Input
          text="Confirmar Senha"
          type="password"
          data={confirmPassword}
          onChange={handleConfirmPassword}
        />
        <Suspense fallback={<Loading />}>
          {errorMessage && (
            <ErrorMessage message={errorMessage} type="error" />
          )}
          {info && (
            <ErrorMessage message={info} type="success" />
          )}
        </Suspense>
      </CardForm>
    </Model>
  );
}