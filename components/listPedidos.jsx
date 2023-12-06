import React from "react";
import Image from "next/image";

const List = (props) => {
    return (
        <>
            <div className="flex gap-4 items-center justify-between" key= {props.key}>
                <div className="flex gap-4">
                    <Image src={props.src} alt="Imagem de perfil" height="50px" width="50px" />
                    <div className="flex flex-col gap-2">
                        <div className="text-base text-text">{props.name}</div>
                        {/* <div className="text-sm text-gray">Number Order #{props.order}</div>*/}
                        <div className="text-sm text-gray">Tempo de preparo # {props.order}</div>
                    </div>
                </div>

                <div className="flex items-center">
                    <div className="">${props.price}</div>
                </div>
            </div>
        </>
    );
};

export default List;