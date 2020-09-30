import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  PropertyData: any = [];
  constructor() { }

  ngOnInit() {
    // for (var i = 0; i < 10; i++) {
    //   var data = {
    //     PropertyName: "Property #" + i
    //   }
    //   this.PropertyData.push(data);
    // }
  }

}
