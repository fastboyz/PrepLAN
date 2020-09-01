import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';

type AOA = any[][];

@Component({
  selector: 'schedule-generator',
  templateUrl: './schedule-generator.component.html',
  styleUrls: ['./schedule-generator.component.scss']
})

export class ScheduleGeneratorComponent implements OnInit {
  data: AOA;
  excelData: ExcelData[];
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  constructor(
    private route: ActivatedRoute,
    private eventService: EventService) { }

  ngOnInit(): void {
    this.excelData = [];
  }

  onFileChanged(evt: any) {
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.excelData = [];
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      wb.SheetNames.forEach(wsname => {
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        let data: AOA = <AOA>(XLSX.utils.sheet_to_json(ws, { header: 1 }));
        let newAOA: AOA = <AOA>[];
        let i;

        data[0][2] = "Volunteer";
        newAOA.push(data[0]);

        for (i = 1; i < data.length - 1; i += 2) {
          data[i].push(data[i + 1][2]);
          newAOA.push(data[i]);
        }

        let newData: ExcelData = {
          data: newAOA,
          worksheetName: wsname
        }

        this.excelData.push(newData);
      });
    };
    reader.readAsBinaryString(target.files[0]);
  }

  startGenerator() {
    this.eventService.startGenerator(this.route.snapshot.paramMap.get('id')).subscribe();
  }

  stopGenerator() {
    this.eventService.stopGenerator(this.route.snapshot.paramMap.get('id')).subscribe();
  }

  getExcel() {
    this.eventService.getExcelByEditionId(this.route.snapshot.paramMap.get('id')).subscribe(excel => {
      console.log(excel);
    });
  }
}

export class ExcelData {
  worksheetName: string;
  data: AOA;
}
