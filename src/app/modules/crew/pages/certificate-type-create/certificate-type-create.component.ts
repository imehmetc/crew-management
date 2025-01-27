import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { TranslateModule } from '@ngx-translate/core';
import { CertificateType, CrewService } from '../../services/crew.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-certificate-type-create',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    TranslateModule,
    ReactiveFormsModule,
  ],
  templateUrl: './certificate-type-create.component.html',
  styleUrl: './certificate-type-create.component.scss',
})
export class CertificateTypeCreateComponent {
  certificateTypeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private snackBar: MatSnackBar
  ) {
    this.certificateTypeForm = this.fb.group({
      type: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.certificateTypeForm.valid) {
      const newCertificateType: CertificateType = {
        type: this.certificateTypeForm.value.type,
      };

      this.crewService.addCertificateType(newCertificateType).subscribe(
        (response) => {
          this.snackBar.open('Certificate type added successfully!', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.certificateTypeForm.reset();
        },
        (error) => {
          console.error('Error adding certificate type:', error);
          this.snackBar.open(
            'Failed to add certificate type. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
        }
      );
    }
  }
}
