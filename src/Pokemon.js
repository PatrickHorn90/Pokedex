import React, { useState, useEffect } from "react";
import Link from "@material-ui/core/Link";
import { Typography, CircularProgress } from "@material-ui/core";
import toFirstCharUppercase from "./constants";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  pokemonContainer: {
    alignItems: "center",
    borderWidth: "3px",
    borderColor: "black",
    borderStyle: "solid",
    borderRadius: "60%",
    display: "flex",
    flexDirection: "column",
    margin: "10px",
    width: "50%",
    height: "500px",
  },
  cardContents: {
    alignItems: "center",
    display: "flex",
    marginTop: "15px",
  },
  cardLeftSide: {},
  cardRightSide: {},
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
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link style={{ margin: "10px" }} href={"http://localhost:3000/"}>
          Back to Pokedex
        </Link>
        <div className={classes.pokemonContainer}>
          <Typography variant="h2" style={{ marginTop: "30px" }}>
            {`${id}.`} {toFirstCharUppercase(name)}
          </Typography>
          <div className={classes.cardContents}>
            <div className={classes.cardLeftSide}>
              <img
                style={{ width: "300px", height: "300px" }}
                alt="front_default"
                src={fullImageURL}
              />
            </div>
            <div className={classes.cardRightSide}>
              <Typography variant="h3">Pokemon Info</Typography>
              <Typography>
                {"Species: "}
                <Link href={species.url}>
                  {toFirstCharUppercase(species.name)}
                </Link>
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
          </div>
        </div>
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
