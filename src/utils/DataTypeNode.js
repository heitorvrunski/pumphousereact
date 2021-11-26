export function DataType(value) {
    if (typeof value === "number") {
      if (Number.isInteger(value)) {
        return 6;
      }
      return 11;
    } else if (typeof value === "string") {
      return 12;
    } else {
      return 1;
    }
  }

