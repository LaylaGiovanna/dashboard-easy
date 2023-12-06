import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { IconEdit } from '@tabler/icons-react';
import { IconTrash } from '@tabler/icons-react';
import Image from 'next/image';
import ImageTeste from "../components/icons/images/imagemFruta.png";
import {
  getDownloadURL,
  uploadBytes,
  ref,

} from 'firebase/storage'
import { storage } from '../firebase';
import NumberFormat from 'react-number-format';
import Switch from '@mui/material/Switch';


const Produtos = () => {

  //________________________________________________________________________________________________________________________________________//
  const [name, setName] = useState('');
  const [isNameVazio, setIsNameVazio] = useState(false);

  const [description, setDescription] = useState('')
  const [isDescriptionVazio, setIsDescriptionVazio] = useState(false)

  const [productType, setProductType] = useState('')
  const [isproductTypeVazio, setIsProductTypeVazio] = useState(false)

  const [price, setPrice] = useState(null);
  const [ispriceVazio, setIsPriceVazio] = useState(null);

  const [photo, setPhoto] = useState(null);
  const [isPhotoVazio, setIsPhotoVazio] = useState(false);

  const [progress, setProgress] = useState(0)
  const [options, setOptions] = useState([]);
  const [preparationTime, setPreparationTime] = useState(null)
  const [products, setProducts] = useState([])
  const [disponibility, setDisponibility] = useState(true);
  const [buttonSelected, setButtonSelected] = useState(true);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [productToEdit, setProductToEdit] = useState(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: '',
    description: '',
    price: 0,
    photo: null,
    productType: '',
    disponibility: false,
    preparationTime: null
  });
  const [productTypeEdit, setProductTypeEdit] = useState('');
  const [preparationTimeEdit, setPreparationTimeEdit] = useState(null);

  //________________________________________________________________________________________________________________________________________//

  const handleToggle = (value) => {

    setDisponibility(value);
    setButtonSelected(value); // Set the buttonSelected state
  };

  //________________________________________________________________________________________________________________________________________//
  // modal de cadastro open and close


  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    console.log('cancelar 1')
    setName('');
    setDescription('');
    setProductType('');
    setPrice('');
    setPhoto(null);
    setPreparationTime(null);
    setIsNameVazio('');
    setIsDescriptionVazio(false);
    setIsProductTypeVazio(false);
    setIsPriceVazio(false);

    setIsOpenModalDelete(false)
    setIsOpen(false);
  }

  const openModalDelete = (productId) => {
    console.log('Deletar produto com ID:', productId);
    setProductToDelete(productId);
    setIsOpenModalDelete(true);
  }

  //________________________________________________________________________________________________________________________________________//
  const DeleteProductModal = (e) => {

    console.log('deletar')
    console.log(productToDelete, 'id fetch')
    //const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTg3NDk5ODEsImV4cCI6MTY5ODc1OTk4MX0.C0H5ZOr0n5JtcQJSaNr3REdqhH9HFLzJ-uIaRWHqJLk';
    const token = localStorage.getItem('token');

    console.log(token)

    fetch(`http://10.107.144.2:3000/products/${productToDelete}`, {
      method: 'DELETE',
      headers: {
        Accept: "application/json",
        'Authorization': `Bearer ${token}`, // token do admin o do matheus
      },
    })

      .then((response) => response.json())
      // .then((responseData) => {
      //   // Lidar com a resposta do servidor, se necessário
      //   console.log('Produto excluído com sucesso:', responseData);
      //   useEffect(() => {
      //     const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTc3OTg5NjksImV4cCI6MTY5NzgwODk2OX0.9xeWbEc2go6rZG3SnB588n65nsSr38PqDm4zu4h-u5s';

      //     fetch("http://10.107.144.14:3000/products/", {
      //       method: "GET",
      //       headers: {
      //         Accept: "application/json",
      //         'Authorization': `Bearer ${token}`,
      //       },
      //     })
      //       .then((response) => response.json())
      //       .then((data) => {
      //         setProducts(data);
      //         console.log(data);
      //       })
      //       .catch((error) => {
      //         console.error("Erro ao buscar os produtos:", error);
      //       });
      //   }, []);
      // })
      .catch((error) => {
        // Lidar com erros, se houver algum
        console.error('Erro ao excluir o produto:', error);
      });
    window.location.reload()
    setIsOpenModalDelete(false);
  }
  //________________________________________________________________________________________________________________________________________//
  // modal de edição open and close
  useEffect(() => {
    console.log(productToEdit, 'useState');

    // Verifique se productToEdit não é nulo antes de fazer o fetch
    if (productToEdit !== null) {
      // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTg3NDk5ODEsImV4cCI6MTY5ODc1OTk4MX0.C0H5ZOr0n5JtcQJSaNr3REdqhH9HFLzJ-uIaRWHqJLk';
      const token = localStorage.getItem('token');

      fetch(`http://10.107.144.2:3000/products/${productToEdit}`, {
        method: 'GET',
        headers: {
          Accept: "application/json",
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Dados recebidos:', data);
          // Aqui você pode fazer algo com os dados, se necessário.
          setFormData(data);

        })
        .catch((error) => {
          console.error('Erro ao buscar os dados:', error);
        });
    }
  }, [productToEdit]);


  const openModalEdit = (productId) => {
    console.log('Editar produto com ID:', productId);
    setProductToEdit(productId);

    setIsOpenEdit(true);
  };

  useEffect(() => {
    console.log(productToEdit, 'useState');
  }, [productToEdit]);
  const closeModalEdit = () => {
    setIsOpenEdit(false);

  };
  //________________________________________________________________________________________________________________________________________//
  //const EdiProductModal = (e) => {
  // e.preventDefault();
  // console.log('confirmar com id ')



  // Implemente a lógica para determinar campos modificados e construir o objeto JSON para enviar com o PUT.
  //  const updatedData = {};
  // for (const key in formData) {
  //   if (formData[key] !== originalData[key]) {
  //   updatedData[key] = formData[key];
  // }
  //}
  // console.log('Dados a serem enviados:', updatedData);
  //}

  //________________________________________________________________________________________________________________________________________//
  const handleDisponibilityChange = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      disponibility: !prevFormData.disponibility,
    }));
  };
  const EdiProductModal = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');

    const data = {
      // Inclua apenas os campos que precisam ser atualizados
      name: formData.name,
      description: formData.description,
      productType: productTypeEdit,
      price: formData.price,
      preparationTime: preparationTime,
      disponibility: formData.disponibility,
      // Adicione outros campos conforme necessário
    };
    console.log("aaa" + data)

    fetch(`http://10.107.144.2:3000/products/${productToEdit}`, {
      method: 'PATCH', // Altere para PATCH
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
      
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Erro ao editar o produto: Status ${response.status}`);
        }
        return response.json();
      })
      .then((responseData) => {
        console.log('Produto editado com sucesso:', responseData);
        // Realize qualquer ação adicional após a edição bem-sucedida
        setIsOpenEdit(false); // Feche o modal de edição, se necessário
      })
      .catch((error) => {
        console.error('Erro ao editar o produto:', error.message);
      });
    // window.location.reload()

  };

  //________________________________________________________________________________________________________________________________________//

  useEffect(() => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTg3NDk5ODEsImV4cCI6MTY5ODc1OTk4MX0.C0H5ZOr0n5JtcQJSaNr3REdqhH9HFLzJ-uIaRWHqJLk';
    const token = localStorage.getItem('token');

    fetch("http://10.107.144.2:3000/products/types", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data + 'dados'); // Aquí imprime la respuesta
        setOptions(data); // Aquí establece las opciones con los datos recibidos
      })
      .catch((error) => {
        console.error("Erro ao buscar os Tipos:", error);
      });
  }, []);


  const handleKeyPress = (e) => {
    const regex = /^[A-Za-z]+$/;
    if (!regex.test(e.key)) {
      e.preventDefault();
    }
  };

  // tirar mensagem da VALIDAÇÃO
  const handleChange = () => {
    if (/^[A-Za-z]+$/.test(name)) {
      setIsNameVazio(false);
    }
    if (name.trim !== '') {
      setIsNameVazio(false);
    }
    if (description.trim() !== '') {
      setIsDescriptionVazio(false);
    }
    if (productType.trim() !== null) {
      setIsProductTypeVazio(false);
    }
    if (price !== null) {
      setIsPriceVazio(false);
    }
    if (photo !== null) {
      setIsPhotoVazio(false);
    }

  };
  //________________________________________________________________________________________________________________________________________//
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTg3NDk5ODEsImV4cCI6MTY5ODc1OTk4MX0.C0H5ZOr0n5JtcQJSaNr3REdqhH9HFLzJ-uIaRWHqJLk';
    const preparationTimeValue = preparationTime === "" ? null : parseInt(preparationTime);

    const data = {
      photo,
      name,
      description,
      productType,
      price,
      preparationTime,
      disponibility
    };

    //VALIDAÇÃO
    if (/^[A-Za-z]+$/.test(name)) {
      setIsNameVazio(false);
    }
    if (name.trim() === '') {
      setIsNameVazio(true);
      return; // Retorna para evitar o envio do formulário
    }
    if (description.trim() === '') {
      setIsDescriptionVazio(true);
      return; // Retorna para evitar o envio do formulário
    }
    if (productType.trim() === '') {
      setIsProductTypeVazio(true);
      return; // Retorna para evitar o envio do formulário
    }
    if (price === null) {
      setIsPriceVazio(true);
      return; // Retorna para evitar o envio do formulário
    }
    if (photo === null) {
      setIsPhotoVazio(true);
      return; // Retorna para evitar o envio do formulário
    }


    console.log('Dados do produto:', { data });

    fetch('http://10.107.144.2:3000/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((responseData) => {
        // Aqui você pode lidar com a resposta do servidor, se necessário
        console.log('Resposta do servidor: certo', responseData);
      })
      .catch((error) => {
        // Lidar com erros, se houver algum
        console.error('Erro ao fazer a solicitação POST:', error);
      });
    //  window.location.reload()

    setIsOpen(false);
  };
  // const storage = getStorage();
  // const handlePhotoChange = (e) => {
  //   const file = e.target.files[0];
  //   console.log(file)
  //   if (file) {
  //     const reader = new FileReader();
  //     reader.onload = async (event) => {
  //       uploadImage(reader.result)
  //     };
  //     reader.readAsDataURL(file);
  //     console.log(reader)
  //   }
  // };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const storageRef = ref(storage, `web/images-${file.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, file);

      // Track upload progress here
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload is ${progress}% done`);

      // Upload complete, get the download URL
      const url = await getDownloadURL(storageRef);
      console.log('File available at', url);
      setPhoto(url);
      // You can set the URL in your state or wherever needed
    } catch (error) {
      // Handle upload error
      console.error(error);
    }
  };

  // const uploadImage = async (uri) => {
  //   const blob = Promise < Blob > ((resolve, reject) => {
  //     const xhr = new XMLHttpRequest()
  //     xhr.onload = function () {
  //       resolve(xhr.response)
  //     }
  //     xhr.onerror = function (e) {
  //       console.log(e);
  //       reject(new TypeError('Network request failed'))
  //     }
  //     xhr.responseType = 'blob'
  //     xhr.open('GET', uri, true)
  //     xhr.send(null)
  //   })

  //   try {
  //     const storageRef = ref(storage, `image-${Date.now()}`)
  //     const result = await uploadBytes(storageRef, blob)
  //     console.log(storageRef)
  //     return await getDownloadURL(storageRef)
  //   } catch (error) {
  //     alert(`Error : ${error}`)
  //   }
  // };


  //________________________________________________________________________________________________________________________________________//
  useEffect(() => {
    // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aGV1cyBTaXF1ZWlyYSBTaWx2YSIsImlkIjoxLCJpYXQiOjE2OTg3NDk5ODEsImV4cCI6MTY5ODc1OTk4MX0.C0H5ZOr0n5JtcQJSaNr3REdqhH9HFLzJ-uIaRWHqJLk';
    const token = localStorage.getItem('token');

    fetch("http://10.107.144.2:3000/products/", {
      method: "GET",
      headers: {
        Accept: "application/json",
        'Authorization': `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        console.log(data);

      })
      .catch((error) => {
        console.error("Erro ao buscar os produtos:", error);
      });
  }, []);

  // Função para lidar com a mudança nos campos de nome e descrição
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para limpar o valor do campo de entrada ao clicar
  const handleClearField = (fieldName, data) => {

    setFormData({

      ...formData,
      [fieldName]: data,
    });
  };
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setFormData({
          ...formData,
          photo: e.target.result,
        });
      };

      reader.readAsDataURL(file);
    }
  };
  const label = { inputProps: { 'aria-label': 'Switch demo' } };
  //const [disponibilidade, setDisponibilidade] = useState(product.disponibility);


  const handleSwitchChange = (productId) => {
    setProducts((prevProducts) => {
      return prevProducts.map((product) => {
        if (product.id === productId) {
          // Atualiza apenas o produto específico cujo Switch foi alterado
          const updatedProduct = { ...product, disponibility: !product.disponibility };

          // Faça a requisição PATCH para atualizar no banco de dados
          const token = localStorage.getItem('token');
          fetch(`http://10.107.144.2:3000/products/${productId}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ disponibility: updatedProduct.disponibility }),
          })
            .then((response) => {
              if (!response.ok) {
                throw new Error('Erro ao atualizar disponibilidade no servidor');
              }
              return response.json();
            })
            .then((data) => {
              // A atualização no banco foi bem-sucedida, você pode lidar com o retorno se necessário
              console.log('Atualização bem-sucedida:', data);
            })
            .catch((error) => {
              console.error('Erro durante a requisição PATCH:', error);
              // Reverta a mudança localmente se a requisição falhar
              return product;
            });

          return updatedProduct;
        }
        return product;
      });
    });
  };


  return (
    <Layout>
      <div className='flex flex-col h-full bg-second'>
        <div className='flex items-center justify-center pb-6 h-1/4'>
          <div className='flex h-4/5 w-4/5 items-end '>
            <button onClick={openModal} className='h-11 w-80 rounded-md bg-primary'>Cadastrar produto</button>
          </div>
        </div>


        <div className='flex items-center justify-center h-full '>
          <div className='flex justify-center  items-center h-4/5 w-4/5 pl-16 pr-16 rounded-lg shadow-shadow-button bg-white text-text '>
            <div className='flex  justify-center h-5/6 w-full bg-white text-text'>
              {/* div da tabela */}
              <div className='w-full flex items-center justify-center'>

                <div className=" w-full h-4/5 relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
                    <thead className="overflow-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className='sticky top-0 z-10 bg-primary text-white'>
                        <th scope="col" className=" px-6 py-3">
                          Foto
                        </th>
                        <th scope="col" className="px-6 py-3">
                          ID Produto
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tempo de preparo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Preço
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Disponibilidade
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr className=" text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={product.id}>
                          <td scope="row" className="px-6 py-4">
                            <span className="items-center justify-center w-[38px] h-[38px]">
                              {/* <Image className="rounded-full" src={ImageTeste} alt="imagem teste" height={38} width={38} /> */}

                              <Image className="rounded-full" src={product.photo} alt="imagem teste" height={38} width={38} />
                            </span>

                          </td>
                          <td className="px-6 py-4 ">
                            {product.id}
                          </td>
                          <td className="px-6 py-4">
                            {product.name}
                          </td>
                          <td className="px-6 py-4">
                            {product.preparationTime !== null ? product.preparationTime : 'Sem tempo de preparo'}
                          </td>

                          <td className="px-6 py-4">
                            R${product.price}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="relative inline-flex">
                              {/* <div class="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm">
                                {product.disponibility ? (
                                  <div className="select-option">Sim</div>
                                ) : (
                                  <div className="select-option">Não</div>
                                )}
                              </div> */}
                              {/* <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                              </div> */}
                              <Switch
                                checked={product.disponibility}
                                onChange={() => handleSwitchChange(product.id)}
                                color="warning"
                              />

                            </div>
                          </td>
                          <td className='flex px-6 py-4  gap-3 items-center justify-around'>
                            <IconEdit onClick={() => openModalEdit(product.id)} color='#979797' width={24} height={24} />
                            <IconTrash onClick={() =>
                              //openModalDelete(product.id)} 
                              openModalDelete(product.id)}
                              color='#F15050' width={24} height={24} />
                          </td>


                        </tr>
                      ))}


                      {/* <tr className=" text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td scope="row" className="px-6 py-4">
                          <span className="items-center justify-center w-[38px] h-[38px]">
                            <Image className="rounded-full" src={ImageTeste} alt="imagem teste" height={38} width={38} />
                          </span>

                        </td>
                        <td className="px-6 py-4 ">
                          1
                        </td>
                        <td className="px-6 py-4">
                          Salgado Assado
                        </td>
                        <td className="px-6 py-4">
                          R$5,50
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div class="relative inline-flex">
                            <select class="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm">
                              <option>Sim</option>
                              <option>Não</option>
                            </select>
                            <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                            </div>
                          </div>
                        </td>
                        <td className='flex px-6 py-4  gap-3 items-center justify-around'>
                          <IconEdit onClick={openModalEdit} color='#979797' width={24} height={24} />
                          <IconTrash color='#F15050' width={24} height={24} />
                        </td>
                      </tr> */}
                    </tbody>
                  </table>
                </div>
                {isOpenModalDelete && (
                  <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
                    <div className="grid modal-container rounded-lg p-4 w-[680px] h-fit text-text bg-white">
                      <div className=" modal-content  p-4 rounded-xl">
                        <h2 className="text-xl font-bold my-4">Deseja deletar esse produto</h2>
                        <form className="fle flex-col justify-between">

                          <div className="flex justify-end h-16 gap-4 ">
                            <button
                              onClick={closeModal}
                              className="border text-text h-11 py-2 px-4 rounded ">
                              Cancelar
                            </button>
                            <button
                              onClick={DeleteProductModal}

                              type="submit"
                              className="bg-primary border-text border h-11 text-white py-2 px-4 rounded">
                              Deletar
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

        </div>

        {/* Modal de cadastro */}
        {isOpen && (
          <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
            <div className="grid modal-container rounded-lg p-4 w-[680px] h-fit text-text bg-white">
              <div className=" modal-content  p-4 rounded-xl">
                <h2 className="text-xl font-bold my-4">Cadastrar novo produto</h2>
                <form className="fle flex-col justify-between">
                  {/* foto */}
                  <div>
                    <label className="" htmlFor="hiddenFileInput">
                      Foto do produto
                    </label>
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "3px solid #EAEAEA",
                        backgroundColor: "#F5F5F5",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                      onClick={() => document.getElementById("hiddenFileInput").click()}

                    >
                      {photo && (
                        <Image
                          src={photo}
                          alt="Selected"
                          width={"100%"}
                          height={"100%"}
                          objectFit={"cover"}
                          // style={{ width: "100%", height: "100%", objectFit: "cover" }}

                        />
                      )}

                    </div>

                    <input
                      type="file"
                      id="hiddenFileInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handlePhotoChange}
                    />
                    {/* Rest of your code... */}
                  </div>


                  {/* fim Foto*/}

                  {/* Nome */}
                  <div className='mb-2'>
                    <label htmlFor="campo">Nome do produto</label>
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Nome do produto"
                        id="nome"
                        maxLength={26}
                        className="border rounded-lg border-gray p-2  w-full"
                        onChange={(e) => {
                          setName(e.target.value);
                          handleChange();
                        }}
                        onKeyPress={handleKeyPress}
                      />
                    </div>
                    {isNameVazio && <span style={{ color: 'red' }}>Por favor, preencha o nome</span>}
                  </div>

                  {/* Descrição */}
                  <div className='mb-2'>
                    <label htmlFor="campo">Descrição do produto</label>
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Descrição do produto"
                        id="descricao"
                        className="h-11 border rounded-lg border-gray p-2 w-full"
                        onChange={(e) => {
                          setDescription(e.target.value)
                          handleChange();
                        }}
                      />
                    </div>
                    {isDescriptionVazio && <span style={{ color: 'red' }}>Por favor, preencha a descrição</span>}
                  </div>

                  {/* Div do tipo e preço do produto */}
                  <div className='flex gap-8'>
                    {/* Tipo */}
                    <div className='mb-2'>
                      <label htmlFor="campo">Tipo do produto</label>
                      <div className="pt-1 ">
                        <div className="relative inline-flex h-11 w-full">
                          <select
                            className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                            onChange={(e) => {
                              setProductType(e.target.value)
                              handleChange();
                            }}
                            value={productType}
                          >
                            <option value="">Selecione</option>
                            {options.map((item) => (
                              <option key={item.id} value={item.type}>
                                {item.type}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                      {isproductTypeVazio && <span style={{ color: 'red' }}>Por favor, preencha o tipo de produto</span>}
                    </div>


                    {/* Tempo de preparacao */}
                    <div className=''>
                      <label htmlFor="campo">Tempo de preparo</label>
                      <div className="pt-1 ">
                        <div className="relative inline-flex h-11 w-full">
                          <select
                            className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                            onChange={(e) => {
                              const value = e.target.value === "" ? null : parseInt(e.target.value);
                              setPreparationTime(value);

                            }}
                            value={preparationTime || ""}
                          >
                            <option value="">Selecione</option>
                            <option value="5">5 minutos</option>
                            <option value="10">10 minutos</option>
                            <option value="15">15 minutos</option>
                            <option value="20">20 minutos</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </div>

                    </div>

                    {/* Preço */}
                    <div className=''>
                      <label htmlFor="campo">Preço</label>
                      <div className="pt-1">
                        <input
                          value={price}
                          placeholder="0,00"
                          type="text"
                          id="preco"
                          className="border h-11 rounded-lg border-gray p-2 mb-4 w-full"
                          onChange={(e) => {
                            setPrice(e.target.value)
                            handleChange();
                          }}

                        />
                      </div>
                      {ispriceVazio && <span style={{ color: 'red' }}>Por favor, preencha o preço</span>}
                    </div>


                  </div>
                  <div>
                    <span>Disponibilidade</span>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: buttonSelected === true ? '#FF6C44' : buttonSelected === false ? 'gray' : '#FF6C44',
                        width: 'max-content',
                        borderRadius: '50px',
                        gap: '2vw',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggle(false)}
                        className={buttonSelected === false ? 'selected' : ''}
                        style={{
                          backgroundColor: buttonSelected === false ? 'white' : 'transparent',
                          color: buttonSelected === false ? 'gray' : '#FF6C44',
                          borderRadius: '50%',
                          transition: 'background-color 0.5s',
                        }}
                      >
                        NÃO
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle(true)}
                        className={buttonSelected === true ? 'selected' : ''}
                        style={{
                          backgroundColor: buttonSelected === true ? 'white' : 'transparent',
                          color: buttonSelected === false ? 'gray' : '#FF6C44', // Corrigido aqui
                          borderRadius: '50%',
                        }}
                      >
                        SIM
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-end h-16 gap-4 ">
                    <button
                      onClick={closeModal}

                      className="border text-text h-11 py-2 px-4 rounded ">
                      Cancelar
                    </button>
                    <button
                      onClick={handleSubmit}
                      type="submit"
                      className="bg-primary border-text border h-11 text-white py-2 px-4 rounded">
                      Confirmar
                    </button>
                  </div>


                </form>
              </div>
            </div>
          </div>
        )}

        {/* Modal de edição */}
        {isOpenEdit && (
          <div className="bg-gradient fixed inset-0 flex items-center justify-center z-50">
            <div className="grid modal-container rounded-lg p-4 w-[680px] h-fit text-text bg-white">
              <div className=" modal-content  p-4 rounded-xl">
                <h2 className="text-xl font-bold my-4">Editar produto</h2>
                <form className="fle flex-col justify-between">
                  {/* foto */}
                  <div>
                    <label htmlFor="hiddenFileInput">
                      Foto do produto
                    </label>
                    <div
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                        border: "3px solid #EAEAEA",
                        backgroundColor: "#F5F5F5",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                      onClick={() => {
                        document.getElementById('hiddenFileInput').click();
                      }}
                    >
                      {formData.photo && (
                        <Image
                          src={formData.photo}
                          alt="Selected"
                          width={"100%"}
                          height={"100%"}
                          objectFit={"cover"}
                          // style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      )}
                    </div>

                    <input
                      type="file"
                      id="hiddenFileInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileInputChange}
                    />
                    {/* Rest of your code... */}
                  </div>

                  {/* Nome */}
                  <div>
                    <label htmlFor="campo">Nome do produto</label>
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Nome do produto"
                        id="nome"
                        className="border rounded-lg border-gray p-2 mb-4 w-full"
                        value={formData.name}
                        onChange={(e) => handleClearField('name', e.target.value)} // Atualiza o valor enquanto digita
                      //onChange={handleInputChange} // Atualiza o valor enquanto digita
                      />
                    </div>
                  </div>

                  {/* Descrição */}
                  <div>
                    <label htmlFor="campo">Descrição do produto</label>
                    <div className="pt-1">
                      <input
                        type="text"
                        placeholder="Descrição do produto"
                        id="descricao"
                        className="h-11 border rounded-lg border-gray p-2 mb-4 w-full"
                        value={formData.description}
                        onChange={(e) => handleClearField('description', e.target.value)} // Atualiza o valor enquanto digita
                      // onClick={() => handleClearField('description')} // Limpa o campo ao clicar
                      />
                    </div>
                  </div>

                  {/* Div do tipo e preço do produto */}
                  <div className='flex gap-8'>

                    <div className=''>
                      <label htmlFor="campo">Tempo de preparo</label>
                      <div className="pt-1 ">
                        <div className="relative inline-flex h-11 w-full">
                          <select
                            className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                            //onChange={(e) => setProductTypeEdit(e.target.value !== 'null' ? parseInt(e.target.value) : null)}
                            //value={productTypeEdit !== null ? productTypeEdit.toString() : ''}
                          >

                            <option value="">{formData.preparationTime !== null ? formData.preparationTime + ' min' : 'Sem tempo de preparo'}</option>
                            <option value="null">sem tempo</option>
                            <option value="5">5 minutos</option>
                            <option value="10">10 minutos</option>
                            <option value="15">15 minutos</option>
                            <option value="20">20 minutos</option>
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Tipo */}


                    {/* Preço */}
                    <div className=''>
                      <label htmlFor="campo">Preço</label>
                      <div className="pt-1">
                        <input
                          type="text"
                          placeholder="Digite o preço"
                          id="preco"
                          className="border h-11 rounded-lg border-gray p-2 mb-4 w-full"
                          value={formData.price}
                          //  onClick={() => handleClearField('price')} // Limpa o campo ao clicar
                          onChange={(e) => handleClearField('price', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className=''>
                      <label htmlFor="campo">Tipo do produto</label>
                      <div className="pt-1 ">
                        <div className="relative inline-flex h-11 w-full">
                          <select
                            className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                            onChange={(e) => setProductTypeEdit(e.target.value)}
                            value={productTypeEdit}
                          >
                            <option value="">{formData.productType
                            }</option>
                            {options.map((item) => (
                              <option key={item.id} value={item.type}>
                                {item.type}
                              </option>
                            ))}
                          </select>
                          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>


                  </div>
                  <div className=''>
                    <span>Disponibilidade</span>
                    {/* <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        backgroundColor: buttonSelected === true ? '#FF6C44' : buttonSelected === false ? 'gray' : '#FF6C44',
                        width: 'max-content',
                        borderRadius: '50px',
                        gap: '2vw',
                      }}
                    >
                      <button
                        type="button"
                        onClick={() => handleToggle(false)}
                        className={buttonSelected === false ? 'selected' : ''}
                        style={{
                          backgroundColor: buttonSelected === false ? 'white' : 'transparent',
                          color: buttonSelected === false ? 'gray' : '#FF6C44',
                          borderRadius: '50%',
                          transition: 'background-color 0.5s',
                        }}
                      >
                        NÃO
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggle(true)}
                        className={buttonSelected === true ? 'selected' : ''}
                        style={{
                          backgroundColor: buttonSelected === true ? 'white' : 'transparent',
                          color: buttonSelected === false ? 'gray' : '#FF6C44', // Corrigido aqui
                          borderRadius: '50%',
                        }}
                      >
                        SIM
                      </button>
                    </div> */}
                    <Switch
                      checked={formData.disponibility}
                      onChange={handleDisponibilityChange}
                      color="warning"
                    />

                  </div>

                  <div className="flex justify-end h-16 gap-4 ">
                    <button
                      onClick={closeModalEdit}
                      className="border text-text h-11 py-2 px-4 rounded ">
                      Cancelar
                    </button>
                    <button

                      type="submit"
                      className="bg-primary border-text border h-11 text-white py-2 px-4 rounded"
                      onClick={EdiProductModal}
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
    </Layout>
  );
};

export default Produtos;