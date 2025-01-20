import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface Crew {
  id: string;
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
  daysOnBoard: number;
  dailyRate: number;
  currency: string;
  totalIncome: number;
}

export interface Certificate {
  id: number;
  crewId: number;
  certificateTypeId: number;
  issueDate: string;
  expiryDate: string;
}

export interface CertificateType {
  id: number;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewUrl = 'assets/data/crews.json';
  private certificateUrl = '/assets/data/certificates.json';
  private certificateTypeUrl = '/assets/data/certificateType.json';

  constructor(private http: HttpClient) {}

  getCrewList() {
    return this.http.get<Crew[]>(this.crewUrl);
  }

  getCrewById(id: string): Observable<Crew | null> {
    return this.http
      .get<Crew[]>(this.crewUrl)
      .pipe(map((crews) => crews.find((crew) => crew.id === id) || null));
  }

  getCertificates(): Observable<Certificate[]> {
    return this.http.get<Certificate[]>(this.certificateUrl);
  }

  getCertificateTypes(): Observable<CertificateType[]> {
    return this.http.get<CertificateType[]>(this.certificateTypeUrl);
  }
}
