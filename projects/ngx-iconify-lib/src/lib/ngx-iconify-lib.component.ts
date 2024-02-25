import {
  Component,
  computed,
  ElementRef,
  inject,
  Input,
  numberAttribute,
  OnChanges,
  signal,
  SimpleChanges
} from '@angular/core';
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {loadIcon} from "iconify-icon";

@Component({
  selector: 'ngx-iconify',
  standalone: true,
  template: `
    <ng-container>
      @if (loaded){
        <svg [attr.viewBox]="viewBox()" [innerHTML]="path"></svg>
      } @else {
        <div class="placeholder"></div>
      }
    </ng-container>
  `,
  styleUrls:['./ngx-iconify-lib.component.css'],
  host: {
    'class': 'icon',
    '[class.is-loaded]': 'loaded'
  },
})
export class NgxIconifyLibComponent implements OnChanges{
  private _elementRef = inject(ElementRef);
  constructor(private sanitizer:DomSanitizer) {
  }
  @Input({required:true}) name!: string;
  @Input({ transform: numberAttribute })
  set size(size: number) {
    this._elementRef.nativeElement.style.setProperty('--icon-svg-size', size + 'px');
  }
  path: SafeHtml = '';
  loaded = false;
  private _VBWidth = signal(0);
  private _VBHeight = signal(0);
  viewBox = computed( () => `0 0 ${this._VBWidth()} ${this._VBHeight()}`);
  ngOnChanges(changes: SimpleChanges) {
    if (changes['name'] && changes['name'].currentValue !== changes['name'].previousValue) {
      this._load();
    }
  }
  private _load() {
    this.loaded = false;
    loadIcon(this.name)
      .then(data => {
        this.path = this.sanitizer.bypassSecurityTrustHtml(data.body);
        this._VBWidth.set(data.width);
        this._VBHeight.set(data.height);
        this.loaded = true;
      });
  }
}
