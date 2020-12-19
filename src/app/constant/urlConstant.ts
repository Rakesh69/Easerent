import { environment } from '../../environments/environment';

export const urlConstant = {
    Auth: {
        Login: environment.APIUrl + 'EaseRent/login',
        Registration: environment.APIUrl + 'EaseRent/registration',
        ActivateAccount: environment.APIUrl + 'account-verify',
    },
    Property: {
        Add: environment.APIUrl + 'EaseRent/addProperty',
        AddDetail: environment.APIUrl + 'EaseRent/addPropertyDetails',
        ByUserId: environment.APIUrl + 'EaseRent/getPropertyByUserId',
        GetPropertyByPropertyId: environment.APIUrl + 'EaseRent/getPropertyByPropertyId',
        UploadDocumentPropertyByPropertyId: environment.APIUrl + 'EaseRent/uploadFile',
        DeletePropertyByPropertyId: environment.APIUrl + 'EaseRent/deleteProperty',
        GetDocumentByPropertyId: environment.APIUrl + 'EaseRent/getDocumentByPropertyId',
        DeleteDocumentByDocumentId: environment.APIUrl + 'EaseRent/deleteDocument',
        AddPropertyUserInvitation: environment.APIUrl + 'EaseRent/addPropertyUserInvitation',
    }
};
