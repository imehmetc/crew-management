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
  titles = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];

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
  }

  async saveCrew() {
    if (this.crewForm.valid) {
      const crewData = {
        id: (333).toString(),
        ...this.crewForm.value,
        totalIncome:
          this.crewForm.value.dailyRate * this.crewForm.value.daysOnBoard,
      };

      try {
        const response = await this.crewService.saveCrew(crewData);

        console.log('Crew saved:', response);
        this.close();
      } catch (error) {
        console.error('Error saving crew:', error);
      }
    }
  }

  close() {
    this.dialogRef.close();
  }
}
