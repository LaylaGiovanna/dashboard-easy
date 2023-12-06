import React, { useState } from 'react';

import CardForm from "../components/Card.jsx";
import Input from "../components/CustomInput";
import Model from "../components/Model";
import third from "../components/images/third.svg";
import { sendData } from "../utils/api"

export default function ResetPassword() {
    const [email, setEmail] = useState("");
    const [info, setInfo] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmitEmail = (email) => {
        setEmail(email);
    }

    const sendEmail = async () => {
        if (!email) {
            setErro("Por favor, preencha o campo de email")
            setInfo("")
            return
        };

        const data = await sendData("forgot-password", "POST", { email });
        
        if (data.statusCode === 201) {
            setInfo(data.message);
        }else{
            setErro(data.message)
        };
    };

    return (
        <Model image={{url: third, alt: "redefinir-senha", height: 600, width: 400}}>
            <CardForm
                title="Redefinir Senha"
                subtitle="Esqueceu sua senha?"
                buttonText="Enviar"
                onClick={sendEmail}>
                <Input
                    data={email}
                    type="email"
                    onChange={handleSubmitEmail}
                    onFocus={() => setErro("")}
                    text="Email"
                    />
                {info && <p className="text-zinc-800 font-semibold text-md">{info}</p>}
                {erro && <p className="font-black text-red text-sm">{erro}</p>}
            </CardForm>
        </Model>
    )
}