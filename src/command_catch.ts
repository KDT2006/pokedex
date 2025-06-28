import { State } from "./state";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length !== 1) {
    throw new Error("you must provide a pokemon name");
  }

  const name = args[0];
  console.log(`Throwing a Pokeball at ${name}`);
  const pokemon = await state.pokeApi.fetchPokemon(name);

  const res = Math.random() * pokemon.base_experience;
  if (res > 40) {
    console.log(`${pokemon.name} escaped!`);
    return;
  }

  console.log(`${pokemon.name} was caught!`);
  console.log("You may now inspect it with the inspect command.");
  state.caughtPokemon[pokemon.name] = pokemon;
}
