import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { RoutedApp, RoutedAppConfig } from '@microfrontend/client';
import { Level } from '@microfrontend/common';
import { filter } from 'rxjs';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'app1';
  config = new RoutedAppConfig('a', 'http://localhost:4200', Level.LOG);
  routedApp = new RoutedApp(this.config);
  name = new FormControl('');

  constructor(private router: Router) {
    this.initRoutedApp();
  }

  initRoutedApp(): void {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((ene) => {
        const e = <NavigationEnd>ene;
        this.routedApp.sendRoute(e.url);
      });

    this.routedApp.registerCustomFrameConfigCallback((cfg) =>
      console.log('CHILD received frame config: ', cfg)
    );
    this.routedApp.registerRouteChangeCallback((activated, url) => {
      console.log('url-------', url);
      if (url) {
        this.navigate(url);
      } else {
        this.navigate('/');
      }

      console.debug(`app-a was activated: ${activated}`);
    });
    this.routedApp.registerBroadcastCallback((tag, data) => {
      // console.debug('app-a received broadcast', { tag, data });
      // console.debug(`app-a hasShell: ${this.routedApp.hasShell}`);
    });

    this.routedApp.setFrameStyles({ 'background-color': 'white' });
  }

  private navigate(url: string): void {
    this.router.navigateByUrl(url, { replaceUrl: true });
  }

  getConfig(): void {
    if (this.routedApp.hasShell) {
      console.log('requestCustomFrameConfiguration');
      this.routedApp.requestCustomFrameConfiguration();
    }
  }

  sendBroadcast(name: string | null | undefined): void {
    this.routedApp.broadcast('test broadcast', { name });
  }
}
