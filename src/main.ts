import { startREPL } from "./repl.js";
import { initState } from "./state.js";

function main() {
  var state = initState()

  startREPL(state);
}

main();
