import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { CrewService } from '../../services/crew.service';
import { Router, RouterModule } from '@angular/router';

export interface Crew {
  firstName: string;
  lastName: string;
  nationality: string;
  title: string;
}

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
  ],
  templateUrl: './crew-list.component.html',
  styleUrl: './crew-list.component.scss',
})
export class CrewListComponent {
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'nationality',
    'title',
    'daysOnBoard',
    'dailyRate',
    'currency',
    'totalIncome',
    'actions',
  ];

  dataSource: Crew[] = [];

  constructor(private router: Router, private crewService: CrewService) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crews) => {
      this.dataSource = crews;
    });
  }

  viewDetails(crew: any): void {
    console.log('Viewing details of:', crew);
    if (crew && crew.id) {
      this.router.navigate([`/crew-card/${crew.id}`]);
    } else {
      console.error('Crew ID is undefined');
    }
  }

  editCrew(crew: any): void {
    console.log('Editing crew:', crew);
  }

  deleteCrew(crew: any): void {
    console.log('Deleting crew:', crew);
  }
}
