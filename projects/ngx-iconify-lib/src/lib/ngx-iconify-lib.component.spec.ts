import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxIconifyLibComponent } from './ngx-iconify-lib.component';

describe('NgxIconifyLibComponent', () => {
  let component: NgxIconifyLibComponent;
  let fixture: ComponentFixture<NgxIconifyLibComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxIconifyLibComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NgxIconifyLibComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
