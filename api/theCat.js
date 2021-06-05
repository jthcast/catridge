const request = async (url, options) => {
  try{
    const response = await fetch(url, options);
    
    if(response.ok){
      const data = await response.json();
      return data;
    }

    const errorData = await response.json();
    throw errorData;
  }catch(error){
    const { message, status } = error;
    throw {
      message,
      status
    }
  }
};

const API_ENDPOINT = `https://api.thecatapi.com/v1`;

const getRandomCats = async (limit = 20) => {
  try{
    const url = `${API_ENDPOINT}/images/search?limit=${limit}`;
    const data = await request(url);
    
    return {
      isError: false,
      data
    };
  }catch(error){
    return {
      isError: true,
      data: error
    };
  }
};

const getSearchedCats = async (keyword, options = {}) => {
  try{
    const { limit = 20, page = 1 } = options;
    const breedsUrl = `${API_ENDPOINT}/breeds/search?q=${keyword}`;
    const breeds = await request(breedsUrl);
    const images = breeds.map(async (breed) => {
      const imagesUrl = `${API_ENDPOINT}/images/search?breed_id=${breed.id}&limit=${limit}&page=${page}`;
      return await request(imagesUrl);
    });
    const response = await Promise.all(images);
    const data = response.flat();
    
    return {
      isError: false,
      data
    };
  }catch(error){
    return {
      isError: true,
      data: error
    };
  }
};

export { getRandomCats, getSearchedCats };
