import { Functions } from '@angular/fire/functions';
import { ComponentFixture, TestBed, fakeAsync, tick } from "@angular/core/testing";
import { CameraKitComponent } from "./camera-kit.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { vi } from 'vitest';

describe("CameraKitComponent", () => {
  let component: CameraKitComponent;
  let fixture: ComponentFixture<CameraKitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [{ provide: Functions, useValue: {} }],
      imports: [CameraKitComponent, BrowserAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CameraKitComponent);
    component = fixture.componentInstance;

    // Spy on lifecycle methods that trigger third-party CameraKit SDK calls 
    // to prevent actual network/device requests during unit tests.
    vi.spyOn(component, 'ngOnInit').mockImplementation(async () => {});
    vi.spyOn(component, 'ngAfterViewInit').mockImplementation(async () => {});

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
    expect(component.facingMode()).toBe("user");
  });

  it("should toggle camera facing mode and restart camera", async () => {
    // Spy on private restartCamera method
    const restartSpy = vi.spyOn(component as any, 'restartCamera').mockImplementation(async () => {});
    
    expect(component.facingMode()).toBe("user");
    
    await component.toggleCamera();
    
    expect(component.facingMode()).toBe("environment");
    expect(restartSpy).toHaveBeenCalled();

    await component.toggleCamera();
    
    expect(component.facingMode()).toBe("user");
    expect(restartSpy).toHaveBeenCalledTimes(2);
  });

  it("should update selected lens on lens select", async () => {
    const applyLensSpy = vi.spyOn(component as any, 'applySelectedLens').mockImplementation(async () => {});
    
    component.selectedLensId.set('test-lens-id');
    await component.onLensSelect();
    
    expect(applyLensSpy).toHaveBeenCalled();
  });

  it("should clean up media streams and session on destroy", () => {
    const mockTrack = { stop: vi.fn() };
    const mockStream = {
      getTracks: () => [mockTrack, mockTrack]
    } as any;
    
    const mockSession = { pause: vi.fn() };

    (component as any).mediaStream = mockStream;
    (component as any).session = mockSession;

    component.ngOnDestroy();

    expect(mockSession.pause).toHaveBeenCalled();
    expect(mockTrack.stop).toHaveBeenCalledTimes(2);
  });
});
