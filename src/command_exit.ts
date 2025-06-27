import { State } from "./state.js";

export async function commandExit(state: State) {
  console.log("Closing the Pokedex... Goodbye!");
  state.readInterface.close();
  state.pokeCache.stopReadLoop();
  process.exit(0);
}
