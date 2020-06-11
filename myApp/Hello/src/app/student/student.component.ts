import { Component, OnInit } from '@angular/core';
import {AuthserviceService} from '../authservice.service'
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
private files=[{
  name : String,
  fileName : [String],
  content : [String]
}]
  constructor(private auth :AuthserviceService) { }

  ngOnInit() {
    this.auth.showdata().subscribe((response)=>{
      for (let i = 0; i < JSON.parse(JSON.stringify(response)).length; i++) {
        this.files[i] = {
          fileName: JSON.parse(JSON.stringify(response))[i].fileName,
          name: JSON.parse(JSON.stringify(response))[i].name,
          content : JSON.parse(JSON.stringify(response))[i].content
        };
      }
     
    })
  }
  downloadPdf(filename,content) {
    this.auth.downloadPDF(filename,content).subscribe(
      (res) => {
        const file = new Blob([res], { type: content });
        
        fileSaver.saveAs(file,filename);
      }
    );
  }
}
