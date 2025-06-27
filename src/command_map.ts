import { ShallowLocations } from "./pokeapi.js";
import { State } from "./state.js";

export async function commandMap(state: State) {
  const cacheHit = state.pokeCache.get(state.nextLocationsURL);
  let locations: ShallowLocations;
  if (cacheHit) {
    locations = cacheHit;
  } else {
    locations = await state.pokeApi.fetchLocations(state.nextLocationsURL);
    state.pokeCache.add(state.nextLocationsURL, locations);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}

export async function commandMapBack(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("you're on the first page");
  }

  const cacheHit = state.pokeCache.get(state.prevLocationsURL);
  let locations: ShallowLocations;
  if (cacheHit) {
    locations = cacheHit;
  } else {
    locations = await state.pokeApi.fetchLocations(state.prevLocationsURL);
    state.pokeCache.add(state.prevLocationsURL, locations);
  }

  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;

  for (const loc of locations.results) {
    console.log(loc.name);
  }
}
