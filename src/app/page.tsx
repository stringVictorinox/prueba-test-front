"use client";

import { useState } from "react";
import Header from "@/components/header";
import ModalBorrar from "@/components/ModalBorrar";
import ModalEdit from "@/components/ModalEdit";
import { usePokedexData } from "@/custom-hooks/usePokedexData";

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {

  // Custom Hook que nos trae toda la información de los Pokémon.
  const { 
    pokedexData,
    createPokemon, deletePokemon, editPokemon, getPokemonWithMaxExp, getPokemonWithMaxHeight, getPokemonWithMaxWeight,
    error, loading } = usePokedexData();

  // Estados para manejar el abrir y cerrar los modales de 'Editar Pokémon' y 'Borrar Pokémon'.
  const [itsActive, setItsActive] = useState<boolean>(false);
  const [itsActive2, setItsActive2] = useState<boolean>(false);

  // Estados para mandar a eliminar o editar un Pokémon.
  const [id, setId] = useState<number>(0);
  const [pokemon, setPokemon] = useState({});

  const maxExpPokemon = getPokemonWithMaxExp();
  const maxHeightPokemon = getPokemonWithMaxHeight();
  const maxWeightPokemon = getPokemonWithMaxWeight();

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = pokedexData.slice(firstIndex, lastIndex);
  const npage = Math.ceil(pokedexData.length / recordsPerPage);
  const numbers = [...Array(Number(npage) + 1).keys()].slice(1);

  // Funciones para manejar el paginado a una pagina anterior y siguiente; y cambiar de página.

  const prePage = () => {

    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < npage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = (id: number) => {
    setCurrentPage(id);
  }

  // Funciones para abrir los modales de Borrar Pokémon y Editar Pokémon.

  const openDelete = (id: number): void => {
    setId(id);
    setItsActive(true);
  }

  const openEdit = (pokemon: object): void => {
    setPokemon(pokemon);
    setItsActive2(true);
  }

  // Carga un loader mientras todavía no carga la información de los Pokémon.
  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="wrapper">
          <div className="pokeball"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">

      <Header createPokemon={createPokemon} error={error} />

      <div className="px-6 mt-2">
        <h1 className="text-md font-bold text-gray-600">
          Pokémon que gana más experiencia: <span className="text-red-500">{maxExpPokemon?.name} con {maxExpPokemon?.experience}</span>
        </h1>
        <h1 className="text-md font-bold text-gray-600">
          Pokémon que tiene más altura: <span className="text-green-500">{maxHeightPokemon?.name} con {maxHeightPokemon?.height}</span>
        </h1>
        <h1 className="text-md font-bold text-gray-600">
          Pokémon que tiene más peso:  <span className="text-yellow-500">{maxWeightPokemon?.name} con {maxWeightPokemon?.weight}</span>
        </h1>
      </div>

      <div className="px-5">
        <table className="w-full mx-auto overflow-auto mt-6 text-gray-800 shadow-lg shadow-gray-400">
          <thead className="bg-gray-400">
            <tr>
              <th className="w-1/12">ID</th>
              <th className="w-1/6">Nombre</th>
              <th className="w-1/12">Altura</th>
              <th className="w-1/12">Peso</th>
              <th className="w-1/12">Exp</th>
              <th className="w-1/6">Accción</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {records.map((pokemon) => (
              <tr key={pokemon.id} className="border-b-2 border-gray-300 h-10 text-gray-600">
                <td className="font-bold text-blue-500 hover:underline">{pokemon.id}</td>
                <td className="whitespace-nowrap overflow-hidden overflow-ellipsis">{pokemon.name}</td>
                <td className="">{pokemon.height}</td>
                <td className="">{pokemon.weight}</td>
                <td className="">{pokemon.experience}</td>
                <td className="flex gap-x-4 justify-center items-center h-10">
                  <button onClick={() => openEdit(pokemon)} className="rounded-xl bg-green-200 border border-green-400 hover:bg-green-300 text-green-700 px-4">Editar</button>
                  <button onClick={() => openDelete(pokemon.id)} className="rounded-xl bg-red-200 border border-red-400 hover:bg-red-300 text-red-700 px-4">Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <nav className="flex w-full justify-center mt-8" aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">

          <button onClick={() => prePage()} className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Previous</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
            </svg>
          </button>

          {numbers.map((n, i) => (
            <li key={i}>
              <button onClick={() => changePage(n)} className={`${currentPage === n ? 'bg-gray-300 font-semibold' : 'bg-white'} flex items-center justify-center
                px-3 h-8 leading-tight border border-gray-300 hover:text-gray-700`}>{n}</button>
            </li>
          ))}

          <button onClick={() => nextPage()} className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700">
            <span className="sr-only">Next</span>
            <svg className="w-2.5 h-2.5 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
            </svg>
          </button>

        </ul>
        <ModalBorrar itsActive={itsActive} setItsActive={setItsActive} id={id} deletePokemon={deletePokemon} />
        <ModalEdit itsActive={itsActive2} setItsActive={setItsActive2} pokemon={pokemon} editPokemon={editPokemon} />
      </nav>
      
    </div>
  );
};

export default Home;
