import React, { useState } from "react";
import CardForm from "../components/Card.jsx";
import mypic from "../components/images/group-image.svg";
import Input from "../components/CustomInput";
import Model from "../components/Model";
import { sendData, getData } from "../utils/api";
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';


export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const [PermitionLogin, setPermitionLogin] = useState("");

  const router = useRouter()

  const handleEmailChange = (email) => {
    setEmail(email);
    setErro("");
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    setErro("");
  };

  const handleLogin = async () => {

    try {
      const data = await sendData("auth/signin", "POST", { email, password });

      if (data.statusCode !== 201) {
        setErro("Email ou senha inválido!");
      } else {
        setCookie("auth", data.message)
        localStorage.setItem('token', data.message);
        const local = localStorage.getItem('token');

        try {
          const login = await getData("auth/me", local);

          if (login.userType === "COLABORATOR" || login.userType === "ADMIN") {
            router.push("/dashboard")
          } else {
            setPermitionLogin("Você não está permitido entrar aqui!")
          }
        }
        catch (erro) {
          setErro("Ocorreu um erro durante o login.");
        }
      };
    } catch (error) {
      setErro("Ocorreu um erro durante o login.");
    };
  };

  return (
    <Model image={{url: mypic, alt: "teste"}}
    >
      <CardForm
        title="Login"
        subtitle="Bem-vindo de volta!"
        onClick={handleLogin}
        buttonText="Login"
      >
        <Input
          data={email}
          onChange={handleEmailChange}
          onFocus={() => setErro("")}
          text="Email"
          type="email"
        />
        <Input
          data={password}
          onChange={handlePasswordChange}
          onFocus={() => setErro("")}
          text="Senha"
          type="password"
          forgotPassoword
        />
        {erro && (
          <p className="font-black text-red">{erro}</p>
        )}
        {PermitionLogin && (
          <p className="font-black text-red">{PermitionLogin}</p>
        )}
      </CardForm>
    </Model>
  );
};
