import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelectModalComponent } from './delect-modal.component';

describe('DelectModalComponent', () => {
  let component: DelectModalComponent;
  let fixture: ComponentFixture<DelectModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelectModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelectModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
