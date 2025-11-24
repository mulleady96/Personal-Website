import { Injectable, signal } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private _isDarkTheme = signal(false);
  readonly isDarkTheme = this._isDarkTheme.asReadonly();

  switchTheme(themeName: string) {
    console.log(themeName);

    document.body.className = ""; // Remove existing theme classes
    document.body.classList.add(`theme-${themeName}`);
  }

  setDarkTheme(isDarkTheme: boolean) {
    this._isDarkTheme.set(isDarkTheme);
  }
}
