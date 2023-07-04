// Pass any type in and check that it is non-nullable
export function assertIsDefined<T>(val: T): asserts val is NonNullable<T> {
  // If val is undefined or null.
  if (!val) {
    throw Error("Expected 'val' to be defined but received " + val);
  }
}
