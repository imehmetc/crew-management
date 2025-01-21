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
import { CertificateType, CrewService } from '../../services/crew.service';

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
  ],
})
export class CrewAddDialogComponent {
  crewForm: FormGroup;
  certificateForm: FormGroup;
  titles = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];
  certificateTypes: CertificateType[] = [];
  certificates: {
    type: string;
    issueDate: string;
    expiryDate: string;
    certificateTypeId: string;
  }[] = [];
  isCertificateFormVisible = false;

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private dialogRef: MatDialogRef<CrewAddDialogComponent>
  ) {
    this.crewForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      title: ['', Validators.required],
      dailyRate: [null, [Validators.required, Validators.min(0)]],
      currency: ['', Validators.required],
      nationality: ['', Validators.required],
      daysOnBoard: [null, [Validators.required, Validators.min(0)]],
    });

    this.certificateForm = this.fb.group({
      type: ['', Validators.required],
      issueDate: ['', Validators.required],
      expiryDate: ['', Validators.required],
    });
  }

  ngOnInit() {
    // Sertifika türlerini getirmek için service'i çağırıyoruz
    this.crewService.getCertificateTypes().subscribe((types) => {
      this.certificateTypes = types;
    });
  }

  addCertificate() {
    this.isCertificateFormVisible = true;
    this.certificateForm.reset();
  }

  // Sertifikayı kaydetme işlemi
  saveCertificate() {
    console.log(this.certificateForm.valid);
    if (this.certificateForm.valid) {
      const certificateData = {
        id: (this.certificates.length + 1).toString(),
        crewId: this.crewForm.value.id,
        type: this.certificateForm.value.type,
        certificateTypeId: this.certificateForm.value.type,
        issueDate: this.certificateForm.value.issueDate,
        expiryDate: this.certificateForm.value.expiryDate,
      };

      console.log(certificateData);

      this.certificates.push(certificateData);
      this.certificateForm.reset();
      this.isCertificateFormVisible = false;
    }
  }

  async saveCrew() {
    if (this.crewForm.valid) {
      const crewData = {
        id: (this.certificates.length + 1).toString(),
        ...this.crewForm.value,
        totalIncome:
          this.crewForm.value.dailyRate * this.crewForm.value.daysOnBoard,
      };

      try {
        const response = await this.crewService.saveCrew(crewData);

        console.log('Crew saved:', response);
        this.close(); // Başarıyla kaydedildikten sonra dialogu kapatabilirsiniz
      } catch (error) {
        console.error('Error saving crew:', error);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
