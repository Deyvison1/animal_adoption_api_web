import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMotivoNotPublishedComponent } from './modal-motivo-not-published.component';

describe('ModalMotivoNotPublishedComponent', () => {
  let component: ModalMotivoNotPublishedComponent;
  let fixture: ComponentFixture<ModalMotivoNotPublishedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMotivoNotPublishedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalMotivoNotPublishedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
