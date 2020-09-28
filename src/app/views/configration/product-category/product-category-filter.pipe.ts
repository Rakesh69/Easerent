import * as _ from 'lodash';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'productCategoryFilter'
})
export class ProductCategoryFilterPipe implements PipeTransform {

  transform(array: any[], query: string): any {
      
    if (query) {
      return _.filter(array, row => (row.Name && row.Name.toLowerCase().indexOf(query.toLowerCase()) > -1)
      )
       ;
    }
    return array;
  }
}
