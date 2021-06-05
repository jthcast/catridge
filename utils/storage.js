const getItem = (key, options = {}) => {
  const { type = `session`} = options;
  let item = undefined;

  if(type === `session`){
    item = window.sessionStorage.getItem(key);
  }else if(type === `local`){
    item = window.localStorage.getItem(key);
  }

  return JSON.parse(item);
};

const setItem = (key, value, options = {}) => {
  const { type = `session`} = options;
  let item = value;

  if(typeof(value) !== `number`){
    item = JSON.stringify(item);
  }
  if(type === `session`){
    return window.sessionStorage.setItem(key, item);
  }else if(type === `local`){
    return window.localStorage.setItem(key, item);
  }
};

const removeItem = (key, options = {}) => {
  const { type = `session` } = options;

  if(type === `session`){
    return window.sessionStorage.removeItem(key);
  }else if(type === `local`){
    return window.localStorage.removeItem(key);
  }
};

export { getItem, setItem, removeItem };
