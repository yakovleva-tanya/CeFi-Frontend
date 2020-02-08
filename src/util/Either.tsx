export default class Either<R, L extends Error> {
  private constructor(private val: R, private errorVal: L) {}

  static right<R, L extends Error>(val: R) {
    return new Either<R, L>(val, null);
  }

  static left<R, L extends Error>(errorVal: L) {
    return new Either<R, L>(null, errorVal);
  }

  get(handleError: (errorVal: L) => R): R {
    if (this.val === null) {
      return handleError(this.errorVal);
    } else {
      return this.val;
    }
  }

  map<T>(mapper: (wrapped: R) => T): Either<T, L> {
    if (this.val === null) {
      return Either.left<T, L>(this.errorVal);
    } else {
      return Either.right<T, L>(mapper(this.val));
    }
  }

  flatMap<T>(mapper: (wrapped: R) => Either<T, L>): Either<T, L> {
    if (this.val === null) {
      return Either.left<T, L>(this.errorVal);
    } else {
      return mapper(this.val);
    }
  }
}
