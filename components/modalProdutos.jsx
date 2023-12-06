import React, { useState } from 'react';

const App = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
        <div className="flex items-center justify-center h-screen">
            <button onClick={openModal} className="bg-blue-500 text-white py-2 px-4 rounded">
                Abrir Modal
            </button>
            {modalOpen && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="modal">
                        <div className="modal-content">
                            <h2 className="text-xl font-bold mb-4">Meu Modal</h2>
                            <form>
                                <label htmlFor="campo">Campo:</label>
                                <input
                                    type="text"
                                    id="campo"
                                    className="border border-gray-400 p-2 mb-4"
                                />
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-4 rounded"
                                >
                                    Enviar
                                </button>
                            </form>
                            <button
                                onClick={closeModal}
                                className="bg-red-500 text-white py-2 px-4 rounded mt-4"
                            >
                                Fechar Modal
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
        </>
    );
};

export default App;
