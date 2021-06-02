import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import { initRouter } from '../utils/router.js';

const App = (root) => {  
  const header = new Header({
    target: root,
    title: `VanillaJS`,
    logo: { 
      alt: `VanillaJS`,
      src: `../public/technologist.png`
    }
  });
  
  const $main = document.createElement(`main`);
  $main.classList.add(`main`);
  root.appendChild($main);
  initRouter($main);
  
  const footer = new Footer({
    target: root,
    copyright: { name: `Jthcast`, href: `https://jthcast.dev`},
  });
};

export default App;