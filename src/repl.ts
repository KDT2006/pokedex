import { createInterface } from "node:readline";
import { getCommands } from "./commands.js";

export function cleanInput(input: string): string[] {
  let splitArray = [];
  const inputSplit = input.trim().split(" ");
  for (let split of inputSplit) {
    splitArray.push(split.toLowerCase());
  }

  return splitArray;
}

export function startREPL() {
  const r1 = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Pokedex > ",
  });
  r1.prompt();

  r1.on("line", (line) => {
    const input = cleanInput(line);
    if (input.length === 0) {
      r1.prompt();
    }

    const commands = getCommands();
    if (input[0] in commands) {
      try {
        commands[input[0]].callback(commands);
        r1.prompt();
      } catch (err) {
        if (err instanceof Error) {
          console.error("Error occurred in callback:", err);
        }
      }
    } else {
      console.log("Unknown command");
      r1.prompt();
    }
  });
}
