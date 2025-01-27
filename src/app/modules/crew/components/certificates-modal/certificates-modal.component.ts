import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  CrewService,
  Certificate,
  CertificateType,
} from '../../services/crew.service';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-certificates-modal',
  imports: [
    MatDialogModule,
    MatListModule,
    TranslateModule,
    CommonModule,
    MatIconModule,
  ],
  templateUrl: './certificates-modal.component.html',
  styleUrls: ['./certificates-modal.component.scss'],
})
export class CertificatesModalComponent implements OnInit {
  certificates: Certificate[] = [];
  certificateTypes: CertificateType[] = [];
  certificatesWithType: { certificate: Certificate; type: string }[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private crewService: CrewService,
    private dialogRef: MatDialogRef<CertificatesModalComponent>
  ) {}

  ngOnInit() {
    const crewId = this.data.crewId;
    if (crewId) {
      this.getCertificatesByCrewId(crewId);
    }
  }

  getCertificatesByCrewId(crewId: string) {
    this.crewService.getCertificates().subscribe(
      (certificates) => {
        this.certificates = certificates.filter(
          (certificate) => certificate.crewId === crewId
        );

        this.crewService.getCertificateTypes().subscribe(
          (types) => {
            this.certificateTypes = types;
            this.certificatesWithType = this.certificates.map((certificate) => {
              const certificateType = types.find(
                (type) => type.id === certificate.certificateTypeId
              );
              return {
                certificate,
                type: certificateType ? certificateType.type : 'Unknown',
              };
            });
            console.log('Certificates with types:', this.certificatesWithType);
          },
          (error) => {
            console.error('Error fetching certificate types:', error);
          }
        );
      },
      (error) => {
        console.error('Error fetching certificates:', error);
      }
    );
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
