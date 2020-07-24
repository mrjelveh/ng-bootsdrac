import {ViewportScroller, DOCUMENT} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {Component, NgZone, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {filter, pluck} from 'rxjs/operators';

import {environment} from '../environments/environment';
import {componentsList} from './shared';
import {Analytics} from './shared/analytics/analytics';
import {of} from 'rxjs';


@Component({selector: 'ngbd-app', templateUrl: './app.component.html'})
export class AppComponent implements OnInit {
  downloadCount = '';
  navbarCollapsed = true;

  components = componentsList;

  constructor(
    @Inject(DOCUMENT) private document: Document,
      private _analytics: Analytics, route: ActivatedRoute, vps: ViewportScroller, zone: NgZone,
      httpClient: HttpClient) {
    route.fragment.pipe(filter(fragment => !!fragment))
        .subscribe(fragment => zone.runOutsideAngular(() => requestAnimationFrame(() => vps.scrollToAnchor(fragment))));

    // if (environment.production) {
    //   httpClient.get<{downloads: string}>('https://api.npmjs.org/downloads/point/last-month/@ng-bootstrap/ng-bootstrap')
    //       .pipe(pluck('downloads'))
    //       .subscribe(count => this.downloadCount = count.toLocaleString(), () => of(''));
    // }
  }

  ngOnInit(): void { this._analytics.trackPageViews(); }

  loadTheme(cssLink: string) {
    const head = this.document.getElementsByTagName('head')[0];

    let themeLink = this.document.getElementById(
      'bootsdrac-theme'
    ) as HTMLLinkElement;
    if (themeLink) {
      themeLink.href = cssLink;
    } else {
      const style = this.document.createElement('link');
      style.id = 'bootsdrac-theme';
      style.rel = 'stylesheet';
      style.type = 'text/css';
      style.href = `./${cssLink}`;

      head.appendChild(style);
  }
  }
}
