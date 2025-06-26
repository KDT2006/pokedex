import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  let splitArray = [];
  const inputSplit = input.trim().split(" ");
  for (let split of inputSplit) {
    splitArray.push(split.toLowerCase());
  }

  return splitArray;
}

export function startREPL(state: State) {
  state.readInterface.prompt();

  state.readInterface.on("line", (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      state.readInterface.prompt();
    }

    if (input[0] in state.commands) {
      try {
        state.commands[input[0]].callback(state);
        state.readInterface.prompt();
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error occurred in callback:", err);
        }
      }
    } else {
      console.log("Unknown command");
      state.readInterface.prompt();
    }
  });
}
