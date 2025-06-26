import { createInterface, Interface } from "readline";
import { getCommands } from "./commands.js";

export type State = {
  readInterface: Interface;
  commands: Record<string, CLICommand>;
};

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State) => void;
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
  };
}
