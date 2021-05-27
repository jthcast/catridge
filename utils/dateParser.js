const dateParser = (timestamp, options = {}) => {
  const { unit = 'milliseconds',
          format = `YYYYMMDD`,
          separator = `-`
  } = options;
  if(unit === 'seconds'){
    timestamp *= 1000
  }

  const dateObject = new Date(timestamp);
  const month = dateObject.getMonth() + 1;
  const date = dateObject.getDate();
  const yyyy = dateObject.getFullYear().toString();
  const mm = month.toString().length === 1 ? `0${month}` : month;
  const dd = date.toString().length === 1 ? `0${date}` : date;

  if(format === `YYYYMMDD`){
    return `${yyyy}${separator}${mm}${separator}${dd}`;
  }else if(format === `DDMMYYYY`){
    return `${dd}${separator}${mm}${separator}${yyyy}`;
  }else if(format === `MMDDYYYY`){
    return `${mm}${separator}${dd}${separator}${yyyy}`;
  }
};

export default dateParser;