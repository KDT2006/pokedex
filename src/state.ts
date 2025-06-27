import { createInterface, Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI, Pokemon } from "./pokeapi.js";

export type State = {
  readInterface: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  caughtPokemon: Record<string, Pokemon>;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export function initState(cacheInterval: number): State {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    commands: getCommands(),
    readInterface: r1,
    pokeApi: new PokeAPI(cacheInterval),
    caughtPokemon: {},
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
