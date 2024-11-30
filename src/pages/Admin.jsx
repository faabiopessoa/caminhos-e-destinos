import React, { useState } from 'react';

const RegistrationForm = () => {
    const [destination, setDestination] = useState('');
    const [foto, setFoto] = useState('');
    const [description, setDescription] = useState('');
    const [preco, setPreco] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!destination || !foto || !description) {
            setError('Please fill in all fields');
            return;
        }
    
        const formData = new FormData();
        formData.append('nome', destination);
        formData.append('preco', preco);
        formData.append('descricao', description);
        formData.append('foto', foto); 
    
        try {
            const response = await fetch('http://localhost:3000/tourist-spots', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Failed to register travel');
            }
    
            const data = await response.json();
            console.log(data);
            setError('');
         
            setDestination('');
            setFoto('');
            setDescription('');
            setPreco('');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="container mx-auto p-4 pt-6 mt-10">
            <h1 className="text-3xl mb-4">Travel Registration</h1>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
                <label className="block mb-2">
                    Destino:
                    <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                        placeholder="Digite o nome do Destino Turístico"
                    />
                </label>
                <label className="block mb-2">
                    Preço:
                    <input
                        type="number"
                        value={preco}
                        onChange={(e) => setPreco(e.target.value)}
                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                        placeholder="Digite o preço"
                    />
                </label>
                <label className="block mb-2">
                    Descrição:
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                        placeholder="Coloque uma descrição sobre o destino"
                    />
                </label>
                <label className="block mb-2">
                    Foto:
                    <input
                        type="file"
                        onChange={(e) => setFoto(e.target.files[0])} 
                        className="block w-full p-2 mb-2 border border-gray-300 rounded"
                    />
                </label>
                <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Register Travel
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;