import { Location } from "./pokeapi";
import { State } from "./state";

export async function commandExplore(state: State, area: string) {
  if (area === "") {
    throw new Error("Error invalid area argument for Explore command");
  }

  const cacheHit = state.pokeCache.get(area);
  let pokemon: Location;
  if (cacheHit) {
    pokemon = cacheHit;
  } else {
    pokemon = await state.pokeApi.fetchLocation(area);
    state.pokeCache.add(area, pokemon);
  }

  console.log("Exploring pastoria-city-area...");
  console.log("Found Pokemon:");
  for (const enc of pokemon.pokemon_encounters) {
    console.log("- " + enc.pokemon.name);
  }
}
