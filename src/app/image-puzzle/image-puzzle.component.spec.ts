import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImagePuzzleComponent } from './image-puzzle.component';

describe('ImagePuzzleComponent', () => {
  let component: ImagePuzzleComponent;
  let fixture: ComponentFixture<ImagePuzzleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImagePuzzleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImagePuzzleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
