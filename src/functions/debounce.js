const debounce = (delay = 500, callback) => {
  let timeout;
  return (...args) => {
    const context = this;
    if (timeout) {
      clearTimeout(timeout);
    }

    timeout = setTimeout(() => {
      timeout = null;
      callback.apply(context, args);
    }, delay);
  };
};

export default debounce;
