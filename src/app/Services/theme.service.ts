import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _darkTheme: Subject<boolean> = new Subject<boolean>();
  // isDarkTheme = this._darkTheme.asObservable();

  // removeClass() {
  //   var element = document.getElementById("cardStyle");
  //   element.classList.remove("landing-default");
  //   var element = document.getElementById("cardStyle2");
  //   element.classList.remove("landing-default2");
  //   var element = document.getElementById("cardStyle3");
  //   element.classList.remove("landing-default3");
  // }

  // addClass(){
  //   var element = document.getElementById("cardStyle");
  //   element.classList.add("landing-default");
  //   var element = document.getElementById("cardStyle2");
  //   element.classList.add("landing-default2");
  //   var element = document.getElementById("cardStyle3");
  //   element.classList.add("landing-default3");
  // }
  switchTheme(themeName: string) {
    console.log(themeName);

    document.body.className = ""; // Remove existing theme classes
    document.body.classList.add(`theme-${themeName}`);
  }

  private darkThemeSubject = new BehaviorSubject<boolean>(false);
  isDarkTheme = this.darkThemeSubject.asObservable();

  // setDarkTheme(isDark: boolean) {
  //   this.darkThemeSubject.next(isDark);
  // }

  setDarkTheme(isDarkTheme: boolean) {
    try {
      this._darkTheme.next(isDarkTheme);
    } catch (error) {
      console.log("Div class not rendered.");
    }
  }
}
