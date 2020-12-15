import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SanphamchayComponent } from './sanphamchay.component';

describe('SanphamchayComponent', () => {
  let component: SanphamchayComponent;
  let fixture: ComponentFixture<SanphamchayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SanphamchayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SanphamchayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
