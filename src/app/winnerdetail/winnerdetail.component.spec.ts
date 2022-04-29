import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerdetailComponent } from './winnerdetail.component';

describe('WinnerdetailComponent', () => {
  let component: WinnerdetailComponent;
  let fixture: ComponentFixture<WinnerdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WinnerdetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
