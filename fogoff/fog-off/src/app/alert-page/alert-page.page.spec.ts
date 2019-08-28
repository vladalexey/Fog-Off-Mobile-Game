import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertPagePage } from './alert-page.page';

describe('AlertPagePage', () => {
  let component: AlertPagePage;
  let fixture: ComponentFixture<AlertPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
