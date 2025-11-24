import { HttpClientTestingModule } from "@angular/common/http/testing";
import { TestBed } from "@angular/core/testing";
import {
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotMetadata,
} from "firebase/firestore";
import { MarkdownService } from "ngx-markdown";

import { GravitaService } from "../../Services/gravita.service";
import { BlogComponent } from "./blog.component";

describe("Blog Component", () => {
  let component: BlogComponent;
  let gravitaService: jasmine.SpyObj<GravitaService>;
  let markdownService: jasmine.SpyObj<MarkdownService>;

  beforeEach(() => {
    // Create spy objects for the services
    gravitaService = jasmine.createSpyObj("GravitaService", [
      "getAIQuery",
      "createAIQuery",
    ]);
    markdownService = jasmine.createSpyObj("MarkdownService", [
      "compile",
      "render",
    ]);

    TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, BlogComponent],
    providers: [
        { provide: GravitaService, useValue: gravitaService },
        { provide: MarkdownService, useValue: markdownService },
    ],
});

    const fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
  });

  it("should populate responses with data from getAIQuery", async () => {
    // Mock data to return from getAIQuery
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

    // Ensure getAIQuery returns a resolved promise
    gravitaService.getAIQuery.and.returnValue(Promise.resolve(mockData));

    // Call ngOnInit to trigger the data fetching
    await component.ngOnInit();

    // Verify that the responses array is populated correctly
    expect(component.responses.length).toBe(3);
    expect(component.responses[0]).toEqual({ id: 3, value: "response3" });
    expect(component.responses[1]).toEqual({ id: 2, value: "response2" });
    expect(component.responses[2]).toEqual({ id: 1, value: "response1" });
  });
});
