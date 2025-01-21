import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import axios from 'axios';

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
  id: string;
  crewId: string;
  certificateTypeId: string;
  issueDate: string;
  expiryDate: string;
}

export interface CertificateType {
  id: string;
  type: string;
}

@Injectable({
  providedIn: 'root',
})
export class CrewService {
  private crewUrl = 'assets/data/crews.json';
  private certificateUrl = 'assets/data/certificates.json';
  private certificateTypeUrl = 'assets/data/certificateType.json';

  constructor(private http: HttpClient) {}

  getCrewList(): Observable<Crew[]> {
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

  async saveCrew(crew: Crew) {
    const url = 'http://localhost:4200/assets/data/crews.json';

    return await axios
      .post(url, JSON.stringify(crew))
      .then((response) => {
        console.log('Data saved successfully:', response);
        return response.data;
      })
      .catch((error) => {
        console.error('Error saving data:', error);
        throw error;
      });
  }

  saveCertificate(certificate: Certificate): Observable<Certificate> {
    return this.http.post<Certificate>(this.certificateUrl, certificate);
  }
}
