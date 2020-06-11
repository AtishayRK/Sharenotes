import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import {AuthserviceService} from '../authservice.service'
import {FileSelectDirective ,FileUploader} from 'ng2-file-upload';
import{HttpClient} from '@angular/common/http';
import * as fileSaver from 'file-saver';
@Component({
  selector: 'app-professor',
  templateUrl: './professor.component.html',
  styleUrls: ['./professor.component.css']
})
export class ProfessorComponent implements OnInit {
  private files = [];
  private name : string;
  private data : any;
  private url = 'http://localhost:4000/apis/upload';
  private uploader: FileUploader;
  constructor(private auth : AuthserviceService,private http : HttpClient) {
    this.uploader = new FileUploader({url: this.url});
    this.uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    }
  }
  ngOnInit() {
    this.name=localStorage.getItem('user');
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      console.log("uploaded:", item, status);
   
       this.data={
        fileName : JSON.parse((response))[0].originalname,
        content : JSON.parse((response))[0].contentType,
        name : this.name
      }
      
   this.auth.postNames(this.data).subscribe(res=>{
     console.log(res);
   })
      
  };
    this.auth.showFileNames().subscribe(response => {
      for (let i = 0; i < JSON.parse(JSON.stringify(response)).length; i++) {
        this.files[i] = {
          filename: JSON.parse(JSON.stringify(response))[i].filename,
          contentType: JSON.parse(JSON.stringify(response))[i].contentType
        };
      }
    });

  }
  downloadPdf(filename, contentType) {
    this.auth.downloadPDF(filename, contentType).subscribe(
      (res) => {
        const file = new Blob([res], { type: contentType });
        
        fileSaver.saveAs(file,filename);
      }
    );
  }


  }

