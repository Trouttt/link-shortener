import { api } from '../boot/axios';
import ICreateUser from 'src/interfaces/user/IUser';
import IUser from 'src/interfaces/user/IUser';
import IAuthenticateUser from 'src/interfaces/user/IAuthenticateUser';
import IResponseAuthenticate from 'src/interfaces/user/IResponseAuthenticate';

class UserService { 
    createUser(data: ICreateUser) {
        return api.post<IUser>('/users', data); // cria um cliente
    }
    authenticateUser(data: IAuthenticateUser) {
        return api.post<IResponseAuthenticate>('/sessions', data);
    }
}
export default UserService;