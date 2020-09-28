import { environment } from '../../environments/environment';

export const urlConstant = {
    accountModule: {
        LoggedIn: environment.APIUrl + 'Token/Auth',
    },
    Users: {
        GetUserList: environment.APIUrl + 'api/Account/GetUserList',
        FindUserByName:environment.APIUrl + 'User/FindUserByName'
    },
    SARTypeOfTrade: {
        GetSARTypeOfTradeList: environment.APIUrl + 'SARTypeOfTrade/GetAll',
        GetSARTypeOfTradeGetById:environment.APIUrl + 'SARTypeOfTrade/GetById',
        SARSARTypeOfTradeSave:environment.APIUrl + 'SARTypeOfTrade/Save',
        DeleteSARTypeOfTrade:environment.APIUrl + 'SARTypeOfTrade/Delete',
        GetAllSARTypeOfTradeList:environment.APIUrl + 'SARTypeOfTrade/GetAllSARTypeOfTradeList',
    },
    SARProductCategory: {
        GetSARProductCategoryList: environment.APIUrl + 'SARProductCategory/GetAll',
        GetSARProductCategoryGetById:environment.APIUrl + 'SARProductCategory/GetById',
        SARProductCategorySave:environment.APIUrl + 'SARProductCategory/Save',
        DeleteSARProductCategory:environment.APIUrl + 'SARProductCategory/Delete',
    },
    SARSubmitSource: {
        GetSARSubmitSourceList: environment.APIUrl + 'SARSubmitSource/GetAll',
        GetSARSubmitSourceGetById:environment.APIUrl + 'SARSubmitSource/GetById',
        SARSubmitSourceSave:environment.APIUrl + 'SARSubmitSource/Save',
        DeleteSARSubmitSource:environment.APIUrl + 'SARSubmitSource/Delete',
        GetAllSARSubmitSourceList:environment.APIUrl + 'SARSubmitSource/GetAllSARSubmitSourceList',
    },
    SARStatus: {
        GetSARStatusList: environment.APIUrl + 'SARStatus/GetAll',
        GetSARStatusGetById:environment.APIUrl + 'SARStatus/GetById',
        SARStatusSave:environment.APIUrl + 'SARStatus/Save',
        DeleteSARStatus:environment.APIUrl + 'SARStatus/Delete',
        GetAllSARStatusList:environment.APIUrl + 'SARStatus/GetAllSARStatusList',
    },
    Outlets: {
        GetOutletsList: environment.APIUrl + 'Outlets/GetAll',
        GetOutletGetById:environment.APIUrl + 'Outlets/GetById',
        OutletSave:environment.APIUrl + 'Outlets/Save',
        DeleteOutlet:environment.APIUrl + 'Outlets/Delete',
        GetAllOutletsList: environment.APIUrl + 'Outlets/GetAllOutletsList',
        GetPostalCodesByMaketCode:environment.APIUrl + 'Outlets/GetPostalCodesByMaketCode',
    },
    OutletTerritory: {
        GetOutletTerritoryList: environment.APIUrl + 'OutletTerritory/GetAll',
        GetOutletTerritoryGetById:environment.APIUrl + 'OutletTerritory/GetById',
        OutletTerritorySave:environment.APIUrl + 'OutletTerritory/Save',
        DeleteOutletTerritory:environment.APIUrl + 'OutletTerritory/Delete',
        GetAllOutletTerritoriesList: environment.APIUrl + 'OutletTerritory/GetAllOutletTerritoriesList',
    },
    SuspiciousActivity:{
        GetSuspiciousActivityList: environment.APIUrl + 'SuspiciousActivityReport/GetAll',
        SaveSuspiciousActivity: environment.APIUrl + 'SuspiciousActivityReport/Save',
        GetSuspiciousActivityById: environment.APIUrl + 'SuspiciousActivityReport/GetById',
        ChangeStatus: environment.APIUrl + 'SuspiciousActivityReport/ChangeStatus',
        GetSuspiciousActivityUserWiseList: environment.APIUrl + 'SuspiciousActivityReport/GetUserWiseList',
        SendSuspeciousReportDetailMail: environment.APIUrl + 'SuspiciousActivityReport/SendSuspeciousReportDetailMail',
    },
    SARNote:{
        SaveSARNote: environment.APIUrl + 'SARNote/Save',
    },
    SarAttachment:{
        SaveSarAttachment: environment.APIUrl + 'SarAttachment/Save',
        GetSarAttachmentById: environment.APIUrl + 'SarAttachment/GetById',
    },
    Role: {
        GetRoleList: environment.APIUrl + 'Role/GetAll',
        GetRoleGetById:environment.APIUrl + 'Role/GetById',
        RoleSave:environment.APIUrl + 'Role/Save',
        DeleteRole:environment.APIUrl + 'Role/Delete',
        GetAllRoleList:environment.APIUrl + 'Role/GetAllRoleList',
    },
    Module: {
        GetModuleList: environment.APIUrl + 'Module/GetAll',
        GetAllModuleList:environment.APIUrl + 'Module/GetAllModuleList',
    },
    RepTerritory: {
        GetRepTerritoryList: environment.APIUrl + 'RepTerritory/GetAll',
        GetRepTerritoryGetById:environment.APIUrl + 'RepTerritory/GetById',
        RepTerritorySave:environment.APIUrl + 'RepTerritory/Save',
        DeleteRepTerritory:environment.APIUrl + 'RepTerritory/Delete',
        GetAllRepTerritoryList:environment.APIUrl + 'RepTerritory/GetAllRepTerritoryList',
    },
    User: {
        GetUserList: environment.APIUrl + 'User/GetAll',
        GetUserGetById:environment.APIUrl + 'User/GetById',
        UserSave:environment.APIUrl + 'User/Save',
        DeleteUser:environment.APIUrl + 'User/Delete',
        GetAllUserList:environment.APIUrl + 'User/GetAllUserList',
        ForgotPassword  :environment.APIUrl + 'User/ForgotPassword',
        ResetPassword:environment.APIUrl + 'User/ResetPassword',
    },
    
}
