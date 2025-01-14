import { BotManagerService } from './../bot-manager.service';
import { Component, OnInit } from '@angular/core';
import { NgxCsvParser } from 'ngx-csv-parser';
import { NgxCSVParserError } from 'ngx-csv-parser';

@Component({
  selector: 'app-upload-source',
  templateUrl: './upload-source.component.html',
  styleUrls: ['./upload-source.component.sass'],
})
export class UploadSourceComponent implements OnInit {
  constructor(private ngxCsvParser: NgxCsvParser, private botManager: BotManagerService) {}
  CurrentData = [];
  CurrentHeaders = [];

  ngOnInit(): void {
    this.CurrentData = this.botManager.source;
    this.CurrentHeaders = this.botManager.headers;
    this.botManager.botChanged.subscribe(botChanged => {
      if (botChanged){
        this.CurrentData = this.botManager.source;
        this.CurrentHeaders = this.botManager.headers;
      }
    });
  }
  public changeListener(files: FileList) {
    if (files && files.length > 0) {
      const file: File = files.item(0);
      this.ngxCsvParser.parse(files[0], { header: true, delimiter: ',' })
      .pipe().subscribe((result: Array<any>) => {
        if(result.length > 0){
          this.botManager.uploadData(result);
        }
      }, (error: NgxCSVParserError) => {
        alert(JSON.stringify(error, null, 2));
      });
    }
  }
}
