/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../boot/axios';
import auth from '../middlewares/auth'
import ICreateUrl from 'src/interfaces/url/ICreateUrl';
import IUrl from 'src/interfaces/url/IUrl';
import IFindUrl from 'src/interfaces/url/IFindUrl';
import IUpdateVisitedUrl from 'src/interfaces/url/IUpdateVisitedUrl';
import IGetUserUrl from 'src/interfaces/url/IGetUserUrl';
import IDeleteUserUrl from 'src/interfaces/url/IDeleteUserUrl';
class UrlService { 
    createUrl(data: ICreateUrl) {
        return api.post<IUrl>('/urls', data); // cria um cliente
    }
    getMostVisitedUrls(){
        return api.get<IUrl[]>('/urls');
    }
    getUrl(data: IFindUrl){
        return api.post<IUrl>('/urls/find', data);
    }
    updateVisited(data: IUpdateVisitedUrl) {
        return api.put<IUrl>('/urls', data);
    }
    getUserUrls(data: IGetUserUrl){
        return api.post<IUrl[]>('/urls/user', data, auth);
    }
    deleteUrl(data: IDeleteUserUrl){
        return api.delete<IUrl>(`/urls/${data.id}`, auth);
    }
}
export default UrlService;