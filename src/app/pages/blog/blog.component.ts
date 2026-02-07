import {
  Component,
  ElementRef,
  inject,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { MatChipSelectionChange, MatChipListbox, MatChipOption } from "@angular/material/chips";
import { MarkdownService, MarkdownComponent } from "ngx-markdown";

import { GravitaService } from "../../Services/gravita.service";
import { FlexModule } from "@angular/flex-layout/flex";
import { MatMiniFabButton, MatButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { SearchButtonComponent } from "../../Components/search-button/search-button.component";
import { MatProgressSpinner } from "@angular/material/progress-spinner";
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
    imports: [FlexModule, MatMiniFabButton, MatIcon, SearchButtonComponent, MatButton, MatProgressSpinner, MatChipListbox, MatChipOption, MatCard, MarkdownComponent]
})
export class BlogComponent implements OnInit {
  private gravita = inject(GravitaService);
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
    const resolvedArticle = this.route.snapshot.data['article'];
    if (resolvedArticle) {
      this.showArticle = true;
      // Find the index of the resolved article
      const index = this.responses.findIndex(r => r['docId'] === resolvedArticle.docId);
       if (index !== -1) {
        this.selectedValue = index;
      }
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

  sendQuery(event: KeyboardEvent) {
    // generate unique id for anon user. To store their responses.
    if (this.markdownText.trim() !== "") {
      event.preventDefault();
      this.gravita.createAIQuery(this.markdownText);
      this.markdownText = "";
      // Clear the textarea value
      this.myTextarea.nativeElement.value = "";
      // Move the cursor to the start
      this.myTextarea.nativeElement.setSelectionRange(0, 0);
    }
  }

  // reset limit midnight irish time.
  runOnceWeek() {
    // Calculate milliseconds until next week
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;
    const now = new Date();
    const nextWeek = new Date(now.getTime() + millisecondsInWeek);
    const millisecondsUntilNextWeek = nextWeek.getTime() - now.getTime();

    // gen idea of the week.

    // Schedule the function to run once a week
    setInterval(() => {
      // Call bloggi idea of the week function
      // this.weeklyService.runOnceAWeek();
    }, millisecondsUntilNextWeek);
  }
}
