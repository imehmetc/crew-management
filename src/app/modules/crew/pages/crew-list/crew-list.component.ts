import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { Crew, CrewService } from '../../services/crew.service';
import { Router, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesModalComponent } from '../../components/certificates-modal/certificates-modal.component';
import { CrewAddDialogComponent } from '../../components/crew-add-modal/crew-add-modal.component';
import { CrewEditModalComponent } from '../../components/crew-edit-modal/crew-edit-modal.component';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-crew-list',
  imports: [
    TranslateModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CommonModule,
    MatMenuModule,
    RouterModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatSnackBarModule,
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent {
  displayedColumns: string[] = [
    'rowNumber',
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'certificates',
    'actions',
  ];

  dataSource: Crew[] = [];
  totalIncomeByCurrency: { [currency: string]: number } = {};
  showDetails = false;

  constructor(
    private router: Router,
    private crewService: CrewService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crews) => {
      this.dataSource = crews;
      this.calculateTotalIncomeByCurrency();
      console.log(this.crewService.getCrewList());
    });
  }

  calculateTotalIncomeByCurrency() {
    this.totalIncomeByCurrency = {};
    this.dataSource.forEach((crew) => {
      const currency = crew.currency;
      const totalIncome = crew.totalIncome;

      if (!this.totalIncomeByCurrency[currency]) {
        this.totalIncomeByCurrency[currency] = 0;
      }

      this.totalIncomeByCurrency[currency] += totalIncome;
    });
  }

  getTotalIncomeKeys(): string[] {
    return Object.keys(this.totalIncomeByCurrency);
  }

  viewDetails(crew: any): void {
    this.showDetails = true;
    console.log('Viewing details of:', crew);
    if (crew && crew.id) {
      this.router.navigate([`/crew-card/${crew.id}`]);
    } else {
      console.error('Crew ID is undefined');
    }
  }

  deleteCrew(crew: any): void {
    this.crewService.deleteCrew(crew.id).subscribe(
      () => {
        this.snackBar.open('Crew member deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.dataSource = this.dataSource.filter((c) => c.id !== crew.id);
        this.calculateTotalIncomeByCurrency();
      },
      (error) => {
        this.snackBar.open(
          'Failed to delete crew member. Please try again.',
          'Close',
          {
            duration: 3000,
            panelClass: ['error-snackbar'],
          }
        );
        console.error('Error deleting crew:', error);
      }
    );
  }

  openCrewEditDialog(crew: any): void {
    const dialogRef = this.dialog.open(CrewEditModalComponent, {
      width: '400px',
      data: crew,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
    });
  }

  openCertificatesDialog(crew: any): void {
    const dialogRef = this.dialog.open(CertificatesModalComponent, {
      width: '400px',
      data: { crewId: crew.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('Dialog was closed');
    });
  }

  openCrewAddDialog() {
    this.dialog.open(CrewAddDialogComponent, {
      width: '500px',
      data: {},
    });
  }
}
