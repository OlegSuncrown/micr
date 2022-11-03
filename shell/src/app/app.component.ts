import { Component } from '@angular/core';
import {
  FrameConfig,
  IAppConfig,
  MetaRouter,
  MetaRouterConfig,
  UnknownRouteHandlingEnum,
} from '@microfrontend/controller';
import { OutletState } from '@microfrontend/controller/lib/outlet-state';
import { Level } from '@microfrontend/common';

const routes: IAppConfig[] = [
  {
    metaRoute: 'a',
    baseUrl: 'http://localhost:4201',
  },
  // {
  //   metaRoute: 'a',
  //   baseUrl: 'http://localhost:3000',
  // },
];
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = '';
  router: MetaRouter;

  constructor() {
    const config = new MetaRouterConfig(
      'outlet1',
      routes,
      (tag: any, data: any) => {
        console.log('!!!!Received:', { tag, data });
        this.name = data.name;
      },
      new FrameConfig({ test: 'myConfig' }, {}, { class: 'my-outlet-frame' }),
      UnknownRouteHandlingEnum.ThrowError,
      Level.LOG
    );

    this.router = new MetaRouter(config);

    this.router.outletStateChanged = (state: OutletState) =>
      this.logState(state);

    this.router.registerAllowStateDiscardCallbackAsync(
      async (metaroute: string, subRoute?: string) => {
        console.log(
          `registerAllowStateDiscardCallbackAsync: ${metaroute}/${subRoute}`
        );
        if (subRoute) {
          if (subRoute === 'a') {
            return Promise.resolve(false);
          } else {
            return Promise.resolve(true);
          }
        }

        return Promise.resolve(true);
      }
    );
  }

  ngOnInit(): void {
    this.init();
  }

  async init(): Promise<void> {
    //Uncomment to preload the microfrontend
    //await this.router.preload([routes[0]]);
    await this.router.preload();
    await this.router.initialize();
  }

  async go(route: string, subrote?: string): Promise<void> {
    await this.router.go(route, subrote);
  }

  broadcast(): void {
    this.router.broadcast('custom_tag', { message: 'Message from router' }, [
      'a',
    ]);
  }

  logState(state: OutletState): void {
    console.log(
      `Active route in '${state.outlet}' is '${state.activeRoute.url}'`
    );
  }
}
