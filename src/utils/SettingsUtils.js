export function FindConfig(config, str2find) {
  for (const element of config) {
    if (element.name === str2find) {
      return element;
    }
  }
}
