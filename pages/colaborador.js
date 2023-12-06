import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { IconEdit, IconTrash } from '@tabler/icons-react';


export default function Colaborador() {
  const [name, setName] = useState('');
  const [isNameVazio, setIsNameVazio] = useState(false);
  const [email, setEmail] = useState('');
  const [isEmailVazio, setIsEmailVazio] = useState(false);
  const [password, setPassword] = useState('');
  const [isPasswordVazio, setIsPasswordVazio] = useState(false);
  const [userType, setUserType] = useState('');
  const [isUserTypeVazio, setIsUserTypeVazio] = useState(false);
  const [employeeData, setEmployeeData] = useState([]);
  const [userToDelete, setUserToDelete] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [editableUser, setEditableUser] = useState({});

  const openModal = () => setIsOpen(true);
  const openModalEdit = () => setIsOpenEdit(true);
  const closeModalEdit = () => setIsOpenEdit(false);

  const handleChange = () => {
    setIsNameVazio(!name.trim());
    setIsEmailVazio(!email.trim());
    setIsPasswordVazio(!password.trim());
    setIsUserTypeVazio(!userType.trim());
  };const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validation
    if (!validateForm()) return;
  
    const fetchEmployeeData = async () => {
      try {
        const response = await fetch('http://10.107.144.2:3000/users', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });
    
        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter((user) => ['COLABORATOR', 'ADMIN'].includes(user.userType));
          setEmployeeData(filteredUsers);
        } else {
          console.error('Erro ao buscar usuários:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };
    
    
    // API request to create user
    try {
      const url = `http://10.107.144.2:3000/auth/signup/${userType.toLowerCase()}`;
      const data = { name, email, userType, password };
  
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        const responseData = await response.json();
        console.log('Server response:', responseData);
  
        // Handle success response as needed
  
        // Close the modal after successful addition
        setIsOpen(false);
        fetchEmployeeData();
      } else {
        const errorResponse = await response.json();
        console.error('Failed to create user. Server response:', errorResponse);
  
        // Check for specific error message
        if (errorResponse.message === 'Uma conta com esse email já existe!' && errorResponse.statusCode === 401) {
          setErrorMessage(errorResponse.message);
          setErrorVisible(true);
        }
  
        // Handle other error responses as needed
      }
    } catch (error) {
      console.error('Error sending request:', error);
      // Handle other errors as needed
    }
  };


  
  const validateForm = () => {
    const errors = {
      name: !name.trim(),
      email: !email.trim(),
      password: !password.trim(),
      userType: !userType.trim(),
    };

    // Set state for validation errors
    setIsNameVazio(errors.name);
    setIsEmailVazio(errors.email);
    setIsPasswordVazio(errors.password);
    setIsUserTypeVazio(errors.userType);

    return Object.values(errors).every((error) => !error);
  };

  
  useEffect(() => {
    fetch('http://10.107.144.2:3000/users', {
      method: 'GET',
      headers: { Accept: 'application/json' },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredUsers = data.filter((user) => ['COLABORATOR', 'ADMIN'].includes(user.userType));
        setEmployeeData(filteredUsers);
      })
      .catch((error) => {
        console.error('Erro ao buscar os usuários:', error);
      });
  }, []);

 
  const openModalDelete = (userId) => {
    setUserToDelete(userId);
    setIsOpen(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setIsOpenModalDelete(false);
    setIsOpen(false);
  };



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://10.107.144.2:3000/users', {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          const filteredUsers = data.filter((user) => ['COLABORATOR', 'ADMIN'].includes(user.userType));
          setEmployeeData(filteredUsers);
        } else {
          console.error('Erro ao buscar usuários:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchData();
  }, []);

  const renderInput = (label, placeholder, onChange, error) => (
    <div className="mb-2">
      <label htmlFor="campo">{label}</label>
      <div className="pt-1">
        <input
          type="text"
          placeholder={placeholder}
          className="border rounded-lg border-gray p-2 w-full"
          onChange={(e) => {
            onChange(e.target.value);
            handleChange();
          }}
        />
      </div>
      {error && <span style={{ color: 'red' }}>Por favor, preencha {label.toLowerCase()}</span>}
    </div>
  );
  
  // Função auxiliar para renderizar o select do formulário
  const renderSelect = (label, value, onChange, error, options) => (
    <div className="mb-2">
      <label htmlFor="campo">{label}</label>
      <div className="pt-1">
        <div className="relative inline-flex h-11 w-2/5">
          <select
            value={value}
            onChange={(e) => {
              onChange(e.target.value);
              handleChange();
            }}
            className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
          >
            <option>Selecionar</option>
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
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
      {error && <span style={{ color: 'red' }}>Por favor, escolha o {label.toLowerCase()}</span>}
    </div>
  );
  
  // Função auxiliar para renderizar os botões do formulário
  const renderButtons = () => (
    <div className="flex justify-end h-16 gap-4">
      <button onClick={closeModal} className="border text-text h-11 py-2 px-4 rounded">
        Cancelar
      </button>
      <button onClick={handleSubmit} type="submit" className="bg-primary border-text border h-11 text-white py-2 px-4 rounded">
        Confirmar
      </button>
    </div>
  );

  return (
    <>
      <Layout>
      <div className="flex flex-col h-full bg-second">
        

        {/* Table Colaborador */}
        <div className="flex items-center justify-center h-full">
  <div className="flex justify-center items-center h-4/5 w-4/5">
    <div className="flex justify-center h-4/5 w-full bg-white text-text sm:rounded-lg">
      <div className="w-full flex items-center justify-center">
        <form className="w-full h-5/6 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead className="overflow-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                      <tr className="sticky top-0 bg-primary text-white">
                        <th scope="col" className="px-6 py-3">
                          ID
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Nome
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Tipo
                        </th>
                        <th scope="col" className="px-6 py-3">
                          Ações
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {employeeData.map((user) => (
                        <tr key={user.id} className="text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.userType}</td>
                          <td className="flex px-6 py-4 gap-3 items-center justify-around">
                            <IconEdit onClick={openModalEdit} color="#979797" width={24} height={24} />
                            <IconTrash onClick={() => openModalDelete(user.id)} color="#F15050" width={24} height={24} />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
        </form>
      </div>
    </div>
  </div>
</div>  
        <div className="flex items-center justify-center pb-6 h-1/4">
          <div className="flex h-4/5 w-4/5 items-end">
            <button onClick={openModal} className="h-11 w-80 rounded-md bg-primary">
              Cadastrar colaborador
            </button>
          </div>
        </div>`
{/* Modal de cadastro */}
{isOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-gradient">
    <div className="modal-container rounded-lg p-4 w-[680px] h-fit bg-white text-text">
      <div className="flex justify-end " >
        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="modal-content p-4 rounded-xl">
        <h2 className="text-xl font-bold my-6 mb-4">Cadastrar novo colaborador</h2>
        <form className="flex flex-col justify-between mt-8 ">
          {renderInput('Nome do colaborador', 'Nome', setName, isNameVazio)}
          {renderInput('Email do colaborador', 'Email', setEmail, isEmailVazio)}
          {renderInput('Senha', 'Senha', setPassword, isPasswordVazio, 'password')}
          {renderSelect('Tipo do colaborador', userType, setUserType, isUserTypeVazio, [
            { value: 'ADMIN', label: 'Admin' },
            { value: 'COLABORATOR', label: 'Colaborador' },
          ])}
          {renderButtons('Cancelar', 'Confirmar')}
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
        <h2 className="text-xl font-bold my-4">Editar colaborador</h2>
        <form className="fle flex-col justify-between">
          <div>
            <label className="" htmlFor="campo">
              Nome do colaborador
            </label>
            <div className="pt-1">
              <input
                type="text"
                placeholder={editableUser.name || 'Nome do colaborador'}
                id="name"
                className="border rounded-lg border-gray p-2 mb-4 w-full"
                value={editableUser.name || ''}
                onChange={(e) => setEditableUser({ ...editableUser, name: e.target.value })}
              />
            </div>
          </div>

          <div>
            <label htmlFor="campo">Email do colaborador</label>
            <div className="pt-1">
              <input
                type="text"
                placeholder={editableUser.email || 'Email do colaborador'}
                id="email"
                className="border rounded-lg border-gray p-2 mb-4 w-full"
                value={editableUser.email || ''}
                onChange={(e) => setEditableUser({ ...editableUser, email: e.target.value })}
              />
            </div>
          </div>

          <div className='mb-5'>
            <label htmlFor="campo">Tipo do colaborador</label>
            <div className="pt-1">
              <div className="relative inline-flex h-11 w-2/5">
                <select
                  className="appearance-none bg-white border border-gray rounded-md min-w-full pl-3 pr-10  py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm"
                  value={editableUser.userType || ''}
                  onChange={(e) => setEditableUser({ ...editableUser, userType: e.target.value })}
                >
                  <option>Tipo 1</option>
                  <option>Tipo 2</option>
                  <option>Tipo 3</option>
                  <option>Tipo 4</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end h-16 gap-4 ">
            <button
              onClick={closeModalEdit}
              className="border text-text h-11 py-2 px-4 rounded ">
              Cancelar
            </button>
            <button
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


        </div>
      </Layout>
    </>

  )
};