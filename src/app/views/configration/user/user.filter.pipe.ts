import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userFilter'
})
export class UserFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
      
    if (query) {
      return _.filter(array, row => (row.FirstName && row.FirstName.toLowerCase().indexOf(query.toLowerCase()) > -1)
      ||(row.LastName && row.LastName.toLowerCase().indexOf(query.toLowerCase()) > -1)
      ||(row.EmailAddress && row.EmailAddress.toLowerCase().indexOf(query.toLowerCase()) > -1)
      ||(row.Mobile && row.Mobile.toLowerCase().indexOf(query.toLowerCase()) > -1)
      ||(row.RoleName && row.RoleName.toLowerCase().indexOf(query.toLowerCase()) > -1)
      )
       ;
    }
    return array;
  }
}
