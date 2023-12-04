// customHooks/usePokedexData.js
import { useEffect, useState } from "react";

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  experience: number;
  // Otros campos según tu estructura de datos
}

export const usePokedexData = () => {

  const [pokedexData, setPokedexData] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch(`https://prueba-test-backend-production.up.railway.app/pokedex`);
        const data: Pokemon[] = await response.json();
        setPokedexData(data);
      } catch (error) {
        setError('Error al obtener datos de la Pokédex');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const createPokemon = (pokemon: Pokemon) => {

    try {

      // Verificar si el nombre ya existe en la pokedexData
      const isNameExists = pokedexData.some((p) => p.name.toLowerCase() === pokemon.name.toLowerCase());

      if (isNameExists) {
        return false;
      } else {
        // Obtener el máximo ID actual
        const maxId = pokedexData.reduce((max, p) => (p.id > max ? p.id : max), 0);

        // Asignar un nuevo ID al nuevo Pokémon
        pokemon.id = maxId + 1;

        // Agregar el nuevo Pokémon a la pokedexData
        setPokedexData([...pokedexData, pokemon]);

        // Limpiar el error (si existe)
        setError("");
      }
    } catch (error) {
      setError('Error al crear el Pokémon');
    }
  };

  const editPokemon = (pokemonId: number, updatedPokemon: Pokemon) => {
    try {
      // Buscar el índice del Pokémon que se va a actualizar
      const index = pokedexData.findIndex((p) => p.id === pokemonId);

      if (index !== -1) {
        // Actualizar el Pokémon en la pokedexData
        const updatedData = [...pokedexData];
        updatedData[index] = { ...updatedData[index], ...updatedPokemon };
        setPokedexData(updatedData);
        setError("");
      } else {
        setError("Pokémon no encontrado para editar");
      }
    } catch (error) {
      setError("Error al editar el Pokémon");
    }
  };

  const deletePokemon = (pokemonId: number) => {
    try {
      setPokedexData((prevData) => prevData.filter((pokemon) => pokemon.id !== pokemonId));
    } catch (error) {
      setError('Error al eliminar el Pokémon');
    }
  };

  // Función para obtener el Pokémon con más experiencia.
  const getPokemonWithMaxExp = () => {
    try {
      const maxExpPokemon = pokedexData.reduce((maxExpPokemon, currentPokemon) => {
        return currentPokemon.experience > maxExpPokemon.experience ? currentPokemon : maxExpPokemon;
      }, pokedexData[0]);

      return maxExpPokemon;
    } catch (error) {
      setError("Error al obtener el Pokémon con más experiencia");
    }
  };

  // Función para obtener el Pokémon con la altura más alta.
  const getPokemonWithMaxHeight = () => {
    try {
      const maxHeightPokemon = pokedexData.reduce((maxHeightPokemon, currentPokemon) => {
        return currentPokemon.height > maxHeightPokemon.height ? currentPokemon : maxHeightPokemon;
      }, pokedexData[0]);

      return maxHeightPokemon;
    } catch (error) {
      setError("Error al obtener el Pokémon con la altura más alta");
    }
  };

  // Función para obtener el Pokémon con el peso más alto.
  const getPokemonWithMaxWeight = () => {
    try {
      const maxWeightPokemon = pokedexData.reduce((maxWeightPokemon, currentPokemon) => {
        return currentPokemon.weight > maxWeightPokemon.weight ? currentPokemon : maxWeightPokemon;
      }, pokedexData[0]);

      return maxWeightPokemon;
    } catch (error) {
      setError("Error al obtener el Pokémon con el peso más alto");
    }
  };


  return { pokedexData, error, createPokemon, deletePokemon, editPokemon, getPokemonWithMaxExp,
            getPokemonWithMaxHeight, getPokemonWithMaxWeight, loading };
};
