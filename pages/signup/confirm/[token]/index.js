import { useRouter } from 'next/router';
import React from 'react';
import { useEffect } from 'react';
import Button from '../../../../components/Button';
import { Icon24Hours } from '@tabler/icons-react';
import Image from 'next/image';
// import Logo from '../../../components/images/logo.svg'
import CardTextConfirm from '../../../../components/TextConfirm';
import { sendData } from '../../../../utils/api'
import Logo from '../../../../components/icons/LogoImage';
import { LogoIcon } from '../../../../components/icons';

export default function ConfirmAccount() {

    const router = useRouter();
    const { token } = router.query;

    const verifyConfirmEmail = async () => {
        try {
            if (!token) {
                console.error("Token not found in the URL");
                return;
            } else {
                await sendData(`auth/signup/confirm/${token}`, "POST", {});
                router.push("/confirmed");
            }
        } catch (error) {
            console.error("Error confirming email:", error);
        }
    }

    return (
        <section className="h-screen w-screen flex flex-col items-center justify-center bg-white gap-10">
            <LogoIcon/>
            <div className="flex flex-col items-center justify-center px-6 gap-20">
                <h1 className='text-center font-bold text-[32px]'>Confirme sua conta</h1>
                <CardTextConfirm />
                <Button text={"Confirmar conta!"} onClick={() => verifyConfirmEmail()} />
            </div>
        </section>
    )

}
