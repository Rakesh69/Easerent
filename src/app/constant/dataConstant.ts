export const dataConstant = {
  MessageType: {
    danger: 'danger',
    warning: 'warning',
    success: 'success-msg',
    failure: 'failure',
    error: 'Error-msg',
  },
  APIStatus: {
    Success: 'Success',
    Failure: 'Failure',
    Warning: 'Warning',
    RecordNotFound: 'Record Detail Not Exist',
    Exists: 'Exists',
    NotFound: 'NotFound',
    DuplicateRecord: 'DuplicateRecord',
    ChildRecordExist: 'ChildRecordExist'
  },
  StatusCode: {
    //Success
    200: '200',//OK
    201: '201',//Created
    204: '204',//No Content
    //Redirection
    304: '304',//Not Modified
    //Client Error
    400: '400',//Bad Request
    401: '401',//Unauthorized
    402: '402',//Created
    403: '403',//Forbidden
    404: '404',//Not Found
    409: '409',//Conflict
  },
  datePattern:/^\d{2}-\d{2}-\d{4}$/,
  NumberWithDecimal: /^[0-9]+(\.[0-9]{1,2})?$/,
  DecimalWithSevenPointPattern: /^[1-9][0-9]{0,4}(?:,?[0-9]{3}){0,2}(?:\.[0-9]{0,7})?$/,
  Numberony: /^[0-9]*$/,
  PasswordPattern: /^(?=.*?[A-Z])(?=(.*[a-z]){1,})(?=(.*[\d]){1,})(?!.*\s).{6,}$/,
  PhoneNoPattern: /^(?:\+?\d{1,3}\s*-?)?\(?(?:\d{3})?\)?[- ]?\d{3}[- ]?\d{4}$/,
  EmailPattren: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  WeekDay: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  Months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  DateFormatArray:
    ['dd/MM/yyyy'                       //00. 13-12-2018
        , 'dd-MMMM-yyyy'                //01. 13-12-2018
        , 'yyyy/MM/dd'                  //02. 2018/12/13
        , 'dd.MM.yyyy'                  //03. 13.12.2016
        , 'shortDate'                   //04. 
        , 'MM/dd/yyyy'                  //05. 12/13/2018
        , 'MM/dd/yyyy HH:mm'            //06. 12/13/2018 15:12
        , 'yyyy-MM-dd hh:mm a'          //07. 2018-12-13 03:12 PM
        , 'yyyy/MM/dd hh:mm a'          //08. 2018/12/13 03:12 PM
        , 'yyyy-MM-dd'                  //09. 2018-12-13
        , 'hh:mm a'                     //10. 03:12 PM
        , 'MMM dd,yyyy hh:mm a'         //11. DEC 13,2018 03:12 PM
        , 'dd MMMM, yyyy'               //12. 13 DECEMBER, 2018
        , 'dd MMM yyyy'                 //13. 13 DEC, 2018
        , 'MM/DD/YYYY  HH:mm:ss'        //14. 12/13/2018 15:12:20
    ],

    Pagination: {
        IsCSVExport: 'false',
        ItemsPerPage: 10,
        Page: 1,
        SearchColumns: [],
        SortColumns: []
    },
    ModuleNames: {
        User: {
            Name: 'User'
        }
    },
    PageSize: [10, 25, 50, 75, 100],
    DefaultImage: 'no_image.png',
    SearchDataType:
    {
        StringContains: 'StringContains',
        StringEquals: 'StringEquals',
        DateTime: 'DateTime',
        Date: 'Date',
        Number: 'Number',
        Decimal: 'Decimal',
        LongNumber: 'LongNumber',
        Boolean: 'Boolean',
    },
    Status: [
        { name: 'Active', value: true },
        { name: 'InActive', value: false },
    ],
    EnableColumnFiltering: true,
    IsPinOption: true,
    IsShowHideColumn: true,
    IsShowClearFilter: true,
    DisplayDateFormat:"dd/MM/yyyy",
    MinTypeAheadChar:4,
    Admin:"Admin",
    DefaultStatus: [
      { name: 'Yes', value: true },
      { name: 'No', value: false },
  ],
}

