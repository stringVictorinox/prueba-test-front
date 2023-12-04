"use client";

import { useState, useEffect } from 'react';

const ModalEdit: React.FC<ModalEditProps> = ({ itsActive, setItsActive, pokemon, editPokemon }) => {

    const [formData, setFormData] = useState({
        name: "",
        height: "",
        weight: "",
        experience: ""
    });

    useEffect(() => {
        setFormData({
            name: pokemon.name,
            height: pokemon.height,
            weight: pokemon.weight,
            experience: pokemon.experience,
        });
    }, [pokemon]);

    const closeModal = () => {
        setItsActive(false);
    }

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCreateClick = () => {

        editPokemon(pokemon.id, formData);

        setItsActive(false);

        // Reiniciar el estado
        setFormData({
            name: "",
            height: "",
            weight: "",
            experience: ""
        });
    }

    if (itsActive) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur confirm-dialog">
                <div className="relative px-4 min-h-screen flex items-center justify-center">
                    <div className="w-full h-full absolute z-50 opacity-75 inset-0 transition-opacity"></div>
                    <div className="bg-white border border-gray-400 rounded-lg max-w-md mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 w-full relative shadow-lg">

                        <h1 className='block uppercase tracking-wide text-gray-700 font-bold text-center'>Editar Pokémon</h1>

                        <div className="flex flex-col items-center">

                            <div className="w-full px-3 mb-0 mt-4">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="grid-first-name">
                                    Nombre
                                </label>
                                <input
                                    className="appearance-none w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    type="text"
                                    placeholder=""
                                />
                            </div>

                            <div className="flex flex-row mt-4">

                                <div className="w-full md:w-1/3 px-3 mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="grid-first-name">
                                        Altura
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                        px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        placeholder=""
                                    />

                                </div>

                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="grid-first-name">
                                        Peso
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3
                                        px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        placeholder=""
                                    />
                                </div>

                                <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-1" htmlFor="grid-first-name">
                                        Exp
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border
                                        border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                        type="text"
                                        name="experience"
                                        value={formData.experience}
                                        onChange={handleChange}
                                        placeholder="" />
                                </div>

                            </div>
                        </div>

                        <div className="text-center md:text-right mt-0 sm:mt-6 md:flex md:justify-end">
                            <button onClick={() => closeModal()} className="block w-full md:inline-block md:w-auto px-4 py-3
                            md:py-2 bg-red-200 hover:bg-red-300 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                Cancelar
                            </button>
                            <button onClick={() => handleCreateClick()} className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2
                            bg-green-200 hover:bg-green-300 text-green-700 rounded-lg font-semibold text-sm mt-2 md:mt-0 md:order-1">
                                Crear
                            </button>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default ModalEdit;
