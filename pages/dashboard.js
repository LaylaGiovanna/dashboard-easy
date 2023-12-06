import Layout from "../components/Layout";
import DinheiroIcon from "../components/icons/images/iconDinheiro.jpg";
import ImagemPao from "../components/icons/images/imagemPao.png";
import ImagemFruta from "../components/icons/images/imagemFruta.png";
import Image from "next/image";
import { IconArrowDown } from '@tabler/icons-react';
import React from "react";
import ListOrder from "../components/listPedidos";
import ImagePerfil1 from "../components/icons/images/foto-perfil-1.png";
import ImagePerfil2 from "../components/icons/images/foto-perfil-2.png";
import ImagePerfil3 from "../components/icons/images/foto-perfil-3.png";
import CardCreditos from "../components/cardCredito";
import CardProdutos from "../components/cardProdutos";
import { useEffect,useState } from "react";


export default function Dashboard() {

  const [ordersWithPreparationTime, setOrdersWithPreparationTime] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  function redirectPedidos() {
    //var urlDestino = "/pedidos";
    var urlDestino = "/historicoDePedidos";
    window.location.assign(urlDestino);
  }

  useEffect(() => {
    const getOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log(token)

        // Lógica para obter pedidos, incluindo o token no cabeçalho
        const response = await fetch('http://10.107.144.02:3000/carts-with-time', {
          headers: {
            'Authorization': `Bearer ${token}`, // Adicione o token ao cabeçalho
            'Content-Type': 'application/json',
            // Outros cabeçalhos, se necessário
          },
        });

        const data = await response.json();

       
        console.log('Dados dos pedidos:', data);

        // if (data.length > 0) {
        //   setOrdersWithPreparationTime(data);
        // }
        const today = new Date().toLocaleDateString();
        const ordersToday = data.filter(order => {
          const orderDate = new Date(order.createdAt).toLocaleDateString();
          return orderDate === today;
        });

        // Atualizar o estado com os pedidos filtrados
        setOrdersWithPreparationTime(ordersToday);
        const total = ordersToday.reduce((acc, order) => acc + order.total, 0);
        setTotalSales(total);
      } catch (error) {
        // Trate erros aqui, por exemplo, registre-os ou manipule-os de alguma forma
        console.error('Erro ao obter pedidos:', error);
      }
    };

    // Chame a função getOrders
    getOrders();
  }, []); 

  const convertMinutesToHours = (preparationTime) => {
    const stringH = 'h';
    const min = ' min';
    let time = ''; // Inicialize com uma string vazia
  
    if (preparationTime === 60) {
      time = '1' + stringH;
    } else if (preparationTime === 90) {
      time = '1' + stringH + '30' + min;
    } else if (preparationTime === 120) {
      time = '2' + stringH;
    } else {
      time = preparationTime + min;
    }
  
    return time;
  };
  
  
  // ...
  
  {ordersWithPreparationTime.map((order) => (
    <ListOrder
      key={order.id}
      src={order.customerPhoto ? { uri: order.customerPhoto } : ImagePerfil1}
      name={order.customerEmail}
      order={convertMinutesToHours(order.preparationTime)}
      price={order.total}
    />
  ))}
  

  useEffect(() => {
    console.log('Pedidos com tempo de preparo atualizados:', ordersWithPreparationTime);
  }, [ordersWithPreparationTime]);

  useEffect(() => {
    console.log('Pedidos com tempo de preparo atualizados:', totalSales);
  }, [totalSales]);
  
  return (
    <>
      <Layout>
        <div className="grid xl:grid-cols-2  md:grid-cols-1 items-center h-full bg-second overflow-y-auto">

          {/* Div coluna 1 */}
          <div className="flex flex-col gap-12 justify-around p-12 items-center h-full">
            <CardCreditos title="Crédito" subtitle="Adicione créditos ao seus usuários" titleButton="Créditos da Cantina" src={DinheiroIcon} alt="Icone de dinheiro" height={80} width={68} />

            {/* Card 2 - card de produtos */}
            <CardProdutos title="Produtos" subtitle="Adicione os produtos disponíveis" titleButton="Verificar" src1={ImagemPao} src2={ImagemFruta} src3={ImagemPao} src4={ImagemFruta} alt="Imagem de pão" titleProduto1="Bread" titleProduto2="Fruits" titleProduto3="Bread" titleProduto4="Fruits" />

          </div>


          {/* Div coluna 2 */}
          <div className="flex flex-col p-12 justify-around items-center h-full ">
            {/* Card Pedidos */}
            <div className=" relative flex flex-col xl:w-4/6 lg:w-[388px] md:w-[388px] h-[770px] rounded-3xl shadow-shadow-button  bg-white">
              {/* Div interna do card  */}
              <div className="flex flex-col p-6 gap-12 text-text">
                {/* Div dos textos */}
                <div className="pt-2 gap-4 ">
                  <div className="flex justify-between items-center gap-4">
                    <div className="flex gap-3 items-center">
                      <div className=" h-3 w-3 bg-blue rounded-full"></div>
                      <span className="text-3xl">Pedidos</span>
                    </div>

                    <div className="top-0 flex items-center gap-3  justify-end ">
                      <button onClick={redirectPedidos} className="text-text-green">Verificar</button>
                      <div className="flex items-center justify-center h-7 w-7 bg-redTransparent rounded-full">
                        <IconArrowDown className="icon-triangle" color='#EC4C6E' width={20} height={20} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* div dos valores ganhos no dia */}
                <div className="flex items-center pl-5 gap-8 h-9">
                  <div className="">{`$${totalSales.toFixed(2)}`}</div>

                  <div className="flex items-center border-gray text-gray pl-5 border-l-2 h-9">Hoje</div>
                </div>

                {/* div da lista de quem comprou */}
                <div className="pb-10 h-[500px] pr-6 overflow-auto flex flex-col gap-6  sticky w-full  ">

                  {/* <ListOrder src={ImagePerfil2} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil3} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil2} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil3} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" />
                  <ListOrder src={ImagePerfil1} name="teste" order="w6t873467846" price="20,00" /> */}
                  {ordersWithPreparationTime.map((order)=>(
                  <ListOrder  key={order.id}   src={order.customerPhoto ? {uri: order.customerPhoto} : ImagePerfil1}
                  name={order.customerEmail} order={ convertMinutesToHours(order.preparationTime)} price={order.total}/>
                 // name={order.customerEmail} order={ order.preparationTime} price={order.total}/>


                  ))}
                </div>

              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};