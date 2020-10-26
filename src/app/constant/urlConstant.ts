import { environment } from '../../environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.APIUrl + 'api/auth/login',
        Registration: environment.APIUrl + 'api/auth/registrtion',
    },
    Users: {
        GetList: environment.APIUrl + 'api/Account/GetUserList',
        FindByName:environment.APIUrl + 'User/FindUserByName'
    },
};
