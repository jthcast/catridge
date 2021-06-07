// const HOST_URL = ``;
const HOST_URL = `https://jthcast.github.io`;
const BASE_URL = `/vanillaJS-practice`;
let target = undefined;

const router = async (path, options = {}) => {
  const { isInit = false } = options;
  if(!isInit && path === window.location.pathname){
    return;
  }
  const absolutePath = `${HOST_URL}${path}`;
  window.history.pushState({}, path, absolutePath);
  target.innerText = null;
  let module = undefined;
  
  try{
    const pagePath = path === BASE_URL ? `/index` : path.replcae(BASE_URL, ``);
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

  router(path, { isInit: true });
};

export { initRouter, router };