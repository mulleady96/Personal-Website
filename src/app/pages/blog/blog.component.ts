import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatChipSelectionChange } from "@angular/material/chips";
import { MarkdownService, MarkdownComponent } from "ngx-markdown";

import { GravitaService } from "../../Services/gravita.service";

import { MatMiniFabButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";

import { MatCard } from "@angular/material/card";

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
    imports: [MatMiniFabButton, MatIcon, MatCard, MarkdownComponent]
})
export class BlogComponent implements OnInit, OnDestroy {
  private gravita = inject(GravitaService);
  private cdr = inject(ChangeDetectorRef);
  markdownText = "";
  prompt: string[] = [];
  responses: ResponseData[] = [];
  originalResponses: ResponseData[] = [];
  selectedValue = 0;
  showArticle = false;
  isLoaded: boolean = false;
  search: boolean = false;
  filters: Filter[] = [
    { name: "All", selected: true },
    { name: "Angular", selected: false },
    { name: "SCSS", selected: false },
    { name: "Javascript", selected: false },
  ];
  private subscription: any;
  chips = [
    { name: "Responses", selected: false },
    { name: "Bloggis' Idea of the Week", selected: false },
    // Add more chips as needed
  ];
  @ViewChild("BloggiTextarea")
  myTextarea!: ElementRef;
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
      const resolvedArticle = data['article'];
      if (resolvedArticle) {
        this.showArticle = true;
        // Find the index of the resolved article
        const index = this.responses.findIndex(r => r['docId'] === resolvedArticle.docId);
        if (index !== -1) {
          this.selectedValue = index;
        }
      } else {
        this.showArticle = false;
      }
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onSearchChange(search: boolean) {
    this.search = search;
  }

  filterPosts(name: string) {
    // based on chip selected, display those items only.
    this.responses = [...this.originalResponses].reverse();
    if (name == "All") return;
    this.responses = this.responses.filter((response) => {
      const prompt = response["prompt"].toLowerCase();
      return prompt.includes(name.toLowerCase());
    });
  }

  onChipSelectionChange(event: MatChipSelectionChange, filter: Filter) {
    if (!event.selected) {
      // Prevent deselection by re-selecting the chip
      event.source.select();
    }
    this.filters.forEach((loc) => (loc.selected = false)); // Deselect all locations
    filter.selected = !filter.selected; // Toggle the selected chip
  }

  async loadResponses() {
    try {
      const data = await this.gravita.getAIQuery();

      this.responses = data.map((doc: any) => ({ docId: doc.id, ...doc.data() }));
      this.originalResponses = [...this.responses];

      this.responses.reverse();
      this.isLoaded = true;
      this.cdr.markForCheck();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  selectedBlog(index: number) {
    if (!this.showArticle) {
       this.selectedValue = index;
       const id = this.responses[index]['docId'];
       this.router.navigate(['blog', id]);
    } else {
       this.router.navigate(['blog']);
       // reset for when we navigate back (if component is reused, though Resolver should handle it)
       this.showArticle = false;
    }
    this.search = false;
  }
}
