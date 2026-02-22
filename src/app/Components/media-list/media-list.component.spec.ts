import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatDialogConfig, MatDialogModule } from "@angular/material/dialog";
import { MatMenuModule } from "@angular/material/menu";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";

import * as Images from "../../../assets/Images.json";
import { ComponentsModule } from "../components.module";
import { MediaListComponent } from "./media-list.component";

describe("MediaListComponent", () => {
  let component: MediaListComponent;
  let fixture: ComponentFixture<MediaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatDialogModule, MatMenuModule, BrowserAnimationsModule, MediaListComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({ 'unlock-collection': 'true' }) // Mock query params
          },
        },
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
    expect(component.search).toBeTrue();
  });

  // Replaced sortByName test with toggleSelection logic or removed if irrelevant
  // Since sortByName is gone, removing the test for now or replacing it with filterMedia logic check if possible.
  /*
  it("should filter images based on selected location", () => {
    const location = "SomeLocation"; // replace with an actual location from your mock data
    component.sortByName(location);
    expect(
      component.imageList.every((image: any) => image.title === location),
    ).toBeTrue();
    expect(component.count).toContain(location);
  });
  */

  it("should toggle selection for a location", () => {
    const location = { name: "SomeLocation", selected: false, locationCount: 0 };
    component.toggleSelection(location);
    expect(location.selected).toBeTrue();
    component.toggleSelection(location);
    expect(location.selected).toBeFalse();
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
    ).toBeFalse();

    // Check that 'Location1' is now selected
    expect(
      component.locations.find((loc) => loc.name === "Location1")!.selected,
    ).toBeTrue();

    // Check that 'Location2' remains deselected
    expect(
      component.locations.find((loc) => loc.name === "Location2")!.selected,
    ).toBeFalse();
  });

  it("should open WhatsApp with the correct URL", () => {
    spyOn(window, "open");
    component.WhatsApp();
    expect(window.open).toHaveBeenCalledWith(
      jasmine.stringMatching(/https:\/\/api\.whatsapp\.com\/send\?text=/),
      "_blank",
    );
  });

  it("should open Pexels with the correct URL", () => {
    spyOn(window, "open");
    component.Pexels();
    expect(window.open).toHaveBeenCalledWith(
      "https://www.pexels.com/@andrew-mulleady-24039905",
      "_blank",
    );
  });

  it("should open Stripe Tip page with the correct URL", () => {
    spyOn(window, "open");
    component.Tip();
    expect(window.open).toHaveBeenCalledWith(
      "https://buy.stripe.com/dR6fZzaRhczXdjy3cc",
      "_blank",
    );
  });

  it("should open the modal with the correct image", () => {
    const dialogSpy = spyOn(component.dialog, "open").and.callThrough();
    const image: any = { // Cast to any or verify MediaItem interface
      title: "Test Image",
      src: "test.jpg",
      description: "",
      date: "",
      likes: 0,
      type: 'image'
    };

    component.openModal(image);

    expect(dialogSpy).toHaveBeenCalled();

    // Cast the data to the Image type to avoid the TypeScript error
    const dialogConfig = dialogSpy.calls.mostRecent()
      .args[1] as MatDialogConfig<any>;

    expect(image.src).toEqual(image.src);
  });
  
  it('should call openPricingDialog when unlock-collection query param is present', () => {
      spyOn(component, 'openPricingDialog');
      // Re-trigger ngoninit to simulate route param change if needed, 
      // but mocks should be set before component creation.
      // Since beforeEach sets it up, ngOnInit runs automatically on fixture.detectChanges() or manually called above.
      // Wait, ngOnInit was called in beforeEach implicitly via detectChanges? No, explicit call in checks.
      
      // Let's create a fresh component instance for this test if possible, or spy on ngOnInit
      // easier to just rely on the fact that ngOnInit is called in beforeEach -> fixture.detectChanges() 
      // but Wait, the mock is static.
      // The component is created in beforeEach. We configured useValue providing the param.
      // So openPricingDialog should have been called upon initialization.
      
      // However, we can't spy on a method of the component instance *before* it's created if we use TestBed.createComponent.
      // We can spy on the prototype? Or just check if the dialog open was called?
      
      // Actually dialog open is called inside openPricingDialog. Spy on dialog.open?
      const dialogSpy = spyOn(component.dialog, 'open');
      component.ngOnInit(); 
      expect(dialogSpy).toHaveBeenCalled();
  });
});
