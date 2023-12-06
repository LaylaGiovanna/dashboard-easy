import React from "react";

export default function PedidosCardHistorico({ email, total, day, produtos }) {
  // Convert the 'day' string to a Date object
  const formattedDate = new Date(day).toLocaleDateString('pt-BR', { month: '2-digit', day: '2-digit', year: '2-digit' });
  const formatTotal = (value) => {
    return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 });
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center rounded-lg shadow-shadow-button w-80 h-80 bg-white mt-1 p-2">
        <div className="flex justify-center flex-col text-center text-text">
          <div className="flex justify-end items-center" style={{ marginTop: '14px' }}>
            {/* Novo SVG icon */}
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="16" height="16" className="mr-2">
              <path d="M20 2h-1V1a1 1 0 0 0-2 0v1H7V1a1 1 0 0 0-2 0v1H4a4 4 0 0 0-4 4v14a4 4 0 0 0 4 4h16a4 4 0 0 0 4-4V6a4 4 0 0 0-4-4Zm2 18a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1a1 1 0 0 0 2 0V4h10v1a1 1 0 0 0 2 0V4h1a2 2 0 0 1 2 2Z" fill="#a8a8a8" className="fill-232323"></path>
              <path d="M19 7H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2ZM7 12H5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2ZM7 17H5a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2ZM13 12h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2ZM13 17h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2ZM19 12h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2ZM19 17h-2a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Z" fill="#a8a8a8" className="fill-232323"></path>
            </svg>
            {/* Preparation time */}
            <p style={{ color: '#808080', fontSize: '13px', textAlign: 'right', marginRight: '8px', marginLeft: '1px', }}>{formattedDate} </p>
          </div>
          <span className="text-1xl">Pedido de</span>
          <div className="flex items-center justify-center w-72 break-all">
            <p className="text-base" style={{ color: '#FF6C44' }}>{email}</p>
          </div>
        </div>
        <div className="grid-cols-3 grid-rows-1 gap-4 mt-4 rounded-lg p-5 w-4/5 h-3/5 bg-grayMedium text-text">
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
            {/* Add your buttons or any additional content here */}
          </div>
        </div>
      </div>
    </>
  );
}
