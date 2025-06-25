import { CLICommand } from "./command.js";

export function commandHelp(commands: Record<string, CLICommand>) {
  console.log("Welcome to Pokedex!");
  console.log("Usage:\n");

  for (const cmd in commands) {
    console.log(`${commands[cmd].name}: ${commands[cmd].description}`);
  }
}
