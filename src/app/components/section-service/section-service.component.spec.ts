import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionServiceComponent } from './section-service.component';

describe('SectionServiceComponent', () => {
  let component: SectionServiceComponent;
  let fixture: ComponentFixture<SectionServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectionServiceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SectionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
