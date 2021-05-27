const setState = (target, states) => {
  for(const state in states){
    target[state] = states[state];
    target.render();
  }
};

export default setState;