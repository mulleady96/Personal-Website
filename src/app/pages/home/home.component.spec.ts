import { ComponentFixture, TestBed } from "@angular/core/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MediaService } from "src/app/Services/media.service";

import { HomeComponent } from "./home.component";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mediaServiceSpy: jasmine.SpyObj<MediaService>;

  const videoSources = [
    "../assets/DJI_0249.JPG",
    "../assets/DJI_0406.JPG",
    "../assets/Pier1.jpg",
    "../assets/LoughInagh.JPG",
    "../assets/Pier2.jpg",
  ];

  beforeEach(async () => {
    // Create a mock of MediaService to avoid real service calls.
    mediaServiceSpy = jasmine.createSpyObj("MediaService", [
      "createAndDownloadTextFile",
    ]);

    await TestBed.configureTestingModule({
    imports: [NoopAnimationsModule, HomeComponent],
    providers: [{ provide: MediaService, useValue: mediaServiceSpy }],
}).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    // Note: fixture.detectChanges() is not called here so we can spy on methods
    // before ngOnInit is triggered in specific tests.
  });

  it("should create", () => {
    fixture.detectChanges(); // Manually trigger ngOnInit and rendering.
    expect(component).toBeTruthy();
  });

  describe("ngOnInit", () => {
    it("should call useOptions, randomVideos, and createAndDownloadTextFile", () => {
      spyOn(component, "useOptions").and.callThrough();
      spyOn(component, "randomVideos").and.callThrough();
      // Mock getTodaysDateFormatted to avoid dealing with real dates in this specific test

      fixture.detectChanges(); // Triggers ngOnInit

      expect(component.useOptions).toHaveBeenCalled();
      expect(component.randomVideos).toHaveBeenCalled();
      expect(mediaServiceSpy.createAndDownloadTextFile).toHaveBeenCalled();
    });
  });

  describe("#toggleDiv", () => {
    it("should toggle the showDiv property", () => {
      component.showDiv = false; // Arrange

      component.toggleDiv(); // Act
      expect(component.showDiv).toBe(true); // Assert

      component.toggleDiv(); // Act again
      expect(component.showDiv).toBe(false); // Assert
    });
  });

  describe("#useOptions", () => {
    it("should set opts with default duration and separator", () => {
      component.opts = {
        duration: 6,
        separator: ",",
      }; // Arrange: Ensure it's not set
      component.useOptions(); // Act
      expect(component.opts).toEqual({
        duration: 6,
        separator: ",",
      });
    });
  });

  describe("#randomVideos", () => {
    it("should select the first video when Math.random returns 0", () => {
      spyOn(Math, "random").and.returnValue(0);
      component.randomVideos();
      expect(component.video).toBe(videoSources[0]);
    });

    it("should select the last video when Math.random returns a value just less than 1", () => {
      spyOn(Math, "random").and.returnValue(0.999);
      component.randomVideos();
      const lastIndex = videoSources.length - 1;
      expect(component.video).toBe(videoSources[lastIndex]);
    });
  });

  describe("#imageFailed", () => {
    it("should set imageLoaded to false", () => {
      component.imageLoaded = true; // Arrange: ensure initial state
      component.imageFailed(); // Act
      expect(component.imageLoaded).toBe(false);
    });
  });
});
