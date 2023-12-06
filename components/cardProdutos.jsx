import React from "react";
import Image from "next/image";

const CardProdutos = (props) => {

    function redirectProdutos() {
        var urlDestino = "/produtos";
        window.location.assign(urlDestino);
    }

    return (
        <>
            <div className="flex flex-col xl:w-4/6 lg:w-5/6 md:w-[388px] sm:w-[388px] h-[330px] rounded-3xl shadow-shadow-button bg-white">
                {/* Div interna do card 1 */}
                <div className="flex flex-col p-6 gap-8 text-text h-full">
                    {/* Div dos textos */}
                    <div className="gap-4">
                        <span className="text-3xl">{props.title}</span>

                        <div className="flex justify-between">
                            <div className="pl-0 justify-start">
                                <span className="text-text-light">{props.subtitle}</span>
                            </div>
                            <div className="flex pr-0 justify-end ">
                                <button onClick={redirectProdutos } className="text-text-green">{props.titleButton}</button>
                            </div>
                        </div>
                    </div>

                    <div className="flex  gap-x-3 justify-around items-center h-44 ">
                        <div className="flex flex-col items-center w-24 justify-around h-full">
                            <div>
                                <Image className="rounded-lg shadow-2xl" src={props.src1} alt={props.alt} height={116} width={103} />
                            </div>
                            <div className="">{props.titleProduto1}</div>
                        </div>

                        <div className="flex flex-col items-center w-24 justify-around h-full">
                            <div>
                                <Image className="rounded-lg shadow-2xl" src={props.src2} alt={props.alt} height={116} width={103} />
                            </div>
                            <div className="">{props.titleProduto2}</div>
                        </div>

                        <div className="flex flex-col items-center w-24 justify-around h-full">
                            <div>
                                <Image className="rounded-lg shadow-2xl" src={props.src3} alt={props.alt} height={116} width={103} />
                            </div>
                            <div className="">{props.titleProduto3}</div>
                        </div>

                        <div className="flex flex-col items-center w-24 justify-around h-full">
                            <div>
                                <Image className="rounded-lg shadow-2xl" src={props.src4} alt={props.alt} height={116} width={103} />
                            </div>
                            <div className="">{props.titleProduto4}</div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
};

export default CardProdutos;