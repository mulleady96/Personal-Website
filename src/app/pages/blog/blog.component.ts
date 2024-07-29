import { GravitaService } from "./../../Services/gravita.service";
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from "@angular/core";
import * as ClipboardJS from "clipboard";
import { MarkdownService } from "ngx-markdown";

@Component({
  selector: "app-blog",
  templateUrl: "./blog.component.html",
  styleUrls: ["./blog.component.css"],
})
export class BlogComponent implements OnInit, OnDestroy {
  // chips thread 1 - 5. Arrow up down to view answers.
  // have side menu / dropdown box with list of prompts/headings and can click on prompt to scroll to that answer.
  markdownText = "";
  prompt = "";
  loading = false;
  markdownContent: any = ``;
  allContent: any;
  responses = [];
  selectedValue = 0;
  showArticle = false;

  limit;
  currentUser;
  private subscription;
  private clipboard: ClipboardJS;
  chips = [
    { name: "Responses", selected: false },
    { name: "Bloggis' Idea of the Week", selected: false },
    // Add more chips as needed
  ];
  @ViewChild("BloggiTextarea") myTextarea: ElementRef;

  constructor(
    private gravita: GravitaService,
    private markdownService: MarkdownService
  ) {
    // get limit - disable input if 0.
    // this.gravita.getLimit("sGNbtnG9rFj4mL2akP5O", false).then((data) => {
    //   this.limit = data.AILimit;
    // });
  }

  ngOnInit(): void {
    this.gravita.getAIQuery().then((data) => {
      data.forEach((doc) => {
        this.responses.unshift(doc.data());
      });
    });

    this.toggleSelection(this.chips[0]);
  }

  ngOnDestroy(): void {
    if (this.clipboard) {
      this.clipboard.destroy();
    }
  }

  selectedBlog(index) {
    this.selectedValue = index;
    this.showArticle = !this.showArticle;
  }

  toggleSelection(chip: any) {
    this.chips.forEach((c) => (c.selected = false)); // Deselect all chips
    chip.selected = true; // Select the clicked chip
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
