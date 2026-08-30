import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  viewChild,
  signal,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatChipSelectionChange } from "@angular/material/chips";
import { MarkdownService, MarkdownComponent } from "ngx-markdown";

import { GravitaService } from "../../Services/gravita.service";

import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { MatCard } from "@angular/material/card";
import { MatProgressSpinner } from "@angular/material/progress-spinner";

type Filter = {
  name: string;
  selected: boolean;
};
interface ResponseData {
  // Define the structure of your response data
  [key: string]: any;
}

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
  imports: [
    MatMiniFabButton,
    MatIcon,
    MatCard,
    MarkdownComponent,
    MatProgressSpinner,
  ],
})
export class BlogComponent implements OnInit, OnDestroy {
  private gravita = inject(GravitaService);
  markdownText = signal("");
  prompt = signal<string[]>([]);
  responses = signal<ResponseData[]>([]);
  originalResponses = signal<ResponseData[]>([]);
  selectedValue = signal(0);
  showArticle = signal(false);
  isLoaded = signal(false);
  search = signal(false);
  filters = signal<Filter[]>([
    { name: "All", selected: true },
    { name: "Angular", selected: false },
    { name: "SCSS", selected: false },
    { name: "Javascript", selected: false },
  ]);
  private subscription: any;
  chips = [
    { name: "Responses", selected: false },
    { name: "Bloggis' Idea of the Week", selected: false },
    // Add more chips as needed
  ];
  myTextarea = viewChild<ElementRef>("BloggiTextarea");
  router = inject(Router);

  constructor() {
    // get limit - disable input if 0.
    // this.gravita.getLimit("sGNbtnG9rFj4mL2akP5O", false).then((data) => {
    //   this.limit = data.AILimit;
    // });
  }

  private route = inject(ActivatedRoute);

  async ngOnInit() {
    await this.loadResponses();
    this.subscription = this.route.data.subscribe((data) => {
      const resolvedArticle = data["article"];
      if (resolvedArticle) {
        this.showArticle.set(true);
        // Find the index of the resolved article
        const index = this.responses().findIndex(
          (r) => r["docId"] === resolvedArticle.docId,
        );
        if (index !== -1) {
          this.selectedValue.set(index);
        }
      } else {
        this.showArticle.set(false);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearchChange(search: boolean) {
    this.search.set(search);
  }

  filterPosts(name: string) {
    // based on chip selected, display those items only.
    let newResponses = [...this.originalResponses()].reverse();
    if (name !== "All") {
      newResponses = newResponses.filter((response) => {
        const prompt = response["prompt"].toLowerCase();
        return prompt.includes(name.toLowerCase());
      });
    }
    this.responses.set(newResponses);
  }

  onChipSelectionChange(event: MatChipSelectionChange, filter: Filter) {
    if (!event.selected) {
      // Prevent deselection by re-selecting the chip
      event.source.select();
    }

    // Create a new array to trigger signal update
    const updatedFilters = this.filters().map((loc) => {
      return { ...loc, selected: loc.name === filter.name };
    });
    this.filters.set(updatedFilters);
  }

  async loadResponses() {
    try {
      const data = await this.gravita.getAIQuery();

      const mappedData = data.map((doc: any) => ({
        docId: doc.id,
        ...doc.data(),
      }));
      this.originalResponses.set([...mappedData]);
      this.responses.set(mappedData.reverse());
      this.isLoaded.set(true);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  selectedBlog(index: number) {
    if (!this.showArticle()) {
      this.selectedValue.set(index);
      const id = this.responses()[index]["docId"];
      this.router.navigate(["blog", id]);
    } else {
      this.router.navigate(["blog"]);
      // reset for when we navigate back (if component is reused, though Resolver should handle it)
      this.showArticle.set(false);
    }
    this.search.set(false);
  }
}
