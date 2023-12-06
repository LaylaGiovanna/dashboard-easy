import React from "react";
import { useState } from "react";
import Image from "next/image";
import NumberFormat from "react-number-format";

const CardCreditos = (props) => {
    // modal de adicionar credito open and close
    const [isOpen, setIsOpen] = useState(false);

    const openModal = () => {
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsOpen(false);
    };

    // modal de confimação open and close
    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const openModalEdit = () => {
        setIsOpenEdit(true);
    };

    const closeModalEdit = () => {
        setIsOpenEdit(false);
    };

    // estados dos inputs
    const [email, setEmail] = useState('');
    const [emailValido, setEmailValido] = useState(true); // Adicionando estado para verificar a validade do e-mail

    const [value, setValue] = useState('');
    const [valorValido, setValorValido] = useState(true);



    const handleEmailChange = (event) => {
        const inputValue = event.target.value;
        setEmail(inputValue);

        // Validando o e-mail
        const emailCorreto = /\S+@\S+\.\S+/;
        const emailValido = emailCorreto.test(inputValue);
        setEmailValido(emailValido);
    };


    const handleCreditosChange = (event) => {
        // var valorFormatado = valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

        const inputValue = event.target.value;

        //valida se esta sendo digitado numeros ou não

        if (/^\d*$/.test(inputValue)) { // Alteramos a expressão regular para permitir uma string vazia ou números
            setValue(inputValue);
        } else {
            event.preventDefault();
        }
    };



    // function validateEmail(email) {
    //     var emailCorreto = /\S+@\S+\.\S+/;
    //     return emailCorreto.test(email);
    // }

    // console.log(validateEmail('texto@texto.com')); // true
    // console.log(validateEmail('texto@texto')); // false
    // console.log(validateEmail('texto.com')); // false
    // console.log(validateEmail('texto')); // false
    // console.log(validateEmail('texto@gmail.com')); // true


    // POST DE CRÉDITO
    // function PostCredito(event) {
    //     event.preventDefault();
    //     console.log('test');
    //     const data = {
    //         email,
    //         creditos,
    //     };

    //     console.log(data)
    // }


    // async function PostCredito(event) {
    //     // console.log(credito);
    //     event.preventDefault();
    //     // const messageError = 'Falha ao enviar crédito';
    //     const url = 'http://10.107.144.19:3000/users/balance/DEPOSIT'


    //     const options = {
    //         method: 'POST',
    //         Headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(credito)
    //     };

    //     try {
    //         const response = await fetch(url, options);
    //         if (response.status) {
    //             console.log('Dados enviados!', credito);
    //         } else {
    //             console.log('Erro ao enviar os dados')
    //         }

    //     } catch (error) {
    //         console.error('Ocorreu um erro na requisição', error);
    //     }
    //     // console.log(options)
    // }
    async function PostCredito(event) {
        try {
            event.preventDefault();
            const url = 'http://10.107.144.2:3000/users/balance/DEPOSIT';

            const credito = {
                "email": email,
                "value": value,
            };

            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(credito)
            });

            if (response.ok) {
                console.log('Solicitação POST bem-sucedida!', credito);
                setIsOpen(false);
                setIsOpenEdit(false);

                // Você pode adicionar código aqui para lidar com a resposta do servidor, se necessário
            } else {
                console.error('Erro na solicitação POST:', response.status, response.statusText);
            }
        } catch (error) {
            console.error('Ocorreu um erro na requisição', error);
        }
    }


    function CancelCredit() {
        setIsOpenEdit(false);
        setIsOpen(false);

    }


    return (
        <>                  
        {/* sm:text-sm md:text-3xl lg:text-4xl xl:text-5xl */}
            <div className="flex flex-col xl:w-4/6 lg:w-5/6 md:w-[388px] sm:w-[388px] h-[280px] rounded-3xl  border-gray shadow-shadow-button bg-white">
                {/* Div interna do card 1 */}
                <div className="flex flex-col p-6 gap-12 text-text">
                    {/* Div dos textos */}
                    <div className="gap-4">
                        <span className="text-3xl">{props.title}</span>

                        <div className="flex justify-between">
                            <div className="pl-0 justify-start">
                                <span className="text-text-light">{props.subtitle}</span>
                            </div>
                        </div>
                    </div>

                    <div onClick={openModal} className="flex gap-4 justify-center space-x-4">
                        <div className="flex px-10 items-center justify-between shadow-shadow-button font-semibold rounded-3xl w-button-card-1 h-24">
                            <Image className="h-fit" src={props.src} alt={props.alt} height={props.height} width={props.width} />
                            <span className="h-fit">{props.titleButton}</span>
                        </div>

                    </div>

                    {/* Modal de adicionar credito */}
                    {isOpen && (
                        <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
                            <div className="grid modal-container rounded-lg p-4 w-[680px] h-fit bg-white">
                                <div className=" modal-content  p-4 rounded-xl">
                                    <h2 className="text-xl font-bold my-4">Adicionar créditos para usuários</h2>
                                    <form className="fle flex-col justify-between">
                                        <div className="mb-2">
                                            <label className="" htmlFor="campo">Email do usuário</label>
                                            <div className="pt-1">
                                                <input
                                                    type="text"
                                                    placeholder="Email"
                                                    id="email"
                                                    onChange={handleEmailChange}
                                                    className={`border rounded-lg border-gray p-2 mb-1 w-full ${!emailValido ? 'border-red-500' : '' // Adicionando uma classe de borda vermelha se o e-mail for inválido
                                                        }`}
                                                />
                                            </div>
                                            {!emailValido && <p className="text-red text-sm">Por favor, insira um e-mail válido.</p>} {/* Exibindo a mensagem de erro */}
                                        </div>

                                        <div className="mb-2">
                                            <label htmlFor="campo">Quanto deseja enviar?</label>
                                            <div className="pt-1">
                                                <input
                                                    type="text"
                                                    placeholder="R$"
                                                    id="dinheiro"
                                                    onChange={handleCreditosChange}
                                                    value={value}
                                                    // keyboardType="numeric"
                                                    // maxLength={6}
                                                    className={`border rounded-lg border-gray p-2 mb-1 w-full ${!valorValido ? 'border-red-500' : ''
                                                        }`}
                                                />
                                            </div>
                                            {!valorValido && <p className="text-red text-sm">Por favor, insira apenas números.</p>}
                                        </div>

                                    </form>
                                    <div className="flex w-full justify-end h-16 gap-4">
                                        <div className=" flex justify-end h-16 gap-4 ">
                                            <button
                                                onClick={closeModal}
                                                className="border text-text h-11 py-2 px-4 rounded ">
                                                Cancelar
                                            </button>
                                        </div>
                                        <div className="flex justify-end h-16 gap-4 ">
                                            <button
                                                onClick={openModalEdit}
                                                className="bg-primary border-text border h-11 text-white py-2 px-4 rounded">
                                                Confirmar
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Modal de edição */}
                    {isOpenEdit && (
                        <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
                            <div className="grid modal-container rounded-lg p-4 min-w-[465px] h-fit text-text bg-white">
                                <div className="flex flex-col modal-content g p-4 rounded-xl">
                                    <span className="text-lg font-semibold my-4 ">Tem certeza que deeseja enviar?</span>
                                    <form className="fle flex-col justify-between" >
                                        <div className="mt-1 mb-6">
                                            <span className="font-extralight text-gray" htmlFor="campo">Você está enviando os créditos para:</span>
                                        </div>

                                        <div className='mb-5'>
                                            {/* div do email */}
                                            <div className="flex text-gray gap-2 min-w-4/5">
                                                <div>
                                                    <span>Email:</span>
                                                </div>
                                                <div>
                                                    <span>
                                                        {email}
                                                    </span>
                                                </div>
                                            </div>
                                            {/* div do crédito */}
                                            <div className="flex text-gray gap-2 min-w-4/5">
                                                <div>
                                                    <span> Créditos:</span>
                                                </div>
                                                <div>
                                                    R$ <span>{value}</span>
                                                </div>
                                            </div>

                                        </div>

                                        <div className="flex justify-center h-16 gap-4 ">
                                            <button
                                                onClick={closeModalEdit}
                                                className="border text-text h-11 py-2 px-14 rounded ">
                                                Cancelar
                                            </button>
                                            <button
                                                onClick={PostCredito}
                                                // type="submit"
                                                className="bg-primary border-text border h-11 text-white py-2 px-14 rounded">
                                                Confirmar
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    )}


                </div>
            </div>
        </>
    );
};

export default CardCreditos;



