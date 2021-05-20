let timeoutId = undefined;

const debounce = (func, delay) => {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    func();
  }, delay);
};

export default debounce;