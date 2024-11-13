import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonceComponent } from './anonce.component';

describe('AnonceComponent', () => {
  let component: AnonceComponent;
  let fixture: ComponentFixture<AnonceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AnonceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AnonceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
