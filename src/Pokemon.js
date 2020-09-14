import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { Typography, CircularProgress } from "@material-ui/core";
import toFirstCharUppercase from "./constants";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  pokemonContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const Pokemon = (props) => {
  const { match } = props;
  const { params } = match;
  const { pokemonId } = params;
  const [pokemonData, setPokemonData] = useState(undefined);

  const classes = useStyles();

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
    const { name, id, species, height, weight, types } = pokemonData;
    const fullImageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;

    return (
      <div className={classes.pokemonContainer}>
        <Link href={"http://localhost:3000/"}>Back to Pokedex</Link>
        <Typography variant="h2">
          {`${id}.`} {toFirstCharUppercase(name)}
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
      </div>
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
