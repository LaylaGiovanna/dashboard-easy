import { useEffect, useState,useRef } from "react";
import { getData } from "../utils/api.js";
import PedidosCard from '../components/PedidosCard.jsx';
import PedidosCardHistorico from '../components/PedidoCardHistorico.jsx';
import Layout from '../components/Layout.jsx';

// Componente reutilizável para botões
function Botao({ cor, funcao, texto, backgroundColor }) {
  return (
    <button
      style={{
        color: cor,
        backgroundColor: backgroundColor,
        border: backgroundColor ? 'none' : '1px solid #000',
        height: '70%',
        borderRadius: '10px',
        width: '30%',
      }}
      onClick={() => funcao()}
    >
      {texto}
    </button>
  );
};

export default function HistoricoDePedidos() {
  const [isOpen, setIsOpen] = useState(false);
  const [ordersTime, setOrdersTime] = useState([]);
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [modalFinalizar, setModalFinalizar] = useState(false);
  const [modalExtornar, setModalExtornar] = useState(false);

  const [pedidoEmailModal, setPedidoEmailModal] = useState(null);
  const [pedidoIdModal, setPedidoIdModal] = useState(null);
  const [produtosSelecionadosExtornar, setProdutosSelecionadosExtornar] = useState([]);
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);
  const [novoTotalExtornar, setNovoTotalExtornar] = useState(0);

  const pedidoIdModalRef = useRef(pedidoIdModal);

  useEffect(() => {
    // Atualize a ref sempre que o estado for alterado
    pedidoIdModalRef.current = pedidoIdModal;
  }, [pedidoIdModal]);

  const handleCheckboxChangeExtornar = (productIndex, subIndex) => {
    const produtosSelecionadosAtualizados = [...produtosSelecionadosExtornar];
    produtosSelecionadosAtualizados[productIndex] = produtosSelecionadosAtualizados[productIndex] || [];
  
    // Inverte o estado do checkbox individual
    produtosSelecionadosAtualizados[productIndex][subIndex] = !produtosSelecionadosAtualizados[productIndex][subIndex];
  
    setProdutosSelecionadosExtornar(produtosSelecionadosAtualizados);
  
    const pedidoSelecionado = ordersTime.find((order) => order.id === pedidoIdModal);
  
    if (pedidoSelecionado && pedidoSelecionado.products) {
      const novoTotal = calcularNovoTotalExtornar(
        produtosSelecionadosAtualizados,
        pedidoSelecionado.products
      );
  
      console.log(`Checkbox marcado: ${produtosSelecionadosAtualizados[productIndex][subIndex]}, Novo Total: ${novoTotal}`);
    } else {
      console.error("Pedido ou produto não encontrado");
    }
  };
  
