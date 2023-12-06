import React from "react";

export default function PedidosCard({ email, produtos, total, id, finalizar, extornar, preparatioTime }) {
  // Função para formatar o total com vírgula nas duas primeiras casas decimais
  const formatTotal = (value) => {
    return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg shadow-shadow-button w-80 h-80 bg-white mt-1 p-2">
        <div className="flex justify-center flex-col text-center text-text">
          <div className="flex justify-end items-center">
            {/* Novo SVG icon */}
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              className="mr-2"
            >
              <g data-name="Layer 15">
                <path
                  d="M16 31a15 15 0 1 1 15-15 15 15 0 0 1-15 15Zm0-28a13 13 0 1 0 13 13A13 13 0 0 0 16 3Z"
                  fill="#808080"
                  className="fill-101820"
                ></path>
                <path
                  d="m20.24 21.66-4.95-4.95A1 1 0 0 1 15 16V8h2v7.59l4.66 4.65Z"
                  fill="#808080"
                  className="fill-101820"
                ></path>
              </g>
            </svg>
            {/* Preparation time */}
            <p style={{ color: '#808080', fontSize: '13px', textAlign: 'right', marginRight: '8px' }}>{preparatioTime} min</p>
          </div>
          <span className="text-1xl">Pedido de</span>
          <div className="flex items-center justify-center w-72">
            <div className="break-all">
              <p className="text-base" style={{ color: '#FF6C44' }}>{email}</p>
              <span>{id}</span>
            </div>
          </div>
        </div>
        <div className="grid-cols-3 grid-rows-1 gap-4 mt-4 rounded-lg p-5 w-4/5 h-2/5 bg-grayMedium text-text"> {/* Ajuste para tornar o quadrado mais largo */}
          <div className="flex h-5/6 justify-between pb-4">
            <div className="flex flex-col gap-2 w-full pr-4 overflow-y-auto">
              {produtos.map((produto, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>{produto.qntd}x</div>
                  <p className="text-base">{produto.product.name}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="flex gap-2 items-end justify-end">
            Total$<p className="text-base" style={{ color: '#FF6C44' }}>{formatTotal(total)}</p>
          </div>
        </div>
        {/* div botões */}
        <div className="flex justify-center mt-2 w-full h-1/5">
          <div className="flex gap-4 items-center w-4/5 justify-center">
            <div className="flex border text-text rounded-lg p-5 items-center h-3/5 bg-white">
              <button onClick={() => extornar()}>Extornar</button>
            </div>
            <div className="flex border-white border rounded-lg p-5 items-center h-3/5 bg-primary">
              <button onClick={() => finalizar(id)}>
                Finalizar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
