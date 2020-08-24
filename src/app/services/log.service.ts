import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { Log } from '../models/Log';
@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: Log[];
  private logSource = new BehaviorSubject<Log>({
    id: null,
    text: null,
    date: null,
  });
  selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);

  stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [];
  }
  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a, b) => a.date - b.date));
  }
  addLog(log: Log) {
    this.logs.unshift(log);

    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  updateLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (log.id === currentLog.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  deleteLog(log: Log) {
    this.logs.forEach((currentLog, index) => {
      if (log.id === currentLog.id) {
        this.logs.splice(index, 1);
      }
    });
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }
  setFormLog(log: Log) {
    this.logSource.next(log);
  }
  clearState() {
    this.stateSource.next(true);
  }
}
