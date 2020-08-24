import { Component, OnInit } from '@angular/core';
import { LogService } from '../../services/log.service';
@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css'],
})
export class LogFormComponent implements OnInit {
  id: string;
  text: string;
  date: any;

  isNew: boolean = true;
  constructor(private logService: LogService) {}

  onClear() {
    this.id = null;
    this.text = null;
    this.date = null;
    this.logService.clearState();
  }

  ngOnInit(): void {
    this.logService.selectedLog.subscribe((log) => {
      if (log.id !== null) {
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    });
  }
  onSubmit() {
    if (this.isNew) {
      this.logService.addLog({
        id: this.generateId(),
        text: this.text,
        date: new Date(),
      });
    } else {
      this.logService.updateLog({
        id: this.id,
        text: this.text,
        date: new Date(),
      });
      this.isNew = true;
    }
    this.onClear();
  }
  generateId() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (
      c
    ) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
}
