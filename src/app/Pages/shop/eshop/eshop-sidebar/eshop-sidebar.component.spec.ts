import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EshopSidebarComponent } from './eshop-sidebar.component';

describe('EshopSidebarComponent', () => {
  let component: EshopSidebarComponent;
  let fixture: ComponentFixture<EshopSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EshopSidebarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EshopSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
