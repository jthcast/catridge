const getUUID = ({ type = `number` }) => {
  const array = new Uint32Array(1);
  const uuids = window.crypto.getRandomValues(array);

  if(type === `string`){
    return uuids[0].toString(36);
  }
  return uuids[0];
};

export default getUUID;