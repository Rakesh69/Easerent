import { environment } from '../../environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.APIUrl + 'EaseRent/login',
        Registration: environment.APIUrl + 'EaseRent/registration',
    },
    Property: {
        Add: environment.APIUrl + 'EaseRent/addProperty',
        AddDetail: environment.APIUrl + 'EaseRent/addPropertyDetails',
        ByUserId: environment.APIUrl + 'EaseRent/getPropertyByUserId',
    }
};
