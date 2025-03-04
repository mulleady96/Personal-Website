import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatChipSelectionChange } from "@angular/material/chips";
import { MarkdownService } from "ngx-markdown";

import { GravitaService } from "../../Services/gravita.service";

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
})
export class BlogComponent implements OnInit, OnDestroy {
  // chips thread 1 - 5. Arrow up down to view answers.
  // have side menu / dropdown box with list of prompts/headings and can click on prompt to scroll to that answer.
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

  constructor(
    private gravita: GravitaService,
    private markdownService: MarkdownService,
  ) {
    // get limit - disable input if 0.
    // this.gravita.getLimit("sGNbtnG9rFj4mL2akP5O", false).then((data) => {
    //   this.limit = data.AILimit;
    // });
  }

  ngOnInit() {
    this.loadResponses();
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

      this.responses = data.map((doc: any) => doc.data());
      this.originalResponses = [...this.responses];

      this.responses.reverse();
      this.isLoaded = true;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  ngOnDestroy(): void {
    // if (this.clipboard) {
    //   this.clipboard.destroy();
    // }
  }

  selectedBlog(index: number) {
    console.log(index === 0);

    this.selectedValue = index;
    this.showArticle = !this.showArticle;
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
