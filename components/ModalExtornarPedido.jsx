export default function ModalExtornarPedido({nome,total}) {

    return(
    <>
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
                                      <input
                                        id={`checkbox-${index}`}
                                        type="checkbox"
                                        value={product.product.name} // ou qualquer outra propriedade que você queira usar
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                      />
                                      <label
                                        htmlFor={`checkbox-${index}`}
                                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                      >
                                        {product.product.name}
                                      </label>

                                      <span>{product.total_value}</span>
                                    </div>
                       ))}

                      </div>
                      <span>Total <span>{dadosDaAPI.total}</span></span>

                      <div className="flex justify-end h-16 gap-4 ">
                        <button
                          onClick={closeModal}
                          className="border text-text h-11 py-2 px-4 rounded ">
                          Cancelar
                        </button>
                        <button

                          type="submit"
                          className="bg-primary border-text border h-11 text-white py-2 px-4 rounded"

                          >
                        Confirmar
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
    </>
    )
}
