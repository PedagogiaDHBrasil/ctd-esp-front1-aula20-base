import { FC, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getPokemon } from "../queries/pokemon.queries";
import { useDispatch, useSelector } from "react-redux";
import { IRootState } from "../store/store";
import { Pokemon, PokemonWithProps } from "../types/pokemon.types";
import { adicionarRegistroPokemon } from "../actions/pokemonActions";

type VerPokemonDetalheProps = {
  pokemonSelecionado: Pokemon;
};

const VerPokemonDetalhe: FC<VerPokemonDetalheProps> = ({
  pokemonSelecionado,
}: VerPokemonDetalheProps) => {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [pokemon, setPokemon] = useState<PokemonWithProps | null>(null);

  useEffect(() => {
    if (pokemonSelecionado) {
      setLoading(true);
      getPokemon(pokemonSelecionado.name).then((data) => {
        setPokemon(data);
        setLoading(false);
        dispatch(adicionarRegistroPokemon(data));
      });
    }
  }, [pokemonSelecionado, pokemonSelecionado?.name]);

  if (isLoading) return <div>Carregando Pokémon...</div>;

  return pokemon ? (
    <div className="verPokemon">
      <h4>Pokemon: {pokemon.name}</h4>
      <h5>#{pokemon.id}</h5>
      <img src={pokemon.sprites.other.home.front_default} alt={pokemon.name} />
    </div>
  ) : null;
};

const VerPokemon = () => {
  // Usamos useQuery para pegar o pokemon que vem do redux
  // @ts-ignore
  const pokemonSelecionado = useSelector<IRootState, Pokemon | null>(
    (state) => state.pokemon.pokemonSelecionado
  );
  if (!pokemonSelecionado) return <div className="verPokemon" />;
  //
  return <VerPokemonDetalhe pokemonSelecionado={pokemonSelecionado} />;
};

VerPokemon.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
};

export default VerPokemon;
