export class InvalidLocationError extends Error {
  constructor(message) {
    super(message || "You need to enter or select a valid city location");
  }
}
