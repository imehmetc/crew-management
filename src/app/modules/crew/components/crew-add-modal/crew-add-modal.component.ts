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
import { CrewService } from '../../services/crew.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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
  ],
})
export class CrewAddDialogComponent {
  crewForm: FormGroup;
  titles: string[] = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];

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
    });
  }

  saveCrew() {
    if (this.crewForm.valid) {
      const crewData = {
        ...this.crewForm.value,
        totalIncome:
          this.crewForm.value.dailyRate * this.crewForm.value.daysOnBoard,
      };

      try {
        const response = this.crewService.addCrew(crewData);

        // Success
        this.snackBar.open('Crew added successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.close();
      } catch (error) {
        // Error
        this.snackBar.open('Failed to add crew. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });

        console.error('Error saving crew:', error);
      }
    } else {
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
