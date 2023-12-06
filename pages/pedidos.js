import Layout from "../components/Layout";
import CardProdutos from "../components/cardPedido"
import { useRouter } from 'next/router';
import socket from "./WebSocketClient"; // Importe o cliente WebSocket
import React, { useEffect, useState } from "react";
import { data } from "autoprefixer";
import loadingSvg from "../public/Loading.gif"
import Image from "next/image";

export default function Pedidos() {
  // Modal de cadastro open and close
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setProdutosSelecionados([])
  };


  // const [pedidosId,setPedidosId] = useState([])
  const [novoPedido, setNovoPedido] = useState(true)
  const [qrCodeData, setQrCodeData] = useState(null);
  const [dadosDaAPI, setDadosDaAPI] = useState(null);
  const [mensagem, setMensagem] = useState(false);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [novoTotal, setNovoTotal] = useState(0);

  const handleCheckboxChange = (index, subIndex) => {
    // Criar uma cópia do estado atual
    const produtosSelecionadosAtualizados = [...produtosSelecionados];
  
    // Se o array interno não existir, inicialize-o
    if (!Array.isArray(produtosSelecionadosAtualizados[index])) {
      produtosSelecionadosAtualizados[index] = [];
    }
  
    // Atualizar o estado do checkbox
    produtosSelecionadosAtualizados[index][subIndex] = !produtosSelecionadosAtualizados[index][subIndex];
  
    // Calcular o novo total com base nos preços dos produtos
    const novoTotal = calcularNovoTotal(produtosSelecionadosAtualizados, dadosDaAPI.products);
  
    // Definir o novo estado
    setProdutosSelecionados(produtosSelecionadosAtualizados);
    setNovoTotal(novoTotal);
  
    // Restante do código...
  };
  
  // const calcularNovoTotal = (produtosSelecionados, produtos) => {
  //   let totalAtual = 0;
  
  //   produtosSelecionados.forEach((produto, index) => {
  //     produto.forEach((isSelected, subIndex) => {
  //       if (isSelected) {
  //         const produtoInfo = produtos[index].product; // Ajuste aqui para acessar as informações do produto
  //         totalAtual += produtoInfo.price;
  //       }
  //     });
  //   });
  
  //   return totalAtual;
  // };
  
  const calcularNovoTotal = (produtosSelecionados, produtos) => {
    let totalAtual = 0;
  
    produtosSelecionados.forEach((produto, index) => {
      produto.forEach((isSelected, subIndex) => {
        if (isSelected) {
          // Verificar se produtos[index] existe antes de acessar a propriedade 'product'
          const produtoInfo = produtos[index] && produtos[index].product;
          if (produtoInfo) {
            totalAtual += produtoInfo.price;
          }
        }
      });
    });
  
    return totalAtual;
  };
  
  //const [dados,setDados] = useState()

  // function verificarIdRepetidos(){
  // //aqui verificar se o numero do webSocketë repetido
  // if(){}else()
  // }

  const finalizar = async (e) => {
    const token = localStorage.getItem('token');
    console.log(token)
    console.log('finalizar');
    console.log(qrCodeData)

    const data = {
      status: "DISABLE"
    }
    console.log('Tipo de qrCodeData:', typeof (qrCodeData));
    console.log('Corpo da solicitação:', JSON.stringify(data));

    await fetch(`http://10.107.144.02:3000/carts-by-user/${qrCodeData}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // token do admin o do matheus
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (response.ok) {
          console.log('Pedido finalizado com sucesso do id' + qrCodeData);
          // Reconectar e obter dados
          socket.connect();
          setDadosDaAPI(null);
          setQrCodeData(null);
          getDados();
        } else {
          console.error('Erro ao finalizar. Resposta não OK:', response.statusText);
          console.error('Corpo da resposta de erro:', response.json()); // Adicione esta linha

        }
      })
      .catch(error => {
        console.error('Erro ao finalizar:', error);
      });
  }


  function getDados() {
    // aqui vai ter um for para fazer o get para cada i do array
    socket.on("message", (data) => {
      // console.log("Dados recebidos do servidor para o pedidos:", data);

      //   // Certifique-se de que data.qrCodeData está definido
      //   const novoId = data.text.qrCodeData;
      //  // console.log('novoID', novoId);

      //   setPedidosId(prevIds => {
      //    // console.log('Todos os IDs antes da atualização:', prevIds);

      //     if (!prevIds.includes(novoId)) {
      //       const updatedIds = [...prevIds, novoId];
      //       console.log('Todos os IDs atualizados:', updatedIds);
      //       updatedIds.forEach(parsedText => {
      //         fetch(`http://easy4u-server.online:3000/carts-by-user/${parsedText}`, {
      //           method: 'GET',
      //           headers: {
      //             'Content-Type': 'application/json',
      //           },
      //         })
      //         .then(response => response.json())
      //         .then(data => {
      //           // Aqui você pode lidar com os dados recebidos da operação GET
      //           setDadosRecebidos((prevDados) => [...prevDados, data]);

      //           console.log(`Dados recebidos para ${parsedText}:`, data);

      //         })
      //         .catch(error => {
      //           // Tratar erros, se necessário
      //          // console.error(`Erro para ${parsedText}:`, error);
      //         });
      //       });
      //       return updatedIds;
      //     }

      //     // Se o ID já existe, retorne o array atual sem modificações
      //     //console.log('Nenhum ID adicionado, retorno o array atual:', prevIds);
      //     return prevIds;
      //   });


      if (data.text && data.text.qrCodeData) {
        const qrCodeValue = parseInt(data.text.qrCodeData, 10);
        setQrCodeData(qrCodeValue);
        console.log('Valor do QR Code:', qrCodeValue);

        // Adicionando lógica para a solicitação fetch
        fetch(`http://10.107.144.02:3000/carts-by-user/${qrCodeValue}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then(response => response.json())
          .then(dataFromServer => {
            // Aqui você pode lidar com os dados retornados pelo servidor após a solicitação
            // console.log('Dados da API:', dataFromServer);
            setDadosDaAPI(dataFromServer); // Aqui armazena os dados no estado
            // Exemplo: Atualizar o estado ou realizar outras operações com os dados do servidor
            // setDadosDoServidor(dataFromServer);
            socket.desconect();
          })
          .catch(error => {
            console.error('Erro na solicitação:', error);
            socket.disconnect(); // Desconectar em caso de erro

            // Tratar o erro, se necessário
          });
      }

    });
  }

  useEffect(() => {
    // Ao montar o componente, conectar e obter dados
    socket.connect();
    getDados();
  }, []);



  useEffect(() => {
    console.log('Estado atualizado:', dadosDaAPI);
    if (!dadosDaAPI) {
      setMensagem(true);
    }
  }, [dadosDaAPI]);

  // useEffect(() => {
  //   console.log('Dados recebidos atualizados:', dadosRecebidos);
  // }, [dadosRecebidos]);

  const confirmRefund = async (event) => {
    event.preventDefault();

    // Verifica se dadosDaAPI está definido e se dadosDaAPI.email está definido

    const data = {
      email: dadosDaAPI.customerEmail,
      value: novoTotal,
    };

    console.log(data);

    fetch('http://10.107.144.02:3000/users/balance/DEPOSIT', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Se você precisar incluir algum cabeçalho de autenticação, adicione aqui
      },
      body: JSON.stringify(data),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro durante a confirmação do extorno: ${response.statusText}`);
        }
        return response.json(); // Retorna os dados da resposta como JSON
      })
      .then(data => {
        // Faça algo com os dados da resposta (se necessário)
        console.log('Extorno :', data);
        finalizar()
        setIsOpen(false);

      })
      .catch(error => {
        // Lida com erros durante a solicitação
        console.error('Erro durante a confirmação do extorno:', error);
      });


  };
  return (
    <>
      <Layout>
        <div className='flex justify-around flex-col h-full text-text bg-second overflow-y-auto'>
          <div className="flex items-center justify-center h-full">


            {/* Card pedido */}
            <div>
              {/* {dadosRecebidos.map((pedido) => (
        <div key={pedido.id} className="flex flex-col items-center justify-center rounded-lg shadow-shadow-button w-80 h-80 bg-white">
          <div className="flex justify-center flex-col text-center text-text">
            <span className="text-2xl">Pedido</span>
            <span className="text-base">de</span>
            <div className="flex items-center justify-center w-72">
              <div className="break-all">
                <p className="text-base">{pedido.customerEmail}</p>
              </div>
            </div>
          </div>

          <div className="grid-cols-3 grid-rows-2 gap-4 mt-4 rounded-lg p-5 w-3/4 h-2/5 bg-grayMedium text-text">
            <div className="flex h-5/6 justify-between pb-4">
              <div className="flex justify-between w-full grid-cols-2 pr-4 overflow-y-auto">
                <div className="">
                  {pedido.products.map((produto) => (
                    <div key={produto.product.id}>{produto.product.name}</div>
                  ))}
                </div>
                <div className="">
                  {pedido.products.map((produto) => (
                    <div key={produto.product.id}>{produto.qntd}x</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 items-end justify-end">
              Total <span className="text-primary">{`R$${pedido.total}`}</span>
            </div>
          </div>

          <div className="flex justify-center mt-2 w-full h-1/5">
            <div className="flex gap-4 items-center w-4/5 justify-center">
              <div className="flex border text-text rounded-lg p-5 items-center h-3/5 bg-white">
                <button onClick={openModal}>Extornar</button>
              </div>
              <div className="flex border-white border rounded-lg p-5 items-center h-3/5 bg-primary">
                <button>Confirmar</button>
              </div>
            </div>
          </div>
        </div>
      ))} */}
            </div>


            {!dadosDaAPI ? (
              <div className="flex flex-col items-center justify-center rounded-3xl w-3/5 h-2/5">
                <Image src={loadingSvg} alt="Gif de carregamento svg"/>
                <span className="text-2xl text-text">Esperando o pedido ser escaneado</span>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-lg shadow-shadow-button w-3/5 h-3/5 bg-white">
                <div className="flex justify-center pb-5 items-center flex-col text-center w-full text-text">
                  <h1 className=" sm:text-sm md:text-3xl lg:text-4xl xl:text-5xl ">Pedido</h1>
                  <span className="text-base">de</span>
                  <div className="flex items-center w-3/5 justify-center">
                    <div className="">
                      <p className="text-lg">{dadosDaAPI.customerEmail}</p>
                      <span>Id: {dadosDaAPI.id}</span>
                    </div>
                  </div>
                </div>
                <div className="grid-cols-3 grid-rows-2 gap-4 mt-4 rounded-lg p-5 w-3/4 h-2/5 bg-grayMedium text-text">
                  <div className="flex h-5/6 justify-between pb-4 ">
                    <div className="flex text-lg flex-col w-full">
                      {dadosDaAPI.products.map((product, index) => (
                        <div className="flex w-full justify-between text-center" key={index}>
                          <p className="flex w-3/4">{product.product.name}</p>
                          <div className="flex w-1/4 gap-3 justify-between pb-3 ">
                            <p>{product.qntd}x</p>
                            <p className="flex w-full justify-end ">Total: {product.total_value}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-2 items-end justify-end ">
                    Total <span className="text-primary">{dadosDaAPI.total}</span>
                  </div>
                </div>
                <div className="flex justify-center mt-1 w-full h-1/5 ">
                  <div className="flex gap-4 items-center w-4/5 justify-center text-lg">
                    <div className="flex border text-text rounded-lg p-5 items-center justify-center h-2/5 w-1/3 bg-white">
                      <button onClick={openModal}>Extornar</button>
                    </div>
                    <div className="flex border-white border rounded-lg p-5 items-center justify-center h-2/5 w-1/3 bg-primary">
                      <button onClick={finalizar}>Finalizar</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {isOpen && (
              <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
                <div className="grid modal-container rounded-lg p-4 min-w-[465px] h-fit text-text bg-white">
                  <div className=" modal-content g p-4 rounded-xl">
                    <span className="text-xl font-semibold my-4 ">Extornar pedido</span>
                    <form className="fle flex-col justify-between">
                      <div className="mt-1 mb-6">
                        <span className="font-extralight text-gray" htmlFor="campo">Selecione os itens do carrinho para realizar o extorno</span>
                      </div>

                      <div className='mb-5'>

                      {dadosDaAPI && dadosDaAPI.products.map((product, index) => (
  <div key={index} className="flex items-center mb-4">
    {[...Array(product.qntd)].map((_, subIndex) => (
      <div key={`${product.id}_${subIndex}`} className="flex items-center mb-4">
        <input
          id={`checkbox-${index}-${subIndex}`}
          type="checkbox"
          value={product.total_value}
          checked={produtosSelecionados[index] && produtosSelecionados[index][subIndex]}
          onChange={() => handleCheckboxChange(index, subIndex)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`checkbox-${index}-${subIndex}`}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {product.product.name}
        </label>
        <span>{product.total_value}</span>
      </div>
    ))}
  </div>
))}

                        {/* <div class="flex items-center mb-4">
                          <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Coxinha</label>
                        </div>
                        <div class="flex items-center">
                          <input id="default-checkbox" type="checkbox" value="" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"></input>
                          <label for="default-checkbox" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Coxinha</label>
                        </div> */}

                      </div>
                      {/* <span>Total <span>{dadosDaAPI.total}</span></span> */}
                      <span>Total <span>{novoTotal}</span></span>

                      <div className="flex justify-end h-16 gap-4 ">
                        <button
                          onClick={closeModal}
                          className="border text-text h-11 py-2 px-4 rounded ">
                          Cancelar
                        </button>
                        <button

                          type="submit"
                          className="bg-primary border-text border h-11 text-white py-2 px-4 rounded"
                          onClick={confirmRefund}
                        >
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
      </Layout>
    </>
  )
};