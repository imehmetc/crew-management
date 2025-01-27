import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { crewData } from '../../../../../public/assets/data/crewData';
import { certificateData } from '../../../../../public/assets/data/certificateData';
import { certificateTypeData } from '../../../../../public/assets/data/certificateTypeData';

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
  private crewList: any[] = [...crewData];
  private certificateData: any[] = [...certificateData];
  private certificateTypeData: any[] = [...certificateTypeData];
  private crewSubject = new BehaviorSubject<Crew[]>(this.crewList); // Tablonun anlık güncellenmesi için.

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('crewList', JSON.stringify(this.crewList));
  }

  private loadFromLocalStorage() {
    const savedData = localStorage.getItem('crewList');
    if (savedData) {
      this.crewList = JSON.parse(savedData);
      this.crewSubject.next(this.crewList);
    }
  }

  // Crew CRUD
  getCrewList(): Observable<Crew[]> {
    return this.crewSubject.asObservable();
  }

  getCrewById(id: string): Observable<Crew | null> {
    const crew = this.crewList.find((member) => member.id === id) || null;
    return of(crew);
  }

  addCrew(crew: any) {
    crew.id = (this.crewList.length + 1).toString();
    this.crewList.push(crew);
    this.crewSubject.next(this.crewList);
    this.saveToLocalStorage();
  }

  updateCrew(id: string, updatedCrew: any): Observable<any> {
    const index = this.crewList.findIndex((crew) => crew.id === id);
    if (index !== -1) {
      this.crewList[index] = { ...this.crewList[index], ...updatedCrew };
      this.crewSubject.next(this.crewList);
      this.saveToLocalStorage();

      return of(updatedCrew);
    }
    return of(null);
  }

  deleteCrew(id: string): Observable<any> {
    this.crewList = this.crewList.filter((crew) => crew.id !== id);
    this.crewSubject.next(this.crewList);
    this.saveToLocalStorage();

    return of(id);
  }

  // Certificate CRUD
  getCertificates(): Observable<any[]> {
    return of(this.certificateData);
  }

  addCertificate(certificate: any) {
    certificate.id = (this.certificateData.length + 1).toString();
    this.certificateData.push(certificate);
    this.saveToLocalStorage();
  }

  // CertificateType CRUD
  getCertificateTypes(): Observable<any[]> {
    return of(this.certificateTypeData);
  }

  addCertificateType(certificateType: any) {
    certificateType.id = (this.certificateTypeData.length + 1).toString();
    this.certificateTypeData.push(certificateType);
    this.saveToLocalStorage();
  }
}
