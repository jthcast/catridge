import { getRandomCats, getSearchedCats } from '../api/theCat.js';
import Card from '../components/Card.js';
import Button from '../components/Button.js';
import setState from '../utils/setState.js';
import LazyImage from '../components/LazyImage.js';
import Modal from '../components/Modal.js';
import Toast from '../components/Toast.js';
import Input from '../components/Input.js';
import intersectionObserver from '../utils/intersectionObserver.js';
import { setItem, getItem } from '../utils/storage.js';
import Chip from '../components/Chip.js';

const Home = ({ target }) => {
  let isCatsModalOpen = false;
  const catsModalHandling = (event) => {
    if(isCatsModalOpen){
      isCatsModalOpen = false;
      setState($catsModal, { isOpen: false });
      return;
    }
    const $image = event?.target?.closest(`li`)?.querySelector(`img`);
    if(!$image){
      return;
    }
    const { src } = $image.dataset;
    
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
  
  const $cats = document.createElement(`ul`);
  $cats.classList.add(`card-cat-list`);
  $cats.addEventListener(`click`, catsModalHandling);
  
  const $searchDiv = document.createElement(`div`);
  $searchDiv.classList.add(`cat-search`);

  const keywordClickHandling = (event) => {
    if(event.target.closest(`svg`)){
      return;
    }
    const keyword = event?.target?.closest(`span`)?.innerText;
    if(!keyword || keyword === $searchInput.getValue()){
      return;
    }
    setState($searchInput, { value: keyword });
    getSearchedCatsHandling();
  };
  
  const $keywords = document.createElement(`ul`);
  $keywords.classList.add(`cat-keywords`);
  $keywords.addEventListener(`click`, keywordClickHandling);
  
  let cats = getItem(`cats`) || [];
  let keywords = getItem(`keywords`) || [];
  let page = getItem(`page`) || 1;
  let lastAction = getItem(`lastAction`) || ``;
  let keyword = getItem(`keyword`) || ``;
  
  const resetInfo = () => {
    cats = [];
    keyword = ``;
    page = 1;
    lastAction = ``;
  };

  const storageHandling = () => {
    setItem(`cats`, cats);
    setItem(`keyword`, keyword);
    setItem(`page`, page);
    setItem(`lastAction`, lastAction);
    setItem(`keywords`, keywords);
  };

  const makeKeywordChips = () => {
    $keywords.innerText = null;

    const chipCloseHandling = (event) => {
      const $span = event?.target?.closest(`span`);
      const $li = event?.target?.closest(`li`);
      if($li){
        $li.remove();
        keywords = keywords.filter((keyword) => keyword !== $span.innerText );
        setItem(`keywords`, keywords);
      }
    };

    keywords.forEach((keyword) => {
      const $li = document.createElement(`li`);

      new Chip({
        target: $li,
        title: keyword,
        allowClose: true,
        onClose: chipCloseHandling
      });

      $keywords.appendChild($li);
    });
  };

  const chipHandling = (keyword) => {
    keywords.unshift(keyword);
    if(keywords.length > 5){
      keywords.pop();
    }
    setItem(`keywords`, keywords);
  };

  const makeCatCards = () => {
    $cats.innerText = null;
    if(!cats.length){
      const $li = document.createElement(`li`);
      $li.classList.add(`card-cat-none`)
      $li.innerText = `고양이를 찾지 못했습니다. 😿`;
      $cats.appendChild($li);
      return;
    }

    cats.forEach((cat) => {
      const { url, breeds } = cat;
      const { name = `Unknown` } = breeds[0] || {};
      const $li = document.createElement(`li`);
  
      new Card({
        target: $li,
        imageURL: url,
        title: name,
      });
      
      $cats.appendChild($li);
    });
  };

  const init = () => {
    if(cats.length){
      makeCatCards();
    }
    if(keyword){
      setState($searchInput, { value: keyword });
    }
    if(keywords){
      makeKeywordChips();
    }
  };

  const getSearchedCatsHandling = async () => {
    const inputValue = $searchInput.getValue();
    setState($searchInput, { isLoading: true, value: inputValue });
    if(keyword === inputValue){
      page++;
    }else{
      resetInfo();
      lastAction = `search`;
      keyword = inputValue;
    }
    const { data } = await getSearchedCats(keyword, { page });
    cats = [...cats, ...data];
    storageHandling();
    makeCatCards();
    setState($searchInput, { isLoading: false });
  };

  const clearInputValue = () => {
    $searchInput.clear();
  };

  const searchInputHandling = () => {
    const inputValue = $searchInput.getValue();
    if(!inputValue){
      new Toast({
        duration: 1000,
        bodyChildren: `검색어를 입력해주세요. 😅`,
      });
      return;
    }
    cats = [];
    chipHandling(inputValue);
    makeKeywordChips();
    getSearchedCatsHandling();
  };

  const $searchInput = new Input({
    autoFocus: true,
    className: `cat-search-input`,
    target: $searchDiv,
    icon: `search`,
    onClick: clearInputValue,
    onEnter: searchInputHandling,
    label: `고양이 찾기 🐱`
  });

  const getRandomCatsHandling = async () => {
    keyword = ``;

    setState($randomCatsButton, { isLoading: true });
    if(lastAction === `random`){
      page++;
    }else{
      resetInfo();
      lastAction = `random`;
    }
    const { data } = await getRandomCats(28);
    cats = [...cats, ...data];
    storageHandling();
    makeCatCards();
    setState($randomCatsButton, { isLoading: false });
  };

  const randomCatsButtonHandling = () => {
    cats = [];
    getRandomCatsHandling();
  };

  const $randomCatsButton = new Button({
    className: `cat-search-random`,
    target: $searchDiv,
    title: `무작위\n 고양이`,
    design: `primary`,
    onClick: randomCatsButtonHandling,
  });

  const sentryHandling = (entry, observer) => {
    if (entry.isIntersecting && cats.length) {
      if(lastAction === `search`){
        getSearchedCatsHandling();
      }else if(lastAction === `random`){
        getRandomCatsHandling();
      }
    }
  };
  
  const $sentry = document.createElement(`div`);
  intersectionObserver($sentry, sentryHandling, {
    root: null, rootMargin: `50%`, threshold: 0
  });

  target.appendChild($searchDiv);
  target.appendChild($keywords);
  target.appendChild($cats);
  target.appendChild($sentry);
  init();
};

export default Home;