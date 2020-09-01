import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';

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

  startGenerator() {
    this.eventService.startGenerator(this.route.snapshot.paramMap.get('id')).subscribe();
  }

  stopGenerator() {
    this.eventService.stopGenerator(this.route.snapshot.paramMap.get('id')).subscribe();
  }

  getExcel() {
    this.eventService.getExcelByEditionId(this.route.snapshot.paramMap.get('id')).subscribe(excel => {

      console.log(excel);
      this.eventService.downloadFile('roster', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', excel).subscribe(
        success => {
          this.loadExcel(success);
        },
        err => {
          alert('Server error while downloading file.');
        }
      );

    });
  }

  downloadExcel() {
    this.eventService.getExcelByEditionId(this.route.snapshot.paramMap.get('id')).subscribe(excel => {

      console.log(excel);
      this.eventService.downloadFile('roster', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', excel).subscribe(
        success => {
          saveAs(success, 'Schedule');
        },
        err => {
          alert('Server error while downloading file.');
        }
      );

    });
  }

  loadExcel(excel: any) {
    const reader: FileReader = new FileReader();
    reader.onload = (e: any) => {
      this.excelData = [];
      const bstr: string = e.target.result;
      const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

      wb.SheetNames.forEach(wsname => {
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];
        const data: AOA = (XLSX.utils.sheet_to_json(ws, { header: 1 })) as AOA;
        const newAOA: AOA = [] as AOA;
        let i: number;

        data[0][2] = 'Volunteer';
        newAOA.push(data[0]);

        for (i = 1; i < data.length - 1; i += 2) {
          data[i].push(data[i + 1][2]);
          newAOA.push(data[i]);
        }

        const newData: ExcelData = {
          data: newAOA,
          worksheetName: wsname
        };

        this.excelData.push(newData);
      });
    };
    reader.readAsBinaryString(excel);
  }
}

export class ExcelData {
  worksheetName: string;
  data: AOA;
}
