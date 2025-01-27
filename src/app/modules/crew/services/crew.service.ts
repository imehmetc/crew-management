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
  private crewList: Crew[] = [...crewData];
  private certificateList: Certificate[] = [...certificateData];
  private certificateTypeList: CertificateType[] = [...certificateTypeData];
  private crewSubject = new BehaviorSubject<Crew[]>(this.crewList); // Tablonun anlık güncellenmesi için.

  constructor() {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('crewList', JSON.stringify(this.crewList));
    localStorage.setItem(
      'certificateList',
      JSON.stringify(this.certificateList)
    );
    localStorage.setItem(
      'certificateTypeList',
      JSON.stringify(this.certificateTypeList)
    );
  }

  private loadFromLocalStorage() {
    const savedCrewData = localStorage.getItem('crewList');
    const savedCertificateData = localStorage.getItem('certificateList');
    const savedCertificateTypeData = localStorage.getItem(
      'certificateTypeList'
    );

    if (savedCrewData) {
      this.crewList = JSON.parse(savedCrewData);
      this.crewSubject.next(this.crewList);
    }
    if (savedCertificateData) {
      this.certificateList = JSON.parse(savedCertificateData);
    }
    if (savedCertificateTypeData) {
      this.certificateTypeList = JSON.parse(savedCertificateTypeData);
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

  addCrew(crew: Crew): Observable<Crew> {
    crew.id = (this.crewList.length + 1).toString();
    this.crewList.push(crew);
    this.crewSubject.next([...this.crewList]);
    this.saveToLocalStorage();
    return of(crew);
  }

  updateCrew(id: string, updatedCrew: any): Observable<any> {
    const index = this.crewList.findIndex((crew) => crew.id === id);
    if (index !== -1) {
      this.crewList[index] = { ...this.crewList[index], ...updatedCrew };
      this.crewSubject.next([...this.crewList]);
      this.saveToLocalStorage();
      return of(updatedCrew);
    }
    return of(null);
  }

  deleteCrew(id: string): Observable<any> {
    this.crewList = this.crewList.filter((crew) => crew.id !== id);
    this.crewSubject.next([...this.crewList]);
    this.saveToLocalStorage();
    return of(id);
  }

  // Certificate CRUD
  getCertificates(): Observable<Certificate[]> {
    return of(this.certificateList);
  }

  addCertificate(certificate: Certificate): Observable<any> {
    certificate.id = (this.certificateList.length + 1).toString();
    this.certificateList.push(certificate);
    this.saveToLocalStorage();
    return of(certificate);
  }

  // CertificateType CRUD
  getCertificateTypes(): Observable<CertificateType[]> {
    return of(this.certificateTypeList);
  }

  addCertificateType(certificateType: CertificateType): void {
    certificateType.id = (this.certificateTypeList.length + 1).toString();
    this.certificateTypeList.push(certificateType);
    this.saveToLocalStorage();
  }
}
