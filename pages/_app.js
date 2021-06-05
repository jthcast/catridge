import Footer from '../components/Footer.js';
import Header from '../components/Header.js';
import { initRouter } from '../utils/router.js';
import Switch from '../components/Switch.js';
import setState from '../utils/setState.js';
import Icon from '../components/Icon.js';

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

  const iconSun = new Icon({
    target: root,
    icon: `sun`
  });

  const iconMoon = new Icon({
    target: root,
    icon: `moon`
  });

  let isDark = false;
  const systemPreference = window.matchMedia('(prefers-color-scheme: dark)');
  if (systemPreference.matches) {
    isDark = true;
  }
  
  const darkmodeHandling = () => {
    isDark = !isDark;
    const colorMode = isDark ? `dark` : `light`;
    
    document.documentElement.setAttribute(`data-theme`, colorMode);
    setState(darkmodeSwitch, { isChecked: isDark });
  };

  const darkmodeSwitch = new Switch({
    className: `switch-darkmode`,
    target: root,
    unCheckedChildren: iconSun.dom,
    checkedChildren: iconMoon.dom,
    isChecked: isDark,
    onClick: darkmodeHandling
  });
};

export default App;