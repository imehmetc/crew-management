import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesModalComponent } from './certificates-modal.component';

describe('CertificatesModalComponent', () => {
  let component: CertificatesModalComponent;
  let fixture: ComponentFixture<CertificatesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificatesModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificatesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
