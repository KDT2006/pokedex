export function cleanInput(input: string): string[] {
  let splitArray = [];
  const inputSplit = input.trim().split(" ");
  for (let split of inputSplit) {
    splitArray.push(split.toLowerCase());
  }

  return splitArray;
}
