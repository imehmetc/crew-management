import { Component } from '@angular/core';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { Certificate, CrewService } from '../../services/crew.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  DateAdapter,
  MAT_DATE_FORMATS,
  NativeDateAdapter,
} from '@angular/material/core';
import { FormArray } from '@angular/forms';

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-crew-add-dialog',
  standalone: true,
  templateUrl: './crew-add-modal.component.html',
  styleUrls: ['./crew-add-modal.component.css'],
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    TranslateModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS },
  ],
})
export class CrewAddDialogComponent {
  crewForm: FormGroup;
  titles: string[] = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];
  certificateTypes: any[] = [];
  certificates: any[] = [];
  certificatesVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private dialogRef: MatDialogRef<CrewAddDialogComponent>,
    private snackBar: MatSnackBar
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      dailyRate: [null, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      nationality: ['', Validators.required],
      daysOnBoard: [null, [Validators.required, Validators.min(0)]],
      certificates: this.fb.array([]),
    });
  }

  ngOnInit() {
    this.loadCertificateTypes();
    this.loadCertificates();
  }

  loadCertificateTypes() {
    this.crewService.getCertificateTypes().subscribe(
      (data) => {
        this.certificateTypes = data;
      },
      (error) => {
        console.error('Error loading certificate types:', error);
      }
    );
  }

  loadCertificates() {
    this.crewService.getCertificates().subscribe(
      (data) => {
        this.certificates = data;
      },
      (error) => {
        console.error('Error loading certificates:', error);
      }
    );
  }

  get certificatesFormArray(): FormArray {
    return this.crewForm.get('certificates') as FormArray;
  }

  toggleCertificates() {
    this.certificatesVisible = !this.certificatesVisible;
    if (this.certificatesVisible) {
      if (this.certificatesFormArray.length === 0) {
        this.addCertificate();
      }
    }
  }

  addCertificate() {
    const certificateGroup = this.fb.group({
      certificateTypeId: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });

    this.certificatesFormArray.push(certificateGroup);
  }

  saveCrew() {
    if (this.crewForm.valid) {
      const crewData = {
        ...this.crewForm.value,
        totalIncome:
          this.crewForm.value.dailyRate * this.crewForm.value.daysOnBoard,
      };

      const certificates: Certificate[] = this.crewForm.value.certificates.map(
        (certificate: any) => ({
          certificateTypeId: certificate.certificateTypeId,
          issueDate: certificate.issueDate,
          expiryDate: certificate.expiryDate,
        })
      );

      this.crewService.addCrew(crewData).subscribe(
        (response) => {
          if (certificates.length > 0) {
            certificates.forEach((certificate: Certificate) => {
              const certificateData = {
                ...certificate,
                crewId: response.id,
              };
              this.crewService.addCertificate(certificateData).subscribe(
                (certificateResponse) => {
                  console.log('Certificate added:', certificateResponse);
                },
                (error) => {
                  console.error('Error adding certificate:', error);
                }
              );
            });
          }

          // Success message
          this.snackBar.open('Crew added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });

          this.close();
        },
        (error) => {
          // Error message
          this.snackBar.open('Failed to add crew. Please try again.', 'Close', {
            duration: 3000,
            panelClass: ['error-snackbar'],
          });
          console.error('Error saving crew:', error);
        }
      );
    } else {
      // Warning message if form is invalid
      this.snackBar.open('Please fill all required fields.', 'Close', {
        duration: 3000,
        panelClass: ['warning-snackbar'],
      });
    }
  }

  close() {
    this.dialogRef.close();
  }
}