// Calcula o novo total ao extornar produtos
const calcularNovoTotalExtornar = (selecionados, produtos) => {
  const totalAtual = selecionados.reduce((acc, selectedProducts, productIndex) => {
    if (Array.isArray(selectedProducts)) {
      selectedProducts.forEach((isSelected, subIndex) => {
        if (isSelected) {
          const produto = produtos[productIndex].product;
          acc += produto.price; // Correção aqui
        }
      });
    }
    return acc;
  }, 0);
  setNovoTotalExtornar(totalAtual);
  return totalAtual;
};

  
  
  

  // Abre o modal de extorno com os dados do pedido selecionado
  const openModalExtornar = (id) => {
    setPedidoIdModal(id);
    console.log(pedidoIdModal);
    setProdutosSelecionadosExtornar([]);
    setPedidoSelecionado(ordersTime.find(order => order.id === id));
    setModalExtornar(true);
  };

  // Abre o modal padrão
  const openModal = () => {
    setIsOpen(true);
  };

  // Abre o modal de finalizar pedido com os dados do pedido selecionado
  const openModalFinalizar = (id) => {
    setModalFinalizar(true);
    setPedidoIdModal(id);
  };

  // Obtém os dados dos pedidos ativos
  const getPedidosData = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getData("carts-with-time", token);
      if (Array.isArray(data)) {
        const pedidosAtivos = data.filter(item => item.status === 'ACTIVE');
        setOrdersTime(pedidosAtivos);
      }
    } catch (error) {
      console.error('Erro ao obter dados dos pedidos ativos:', error);
    }
  };

  // Obtém os dados do histórico de pedidos
  const getHistoricoPedidos = async () => {
    try {
      const token = localStorage.getItem('token');
      const dataHistory = await getData('carts-with-time/carts-disable', token);
      setOrdersHistory(dataHistory);
    } catch (error) {
      console.error('Erro ao obter dados do histórico de pedidos:', error);
    }
  };

  // Efeito para obter dados iniciais e configurar polling
  useEffect(() => {
    getPedidosData();
    getHistoricoPedidos();

    const pollingInterval = setInterval(() => {
      getPedidosData();
      getHistoricoPedidos();
    }, 10000);

    return () => clearInterval(pollingInterval);
  }, []);

  // Finaliza um pedido com base no ID
  const finalizar = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const data = {
        status: "DISABLE"
      };

      const response = await fetch(`http://10.107.144.02:3000/carts-by-user/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setModalFinalizar(false);
       // window.location.reload();
      } else {
        console.error('Erro ao finalizar. Resposta não OK:', response.statusText);
        console.error('Corpo da resposta de erro:', await response.json());
      }
    } catch (error) {
      console.error('Erro ao finalizar:', error);
    }
  };
  const confirmRefund = async (event) => {
    event.preventDefault();

    // Verifica se dadosDaAPI está definido e se dadosDaAPI.email está definido

    const data = {
      email: pedidoSelecionado .customerEmail,
      value: novoTotalExtornar,
    };
    console.log(pedidoIdModal + 'consfirmar');

    console.log(data);

    fetch('http://10.107.144.2:3000/users/balance/DEPOSIT', {
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
        console.log('Extorno confirmado com sucesso:', data);

        finalizar(pedidoIdModal)
        setIsOpen(false);

      })
      .catch(error => {
        // Lida com erros durante a solicitação
        console.error('Erro durante a confirmação do extorno:', error);
      });


  };
  // Fecha o modal de extorno
  const closeModal = (e) => {
    e.preventDefault();
    setNovoTotalExtornar(0)
    setModalExtornar(false);

  };
  return (
    <>
      <Layout>
        <div className='grid justify-around p-8 flex-col h-full text-white bg-second overflow-y-auto'>
          <div className="grid grid-cols-3 gap-10 justify-around h-full">

            {/* Card pedido */}
            <div>
              {/* {dadosRecebidos.map((pedido) => (
              <div key={pedido.id} className="flex flex-col items-center justify-center rounded-lg shadow-shadow-button w-80 h-80 bg-white">
                {/* ... Código do card do pedido ... */}
            </div>

          </div>

          {/* Quadrado azul ocupando a metade superior */}
          <div
            style={{
              width: "100vw", // 100% da largura da tela
              height: "50%", // 50% da altura da tela
              //   backgroundColor: "blue",

            }}
          >
            <h1 style={{ fontSize: "2em", color: 'black' }}>Pedidos com tempo de preparo</h1>
            <div style={{
              width: "100%",
              height: "40vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "row", // Alterado para column para exibir os pedidos verticalmente
              //backgroundColor: "green",
              overflowY: "auto", // Alterado para overflowY para permitir a rolagem vertical
              gap: "3vw",
            }}>
              {/* Mapeie os pedidos para criar os componentes PedidosCard */}
              {ordersTime
  .filter((pedido) => pedido.status === 'ACTIVE')
  .slice()
  .reverse()
  .map((pedido) => (
    <PedidosCard
      key={pedido.id}
      email={pedido.customerEmail}
      produtos={pedido.products}
      total={pedido.total}
      id={pedido.id}
      preparatioTime={pedido.preparationTime}
      finalizar={() => openModalFinalizar(pedido.id)}
      extornar={() => openModalExtornar(pedido.id)}
    />
  ))
}

              {modalFinalizar && (
                <div
                  style={{
                    position: "fixed",
                    top: "0",
                    left: "0",
                    width: "100%",
                    height: "100%",
                    background: "rgba(0, 0, 0, 0.5)", // Fundo escuro semi-transparente
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{ width: '20%', height: '20%', backgroundColor: 'white', display: 'flex', flexDirection: 'column', }}>
                    <div style={{ width: '100%', height: '70%', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                      <span style={{ color: '#54595E', fontWeight: 600, width: 'max-content', height: 'max-content', }}>Tem certeza que deseja finalizar o pedido</span>
                    </div>
                    {/* <button style={{color:'black'}} onClick={() => setModalFinalizar(false)}>Cancelar</button>
  <button style={{color:'white', backgroundColor:'#FF6C44'}} onClick={() => finalizar(pedidoIdModal)}>Finalizar</button> */}
                    <div style={{ display: 'flex', width: '100%', height: '30%', flexDirection: 'row', justifyContent: 'center', gap: '5%', }}>
                      <Botao cor="black" funcao={() => setModalFinalizar(false)} texto="Cancelar" />
                      <Botao cor="#F5F5F5" backgroundColor="#FF6C44" funcao={() => finalizar(pedidoIdModal)} texto="Finalizar" />
                    </div>



                  </div>
                </div>
              )}


              {modalExtornar && (
                <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
                  <div className="grid modal-container rounded-lg p-4 min-w-[465px] h-fit text-text bg-white">
                    <div className="modal-content g p-4 rounded-xl">
                      <span className="text-xl font-semibold my-4">Extornar pedido</span>
                      <form className="flex flex-col justify-between">
                        <div className="mt-1 mb-6">
                          <span className="font-extralight text-gray" htmlFor="campo">
                            Selecione os itens do carrinho para realizar o extorno
                          </span>
                        </div>
                        <div className="mb-5">
                          {/* {pedidoSelecionado && pedidoSelecionado.products.map((product, index) => (
                            <div key={index} className="flex items-center mb-4">
                              <input
                                id={`checkbox-extornar-${index}`}
                                type="checkbox"
                                value={product.total_value}
                                checked={produtosSelecionadosExtornar[index] || false}
                                onChange={() => handleCheckboxChangeExtornar(index)}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label
                                htmlFor={`checkbox-extornar-${index}`}
                                className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {product.product.name}
                              </label>
                              <span>{product.total_value}</span>
                            </div>
                          ))} */}
{pedidoSelecionado && pedidoSelecionado.products.map((product, productIndex) => (
  <div key={product.id}>
    {[...Array(product.qntd)].map((_, subIndex) => (
      <div key={`${product.id}_${subIndex}`} className="flex items-center mb-4">
        <input
          id={`checkbox-extornar-${productIndex}-${subIndex}`}
          type="checkbox"
          value={product.product.price}
          checked={produtosSelecionadosExtornar[productIndex] && produtosSelecionadosExtornar[productIndex][subIndex]}
          onChange={() => handleCheckboxChangeExtornar(productIndex, subIndex)}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <label
          htmlFor={`checkbox-extornar-${productIndex}-${subIndex}`}
          className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
        >
          {product.product.name}
        </label>
        <span>{product.total_value}</span>
      </div>
    ))}
  </div>
))}

                        </div>
                        <span>Total Extornar: <span>{novoTotalExtornar.toFixed(2)}</span></span>

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


          {/* Quadrado verde ocupando a metade inferior */}
          <div
            style={{
              width: "100vw", // 100% da largura da tela
              height: "50vh", // 50% da altura da tela
              // backgroundColor: "purple",
              display: "flex",
              justifyContent: "center",
              // alignItems: "center",
              flexDirection: "column"
              // backgroundColor: "green",
            }}

          >
            <h1 style={{ fontSize: "2em", color: 'black' }}>Historico de Pedidos</h1>
            <div style={{
              width: "100%",
              height: "40vh",
              display: "flex",
              alignItems: "center",
              flexDirection: "row", // Alterado para column para exibir os pedidos verticalmente
              //backgroundColor: "green",
              overflowY: "auto", // Alterado para overflowY para permitir a rolagem vertical
              gap: "3vw",
            }}>


              {/* Mapeie os pedidos para criar os componentes PedidosCard */}
            {/* Mapeie os pedidos para criar os componentes PedidosCard */}
            {ordersHistory.slice().reverse().map((pedido) => (
  <PedidosCardHistorico
    key={pedido.id}
    email={pedido.customerEmail}
    day={pedido.createdAt}
    total={pedido.total}
    produtos={pedido.products}
  />
))}

            </div>



          </div>

          {isOpen && (
            <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
            </div>
          )}
        </div>

      </Layout>
    </>
  );
}