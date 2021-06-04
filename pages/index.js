import { getRandomCats } from '../api/theCat.js';
import Card from '../components/Card.js';
import Button from '../components/Button.js';
import setState from '../utils/setState.js';
import LazyImage from '../components/LazyImage.js';
import Modal from '../components/Modal.js';
import Toast from '../components/Toast.js';

const Home = ({ target }) => {
  let isCatsModalOpen = false;
  const catsModalHandling = (event) => {
    if(isCatsModalOpen){
      isCatsModalOpen = false;
      setState($catsModal, { isOpen: false });
      return;
    }
    const image = event?.target?.closest(`li`)?.querySelector(`img`);
    if(!image){
      return;
    }
    const { src } = image.dataset;
    
    isCatsModalOpen = !isCatsModalOpen;
    setState($catsModal, { 
      isOpen: isCatsModalOpen,
      children: new LazyImage({ src, target }).dom
    });
  };

  const $catsModal = new Modal({
    target,
    openHandler: catsModalHandling
  });

  const $catsUl = document.createElement(`ul`);
  $catsUl.classList.add(`card-cat-list`);
  $catsUl.addEventListener(`click`, catsModalHandling);

  const $searchDiv = document.createElement(`div`);
  $searchDiv.classList.add(`cat-search`);

  const clearCatsUl = () => {
    $catsUl.innerText = null;
  };

  const makeCatCards = (cat) => {
    const { url, breeds } = cat;
    const { name = `Unknown` } = breeds[0] || {};
    const $li = document.createElement(`li`);

    new Card({
      target: $li,
      imageURL: url,
      title: name,
    });
    
    $catsUl.appendChild($li);
  };

  const getRandomCatsHandling = async () => {
    setState($randomCatsButton, { isLoading: true });
    clearCatsUl();
    const { data } = await getRandomCats(28);

    new Toast({
      duration: 2000,
      bodyChildren: `고양이들이 당신을 축복합니다. 🎉`,
    });
    data.forEach((cat) => makeCatCards(cat));
    setState($randomCatsButton, { isLoading: false });
  };

  const $randomCatsButton = new Button({ 
    target: $searchDiv,
    title: `무작위\n 고양이 찾기`,
    design: `primary`,
    onClick: getRandomCatsHandling,
  });

  target.appendChild($searchDiv);
  target.appendChild($catsUl);
};

export default Home;