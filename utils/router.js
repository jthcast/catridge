// const BASE_URL = `/`;
const BASE_URL = `jthcast.github.io/vanillaJS-practice`;
let target = undefined;

const router = async (path, options = {}) => {
  const { isInit = false } = options;
  if(!isInit && path === window.location.pathname){
    return;
  }
  if(path === BASE_URL){
    path = `/`;
  }
  const absolutePath = `${window.location.origin}${path}`;
  window.history.pushState({}, path, absolutePath);
  target.innerText = null;
  let module = undefined;
  
  try{
    const pagePath = path === `/` ? `/index` : path;
    module = await import(`../pages${pagePath}.js`);
  }catch(error){
    module = await import(`../pages/ErrorPage.js`);
  }finally{
    module.default({ target });
  }
};

const initRouter = ($target) => {
  const path = window.location.pathname;
  target = $target;
  
  window.addEventListener(`popstate`, () => {
    router(path);
  });

  router(BASE_URL, { isInit: true });
};

export { initRouter, router };