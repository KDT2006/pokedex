import { createInterface, Interface } from "readline";
import { getCommands } from "./commands.js";
import { PokeAPI } from "./pokeapi.js";
import { Cache } from "./pokecache.js";

export type State = {
  readInterface: Interface;
  commands: Record<string, CLICommand>;
  pokeApi: PokeAPI;
  pokeCache: Cache;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => Promise<void>;
};

export function initState(): State {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });

  return {
    commands: getCommands(),
    readInterface: r1,
    pokeApi: new PokeAPI(),
    pokeCache: new Cache(60000),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
