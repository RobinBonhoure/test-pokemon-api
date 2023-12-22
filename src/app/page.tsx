'use client';

import { useState, useEffect } from 'react';
import { fetchAPI } from '../utils/fetch';
import Link from "next/link";

export default function Home() {

  // data to show pokemon
  interface Data {
    results: Array<{
      url: string; name: string
    }>;
  }
  const initialData: Data = {
    results: []
  };
  const [data, setData] = useState<Data | null>(initialData);

  // pokemon details for types
  interface PokemonType {
    type: {
      name: string,
    };
  }
  interface PokemonDetail {
    name: string;
    id: number;
    types: PokemonType[];
  }
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetail[]>([]);


  // data to show pokemon
  useEffect(() => {
    const fetchData = async (url: string) => {
      try {
        const result = await fetchAPI(url);
        setData(result);
        console.log(result)
      } catch (error) {
        console.error(error);
      }
    };

    fetchData('https://pokeapi.co/api/v2/pokemon/?offset=6&limit=6');

  }, []);

  // pokemon details for types
  const fetchPokemonDetails = async (url: string) => {
    try {
      const response = await fetchAPI(url);
      const pokemonDetail = response;
      setPokemonDetails((prevDetails) => [...prevDetails, pokemonDetail]);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (data) {
      // Fetch details for each Pokemon
      data.results.forEach((pokemon) => {
        fetchPokemonDetails(pokemon.url);
      });
    }
  }, [data]);

  return (
    <div>
      <h1>Pokemon overview</h1>
      {data ? (
        <div className='card-container'>
          {data.results.map((item, index) => (
            <div className='card' key={index}>
              <h3 className='card-title'>{item.name}</h3>
              {pokemonDetails &&
                <ul className="types">
                  {
                    pokemonDetails.find((detail) => detail.name === item.name)?.types.map((item, index) => (
                      <li key={index}>{item.type.name}</li>
                    ))
                  }
                </ul>
              }
              <Link className="bouton" href={`${'/pokemon/' + item.name + '?id=' + pokemonDetails.find((detail) => detail.name === item.name)?.id}`}>
                Voir
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
};