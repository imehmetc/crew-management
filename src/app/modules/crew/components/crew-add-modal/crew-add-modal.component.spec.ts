import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrewAddModalComponent } from './crew-add-modal.component';

describe('CrewAddModalComponent', () => {
  let component: CrewAddModalComponent;
  let fixture: ComponentFixture<CrewAddModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrewAddModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrewAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
