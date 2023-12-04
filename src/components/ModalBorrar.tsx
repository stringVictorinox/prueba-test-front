"use client";

export default function ModalBorrar({ itsActive, setItsActive, id, deletePokemon }) {

    const DeletePokemon = (): void => {
        deletePokemon(id);
        setItsActive(false);
    }

    if (itsActive) {
        return (
            <div className="fixed inset-0 flex items-center justify-center z-10 backdrop-blur confirm-dialog">
                <div className="relative px-4 min-h-screen flex items-center justify-center">
                    <div className="w-full h-full absolute z-50 opacity-75 inset-0 transition-opacity"></div>
                    <div className="bg-white border border-gray-400 rounded-lg max-w-md mx-auto p-4 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 w-full relative shadow-lg">
                        <div className="md:flex items-center">
                            <div className="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
                                <i className="bx bx-error text-3xl text-red-300">
                                    &#9888;
                                </i>
                            </div>
                            <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                                <p className="font-bold">¡Advertencia!</p>
                                <p className="text-sm text-gray-700 mt-1">Perderá todos los datos al eliminar esto. Esta acción no se puede deshacer.
                                </p>
                            </div>
                        </div>
                        <div className="text-center md:text-right mt-4 md:flex md:justify-end">
                            <button onClick={() => setItsActive(false)} id="confirm-delete-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-red-200 hover:bg-red-300 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2">
                                Cancelar
                            </button>
                            <button onClick={() => DeletePokemon()} id="confirm-cancel-btn" className="block w-full md:inline-block md:w-auto px-4 py-3 md:py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-semibold text-sm mt-4 md:mt-0 md:order-1">
                                Eliminar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

