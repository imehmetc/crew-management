import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import {
  CrewService,
  Crew,
  Certificate,
  CertificateType,
} from '../../services/crew.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crew-card',
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    RouterModule,
    MatTableModule,
    MatTabsModule,
    TranslateModule,
  ],
  templateUrl: './crew-card.component.html',
  styleUrl: './crew-card.component.scss',
})
export class CrewCardComponent {
  crewId: string | null = null;
  crew: Crew | null = null;
  certificates: Certificate[] = [];
  certificateTypes: CertificateType[] = [];
  certificatesWithType: { certificate: Certificate; type: string }[] = [];

  constructor(
    private route: ActivatedRoute,
    private crewService: CrewService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.crewId = params.get('id');
      console.log('Crew ID:', this.crewId);
      if (this.crewId) this.getCrewDetails(this.crewId);
    });
  }

  getCrewDetails(id: string) {
    this.crewService.getCrewById(id).subscribe(
      (crew) => {
        this.crew = crew;
        console.log('Crew Details:', this.crew);
        if (this.crew) {
          this.crewService.getCertificates().subscribe(
            (certificates) => {
              // Certificates
              this.certificates = certificates.filter(
                (certificate) => certificate.crewId === id
              );
              console.log('Certificates:', this.certificates);

              // Certificate Types
              this.crewService.getCertificateTypes().subscribe(
                (types) => {
                  this.certificatesWithType = this.certificates.map(
                    (certificate) => {
                      const certificateType = types.find(
                        (type) => type.id === certificate.certificateTypeId
                      );
                      return {
                        certificate,
                        type: certificateType
                          ? certificateType.type
                          : 'Unknown',
                      };
                    }
                  );
                  console.log(
                    'Certificates with types:',
                    this.certificatesWithType
                  );
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
        } else {
          console.error('Crew not found');
        }
      },
      (error) => {
        console.error('Error fetching crew details:', error);
      }
    );
  }
}
