export const titleCase = (str: string) => {
  const sentence = str.toLowerCase().split(" ");
  return sentence.map((word) => word[0].toUpperCase() + word.slice(1)).join(" ");
}