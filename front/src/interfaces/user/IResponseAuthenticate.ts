
interface user {
    id: string
  }
  
  
  export default interface IResponseAuthenticate {
    token?: string;
    user: user;
  }