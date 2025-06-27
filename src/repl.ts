import { State } from "./state.js";

export async function startREPL(state: State) {
  state.readInterface.prompt();

  state.readInterface.on("line", async (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      state.readInterface.prompt();
      return;
    }

    const commandName = input[0];
    const args = input.slice(1);

    const cmd = state.commands[commandName];
    if (!cmd) {
      console.log("Unknown command: ", commandName);
      state.readInterface.prompt();
      return;
    }

    try {
      await cmd.callback(state, ...args);
    } catch (err) {
      console.error("Error occurred in callback:", (err as Error).message);
    }

    state.readInterface.prompt();
  });
}

export function cleanInput(input: string): string[] {
  let splitArray = [];
  const inputSplit = input.trim().split(" ");
  for (let split of inputSplit) {
    splitArray.push(split.toLowerCase());
  }

  return splitArray;
}
