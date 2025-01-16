import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateTypeCreateComponent } from './certificate-type-create.component';

describe('CertificateTypeCreateComponent', () => {
  let component: CertificateTypeCreateComponent;
  let fixture: ComponentFixture<CertificateTypeCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CertificateTypeCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertificateTypeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
