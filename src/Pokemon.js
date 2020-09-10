import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { Typography, CircularProgress } from "@material-ui/core";
import toFirstCharUppercase from "./constants";
import axios from "axios";

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemonData, setPokemonData] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then((response) => {
        const { data } = response;
        setPokemonData(data);
      })
      .catch((error) => {
        setPokemonData(false);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, species, height, weight, types, sprites } = pokemonData;
    const fullImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    const { front_default } = sprites;
    return (
      <>
        <Link href={"http://localhost:3000/"}>Back to Pokedex</Link>
        <Typography variant="h1">
          {`${id}.`} {toFirstCharUppercase(name)}
          <img src={front_default} alt="front_default_sprite" />
        </Typography>
        <img
          style={{ width: "300px", height: "300px" }}
          alt="front_default"
          src={fullImageURL}
        />
        <Typography variant="h3">Pokemon info</Typography>
        <Typography>
          {"Species: "}
          <Link href={species.url}>{toFirstCharUppercase(species.name)}</Link>
        </Typography>
        <Typography>Height: {height}</Typography>
        <Typography>Weight: {weight}</Typography>
        <Typography variant="h6">Type(s): </Typography>
        {types.map((typeInfo) => {
          const { type } = typeInfo;
          const { name } = type;
          return (
            <Typography key={name}>{`${toFirstCharUppercase(
              name
            )}`}</Typography>
          );
        })}
      </>
    );
  };
  if (pokemonData === undefined) return <CircularProgress />;
  if (pokemonData) return generatePokemonJSX();
  else
    return (
      <>
        <h3>Pokemon data not found</h3>
        <Link href={"http://localhost:3000/"}>Back to Pokedex</Link>
      </>
    );
};

export default Pokemon;
