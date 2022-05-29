import { useEffect, useState } from "react";
import ListarPokemonsItem from "./ListarPokemonsItem";
import { buscarPokemons } from "../queries/pokemon.queries";
import { Pokemon } from "../types/pokemon.types";
import { extractPokemonId } from "../services/pokemon.services";
import { useDispatch, useSelector } from "react-redux";
import { selecionarPokemon } from "../actions/pokemonActions";
import { IRootState } from "../store/store";

/**
 * Visualizar uma lista de pokemons
 *
 * Ex:
 * <pre>
 *     <ListarPokemons />
 *
 * </pre>
 *
 * @author Digital House
 */
const ListarPokemons = () => {
  const procurar = useSelector<IRootState, string>(
    (state) => state.pokemon.procurar
  );
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pokemons, setPokemons] = useState<Pokemon[]>([]);

  useEffect(() => {
    if (procurar) {
      setLoading(true);
      buscarPokemons(procurar).then((data) => {
        setPokemons(data);
        setLoading(false);
      });
    }
  }, [procurar]);

  const onSelecionarPokemon = (pokemon: Pokemon) => {
    dispatch(selecionarPokemon(pokemon));
  };

  if (isLoading) return <div>Carregando Pokémon...</div>;
  return (
    <div className="listar">
      {pokemons &&
        pokemons.map((pokemon: Pokemon) => (
          <ListarPokemonsItem
            pokemon={pokemon}
            selecionarPokemon={onSelecionarPokemon}
            key={extractPokemonId(pokemon.url)}
          />
        ))}
    </div>
  );
};

export default ListarPokemons;
