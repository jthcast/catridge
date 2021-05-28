let target = undefined;

const render = async (path) => {
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

  render(`/`);
};

const router = (path) => {
  const absolutePath = `${window.location.origin}${path}`;
  window.history.pushState({}, path, absolutePath);

  render(path);
};

export { initRouter, router };