import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileAnalysis } from './file-analysis';

describe('FileAnalysis', () => {
  let component: FileAnalysis;
  let fixture: ComponentFixture<FileAnalysis>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FileAnalysis]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileAnalysis);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
