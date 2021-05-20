const intersectionObserver = (observerEntry, callback, {
  root = null,
  rootMargin = `50%`,
  threshold = 0,
}) => {
  if (observerEntry) {
    const observerObj = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          callback(entry, observer);
        });
      },
      { root, rootMargin, threshold }
    );

    if(Array.isArray(observerEntry)){
      observerEntry.forEach((element) => {
        observerObj.observe(element);
      });
      return;
    }
    observerObj.observe(observerEntry);
  }
};

export default intersectionObserver;