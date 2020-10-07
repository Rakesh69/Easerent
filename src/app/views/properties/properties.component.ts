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
    let imgCount = 1;
    for (var i = 1; i <= 12; i++) {
      var data = {
        propertyImage: imgCount + ".jpg",
        propertyName: "Property #" + i,
        label1: "Label " + i,
        label2: "Title " + i,
        label3: "Detail " + i,
        label4: "Data " + i
      }
      imgCount++;

      if(imgCount > 6) {
        imgCount = 1;
      }
      this.PropertyData.push(data);
    }
  }

}
