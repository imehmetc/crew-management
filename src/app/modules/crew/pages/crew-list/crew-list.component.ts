import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { CrewService } from '../../services/crew.service';

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

  constructor(private crewService: CrewService) {}

  ngOnInit(): void {
    this.crewService.getCrewList().subscribe((crews) => {
      this.dataSource = crews; // Verileri tabloya aktar
    });
  }
}
