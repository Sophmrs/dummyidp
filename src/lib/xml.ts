export function xml(strings: TemplateStringsArray, ...values: any[]): string {
  return values
    .reduce(
      (result, value, index) => result + String(value) + strings[index + 1],
      strings[0] as string,
    )
    .replace(/\r?\n/g, " ") // newlines -> spaces
    .replace(/\t/g, " ") // tabs -> spaces
    .replace(/\s{2,}/g, " ") // collapse multiple spaces
    .replace(/>\s+</g, "><") // remove spaces between tags
    .replace(/>\s+/g, ">") // trim leading space of text nodes
    .replace(/\s+</g, "<") // trim trailing space of text nodes
    .trim();
}
