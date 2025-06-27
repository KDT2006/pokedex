import { startREPL } from "./repl.js";
import { initState } from "./state.js";

async function main() {
  var state = initState(1000 * 60 * 5); // 5 min
  await startREPL(state);
}

main();
