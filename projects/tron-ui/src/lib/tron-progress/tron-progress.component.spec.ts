import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TronProgressComponent } from './tron-progress.component';

describe('TronProgressComponent', () => {
  let fixture: ComponentFixture<TronProgressComponent>;
  let component: TronProgressComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TronProgressComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TronProgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function set(inputs: Record<string, unknown>): void {
    for (const [alias, value] of Object.entries(inputs)) {
      fixture.componentRef.setInput(alias, value);
    }
    fixture.detectChanges();
  }

  function bar(): HTMLElement {
    return fixture.nativeElement.querySelector('[role="progressbar"]');
  }

  function fill(): HTMLElement {
    return fixture.nativeElement.querySelector('.tron-progress__fill');
  }

  it('starts empty on a 0–100 track', () => {
    expect(bar().getAttribute('aria-valuemin')).toBe('0');
    expect(bar().getAttribute('aria-valuemax')).toBe('100');
    expect(bar().getAttribute('aria-valuenow')).toBe('0');
    expect(fill().style.width).toBe('0%');
  });

  it('fills the track as a percent of max', () => {
    set({ value: 40, max: 80 });

    expect(component.$percent()).toBe(50);
    expect(fill().style.width).toBe('50%');
    expect(bar().getAttribute('aria-valuenow')).toBe('40');
    expect(bar().getAttribute('aria-valuemax')).toBe('80');
  });

  it('clamps overflow and a missing scale', () => {
    set({ value: 150, max: 100 });
    expect(component.$percent()).toBe(100);

    set({ value: -10, max: 100 });
    expect(component.$percent()).toBe(0);

    set({ value: 40, max: 0 });
    expect(component.$percent()).toBe(0);
  });

  it('paints the intent on the host, not as a default modifier', () => {
    expect(fixture.nativeElement.querySelector('.tron-progress--success')).toBeNull();

    set({ type: 'success' });
    expect(fixture.nativeElement.querySelector('.tron-progress--success')).not.toBeNull();
  });

  it('drops the numeric now when the amount is unknown', () => {
    set({ value: 40, indeterminate: true });

    expect(bar().hasAttribute('aria-valuenow')).toBeFalse();
    expect(fill().classList.contains('tron-progress__fill--indeterminate')).toBeTrue();
    expect(fill().style.width).toBe('');
  });
});
