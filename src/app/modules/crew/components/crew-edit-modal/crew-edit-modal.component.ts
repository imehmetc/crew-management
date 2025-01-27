import { Component, Inject } from '@angular/core';
import {
  MatDialogRef,
  MatDialogModule,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crew-edit-modal',
  standalone: true,
  templateUrl: './crew-edit-modal.component.html',
  styleUrl: './crew-edit-modal.component.scss',
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
export class CrewEditModalComponent {
  crewForm!: FormGroup;
  titles: string[] = ['Captain', 'Engineer', 'Cooker', 'Mechanicer'];

  constructor(
    private fb: FormBuilder,
    private crewService: CrewService,
    private dialogRef: MatDialogRef<CrewEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public crewData: any,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crewForm = this.fb.group({
      firstName: [this.crewData.firstName, Validators.required],
      lastName: [this.crewData.lastName, Validators.required],
      nationality: [this.crewData.nationality, Validators.required],
      title: [this.crewData.title, Validators.required],
      daysOnBoard: [
        this.crewData.daysOnBoard,
        [Validators.required, Validators.min(0)],
      ],
      dailyRate: [
        this.crewData.dailyRate,
        [Validators.required, Validators.min(0)],
      ],
      currency: [this.crewData.currency, Validators.required],
      totalIncome: [this.calculateTotalIncome(), Validators.required],
    });

    console.log(
      'Initial totalIncome:',
      this.crewForm.get('totalIncome')?.value
    );

    this.crewForm.valueChanges.subscribe(() => {
      if (this.crewForm) {
        const totalIncome = this.calculateTotalIncome();
        this.crewForm.patchValue(
          { totalIncome: totalIncome },
          { emitEvent: false }
        );
      }
    });
  }

  calculateTotalIncome(): number {
    let days = 0,
      rate = 0;

    if (this.crewForm) {
      days = this.crewForm.get('daysOnBoard')?.value || 0;
      rate = this.crewForm.get('dailyRate')?.value || 0;
    } else {
      days = this.crewData.daysOnBoard || 0;
      rate = this.crewData.dailyRate || 0;
    }

    return Number(days * rate);
  }

  updateCrew() {
    this.crewService
      .updateCrew(this.crewData.id, this.crewForm.value)
      .subscribe(
        (response) => {
          this.snackBar.open('Crew updated successfully', 'Close', {
            duration: 3000,
            panelClass: ['success-snackbar'],
          });
          this.dialogRef.close();
        },
        (err) => {
          this.snackBar.open(
            'Failed to update crew. Please try again.',
            'Close',
            {
              duration: 3000,
              panelClass: ['error-snackbar'],
            }
          );
        }
      );
  }

  close() {
    this.dialogRef.close();
  }
}
