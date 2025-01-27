import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewEditModalComponent } from './crew-edit-modal.component';

describe('CrewEditModalComponent', () => {
  let component: CrewEditModalComponent;
  let fixture: ComponentFixture<CrewEditModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewEditModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewEditModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
