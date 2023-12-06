// import React from "react";
// import Image from "next/image";
// import { IconEdit } from '@tabler/icons-react';
// import { IconTrash } from '@tabler/icons-react';
// import ImageTeste from "../components/icons/images/imagemFruta.png";

// const TableProdutos = (props, type) => {
//     if (props.Type == 'tableProdutos') {
//         return (
//             <>

//                 <div className='flex justify-center  items-center h-4/5 w-4/5 pl-16 pr-16 rounded-lg shadow-shadow-button bg-white text-text '>
//                     <div className='flex  justify-center h-5/6 w-full bg-white text-text'>
//                         {/* div da tabela */}
//                         <div className='w-full flex items-center justify-center'>

//                             <div className=" w-full h-4/5 relative overflow-x-auto shadow-md sm:rounded-lg">
//                                 <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
//                                     <thead className="overflow-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                                         <tr className='sticky top-0 bg-primary text-white'>
//                                             <th scope="col" className=" px-6 py-3">
//                                                 Foto
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 ID Produto
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Nome
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Preço
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Disponibilidade
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Ações
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr className=" text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                             <td scope="row" className="px-6 py-4">
//                                                 <span className="items-center justify-center w-[38px] h-[38px]">
//                                                     <Image className="rounded-full" src={ImageTeste} alt="imagem teste" height={38} width={38} />
//                                                 </span>

//                                             </td>
//                                             <td className="px-6 py-4 ">
//                                                 1
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 Salgado Assado
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 R$5,50
//                                             </td>
//                                             <td className="px-6 py-4 text-right">
//                                                 <div className="relative inline-flex">
//                                                     <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm">
//                                                         <option>Sim</option>
//                                                         <option>Não</option>
//                                                     </select>
//                                                     <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                                                         <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//                                                     </div>
//                                                 </div>
//                                             </td>
//                                             <td className='flex px-6 py-4  gap-3 items-center justify-around'>
//                                                 <IconEdit color='#979797' width={24} height={24} />
//                                                 <IconTrash color='#F15050' width={24} height={24} />
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     } else if (props.Type == 'tableColaborador') {
//         return (
//             <>
//                 <div className='flex justify-center  items-center h-4/5 w-4/5 pl-16 pr-16 rounded-lg shadow-shadow-button bg-white text-text '>
//                     <div className='flex  justify-center h-5/6 w-full bg-white text-text'>
//                         {/* div da tabela */}
//                         <div className='w-full flex items-center justify-center'>

//                             <div className=" w-full h-4/5 relative overflow-x-auto shadow-md sm:rounded-lg">
//                                 <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
//                                     <thead className="overflow-auto text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//                                         <tr className='sticky top-0 bg-primary text-white'>
//                                             <th scope="col" className="px-6 py-3">
//                                                 ID
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Nome
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Email
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Tipo
//                                             </th>
//                                             <th scope="col" className="px-6 py-3">
//                                                 Ações
//                                             </th>
//                                         </tr>
//                                     </thead>
//                                     <tbody>
//                                         <tr className=" text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                                             <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
//                                                 1
//                                             </th>
//                                             <td className="px-6 py-4 ">
//                                                 Beatriz Landi
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 Beatriz.landi.coelho@gmail.com
//                                             </td>
//                                             <td className="px-6 py-4">
//                                                 Colaborador
//                                             </td>
//                                             <td className='flex px-6 py-4  gap-3 items-center justify-around'>
//                                                 <IconEdit color='#979797' width={24} height={24} />
//                                                 <IconTrash color='#F15050' width={24} height={24} />
//                                             </td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             </>
//         );
//     };

// };

// export const RowTable = (props) => {

//     return (
//         <>
//             <tr className=" text-sm font-medium dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td scope="row" className="px-6 py-4">
//                     {props.cellContent}
//                 </td>

//                 <td className="px-6 py-4 text-right">
//                     <div className="relative inline-flex">
//                         <select className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 focus:outline-none focus:ring focus:border-blue-500 sm:text-sm">
//                             <option>Sim</option>
//                             <option>Não</option>
//                         </select>
//                         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
//                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
//                         </div>
//                     </div>
//                 </td>
//                 <td className='flex px-6 py-4  gap-3 items-center justify-around'>
//                     <IconEdit color='#979797' width={24} height={24} />
//                     <IconTrash color='#F15050' width={24} height={24} />
//                 </td>
//             </tr>
//         </>
//     );

// };

// export default TableProdutos;
