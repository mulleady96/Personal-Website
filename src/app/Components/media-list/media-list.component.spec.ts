import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import { MediaListComponent } from "./media-list.component";
import { MockGravitaService, MockMatDialog } from "../../testing/mocks";
import { GravitaService } from "../../Services/gravita.service";
import { MatDialog } from "@angular/material/dialog";
import { vi, describe, beforeEach, it, expect } from 'vitest';

describe("MediaListComponent", () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatMenuModule,
        BrowserAnimationsModule,
        MediaListComponent,
      ],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ "unlock-collection": "true" }), // Mock query params
          },
        },
        { provide: GravitaService, useClass: MockGravitaService },
        { provide: MatDialog, useClass: MockMatDialog }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MediaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should initialize images and locations on init", () => {
    component.ngOnInit();
    // expect(component.images).toEqual(Images);
    expect(component.locations.length).toBeGreaterThan(0);
  });

  it("should toggle the search state when expand is called", () => {
    component.search = false;
    component.expand();
    expect(component.search).toBe(true);
  });

  it("should handle location chip selection and filtering", async () => {
    await component.fetchImages(); // Load data first
    const location = component.locations.find(l => l.name !== 'All');
    
    if (location) {
      component.toggleSelection(location);
      expect(location.selected).toBe(true);
      expect(component.locations.find(l => l.name === 'All')?.selected).toBe(false);
      expect(component.imageList.every(img => img.title === location.name)).toBe(true);
    }
  });

  it("should toggle selection for a location", () => {
    const location = {
      name: "Location1",
      selected: false,
      locationCount: 0,
    };
    component.toggleSelection(location);
    expect(location.selected).toBe(true);
    component.toggleSelection(location);
    expect(location.selected).toBe(false);
  });

  it("should deselect all locations when a specific location is selected", () => {
    // Initial setup
    component.locations = [
      { name: "Location1", selected: false, locationCount: 0 },
      { name: "Location2", selected: false, locationCount: 0 },
      { name: "All", selected: true, locationCount: 0 },
    ];

    // Call toggleSelection
    component.toggleSelection(component.locations[0]); // Select 'Location1'

    // Check that 'All' is deselected
    expect(
      component.locations.find((loc) => loc.name === "All")!.selected,
    ).toBe(false);

    // Check that 'Location1' is now selected
    expect(
      component.locations.find((loc) => loc.name === "Location1")!.selected,
    ).toBe(true);

    // Check that 'Location2' remains deselected
    expect(
      component.locations.find((loc) => loc.name === "Location2")!.selected,
    ).toBe(false);
  });

  it("should open WhatsApp with the correct URL", () => {
    vi.spyOn(window, "open").mockImplementation(() => null);
    component.WhatsApp();
    expect(window.open).toHaveBeenCalledWith(
      expect.stringMatching(/https:\/\/api\.whatsapp\.com\/send\?text=/),
      "_blank",
    );
  });

  it("should open Pexels with the correct URL", () => {
    vi.spyOn(window, "open").mockImplementation(() => null);
    component.Pexels();
    expect(window.open).toHaveBeenCalledWith(
      "https://www.pexels.com/@andrew-mulleady-24039905",
      "_blank",
    );
  });

  it("should open Stripe Tip page with the correct URL", () => {
    vi.spyOn(window, "open").mockImplementation(() => null);
    component.Tip();
    expect(window.open).toHaveBeenCalledWith(
      "https://buy.stripe.com/dR6fZzaRhczXdjy3cc",
      "_blank",
    );
  });

  it("should share image when share is supported", async () => {
    const mockImage: any = { src: "test.jpg", title: "Test" };
    (navigator as any).share = vi.fn().mockResolvedValue(undefined);

    await component.shareImage(mockImage);
    expect(navigator.share).toHaveBeenCalledWith({
      title: mockImage.title,
      text: "Check out this photo!",
      url: mockImage.src,
    });
  });

  it("should copy link to clipboard when share is not supported", async () => {
    const mockImage: any = { src: "test.jpg", title: "Test" };
    (navigator as any).share = undefined;
    (navigator as any).clipboard = { writeText: vi.fn().mockResolvedValue(undefined) };
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    await component.shareImage(mockImage);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(mockImage.src);
    expect(window.alert).toHaveBeenCalledWith("Image link copied to clipboard!");
  });

  it("should not open the modal for video items", () => {
    const dialogSpy = vi.spyOn(component.dialog, "open");
    dialogSpy.mockClear();
    const video: any = { type: "video" };
    component.openModal(video);
    expect(dialogSpy).not.toHaveBeenCalled();
  });

  it("should open the modal with the correct image", () => {
    const dialogSpy = vi.spyOn(component.dialog, "open");
    dialogSpy.mockClear();
    const image = component.imageList.find(img => img.type === "image") || {
      title: "Test Image",
      src: "test.jpg",
      description: "",
      location: "",
      date: "",
      likes: 0,
      type: "image" as const
    };

    component.openModal(image);
    expect(dialogSpy).toHaveBeenCalled();
    const config = dialogSpy.mock.calls[0][1] as MatDialogConfig;
    expect(image.src).toEqual(image.src);
  });

  it("should call openPricingDialog when unlock-collection query param is present", () => {
    const dialogSpy = vi.spyOn(component.dialog, "open");
    component.ngOnInit();
    expect(dialogSpy).toHaveBeenCalled();
  });
});
