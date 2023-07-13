export function formatDisplayName(str: string): string {
  let i;
  let frags = str.split("_");

  for (i = 0; i < frags.length; i++) {
    frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
  }
  return frags.join(" ");
}
