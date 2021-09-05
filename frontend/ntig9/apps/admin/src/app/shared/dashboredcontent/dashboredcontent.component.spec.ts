import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboredcontentComponent } from './dashboredcontent.component';

describe('DashboredcontentComponent', () => {
  let component: DashboredcontentComponent;
  let fixture: ComponentFixture<DashboredcontentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboredcontentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboredcontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
