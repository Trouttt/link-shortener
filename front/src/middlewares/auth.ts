/* eslint-disable @typescript-eslint/restrict-plus-operands */
const request = {
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  };
  
  export default request;