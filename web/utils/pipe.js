function pipe(source, target) {
  if (!source.emit || !target.emit) {
    throw TypeError("`source` and `target` must have emit event");
  }
  console.log("hola")
  const emit = (source._emit = source.emit);

  source.emit = function (...args) {
    emit.apply(source, args);
    target.emit.apply(target, args);

    return source;
  };
}

module.exports = pipe;
