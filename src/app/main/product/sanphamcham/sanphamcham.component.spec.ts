import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamchamComponent } from './sanphamcham.component';

describe('SanphamchamComponent', () => {
  let component: SanphamchamComponent;
  let fixture: ComponentFixture<SanphamchamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamchamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamchamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
