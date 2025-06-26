import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  var state = initState();

  await startREPL(state);
}

main();
