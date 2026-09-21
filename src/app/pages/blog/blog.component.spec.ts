import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotMetadata,
} from "firebase/firestore";
import { MarkdownService } from "ngx-markdown";
import { ActivatedRoute, Router } from "@angular/router";
import { of } from "rxjs";
import { vi } from "vitest";

import { GravitaService } from "../../Services/gravita.service";
import { BlogComponent } from "./blog.component";
import { Functions } from "@angular/fire/functions";

describe("Blog Component", () => {
  let component: BlogComponent;
  let gravitaService: any;
  let markdownService: any;
  let mockActivatedRoute: any;
  let mockRouter: any;

  beforeEach(() => {
    // Create spy objects for the services
    gravitaService = {
      getBlogCache: vi.fn(),
      createAIQuery: vi.fn(),
    };
    markdownService = {
      compile: vi.fn(),
      render: vi.fn(),
    };

    mockActivatedRoute = {
      data: of({ article: null }),
      snapshot: { data: {} },
    };

    mockRouter = {
      navigate: vi.fn(),
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, BlogComponent],
      providers: [
        { provide: Functions, useValue: {} },
        { provide: GravitaService, useValue: gravitaService },
        { provide: MarkdownService, useValue: markdownService },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
      ],
    });

    const fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
  });

  it("should populate responses with data from getBlogCache", async () => {
    // Mock data to return from getBlogCache
    const mockData: QueryDocumentSnapshot<DocumentData>[] = [
      {
        data: () => ({ id: 1, value: "response1" }),
        id: "1",
        exists: true,
        metadata: {} as SnapshotMetadata,
        ref: {} as any,
        get: (fieldPath: string) => ({ id: 1, value: "response1" }),
      } as unknown as QueryDocumentSnapshot<DocumentData>,
      {
        data: () => ({ id: 2, value: "response2" }),
        id: "2",
        exists: true,
        metadata: {} as SnapshotMetadata,
        ref: {} as any,
        get: (fieldPath: string) => ({ id: 2, value: "response2" }),
      } as unknown as QueryDocumentSnapshot<DocumentData>,
      {
        data: () => ({ id: 3, value: "response3" }),
        id: "3",
        exists: true,
        metadata: {} as SnapshotMetadata,
        ref: {} as any,
        get: (fieldPath: string) => ({ id: 3, value: "response3" }),
      } as unknown as QueryDocumentSnapshot<DocumentData>,
    ];

    // Ensure getBlogCache returns a resolved promise
    gravitaService.getBlogCache.mockResolvedValue(mockData);

    // Call ngOnInit to trigger the data fetching
    await component.ngOnInit();

    // Verify that the responses array is populated correctly
    expect(component.responses().length).toBe(3);
    expect(component.responses()[0]).toEqual({ docId: "3", id: 3, value: "response3" });
    expect(component.responses()[1]).toEqual({ docId: "2", id: 2, value: "response2" });
    expect(component.responses()[2]).toEqual({ docId: "1", id: 1, value: "response1" });
  });
});
