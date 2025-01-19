import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface Crew {
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;
  totalIncome: number;
}

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private jsonUrl = 'assets/data/crews.json';
  constructor(private http: HttpClient) {}

  getCrewList() {
    return this.http.get<Crew[]>(this.jsonUrl);
  }
}
