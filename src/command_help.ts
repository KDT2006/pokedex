import { State } from "./state.js";

export function commandHelp(state: State) {
  console.log("Welcome to Pokedex!");
  console.log("Usage:\n");

  for (const cmd in state.commands) {
    console.log(
      `${state.commands[cmd].name}: ${state.commands[cmd].description}`
    );
  }
}
