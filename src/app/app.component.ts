import { Component } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Router, NavigationEnd, ActivatedRoute, RoutesRecognized } from '@angular/router';
import { filter, map } from 'rxjs/operators';

export enum Layouts {
  Main,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  AllLayouts = Layouts;
  layout?: Layouts;
  
  constructor(private router: Router, private titleService: Title, private metaTagService: Meta, private activatedRoute: ActivatedRoute ) {}
  // We can't use `ActivatedRoute` here since we are not within a `router-outlet` context yet.
  ngOnInit() {

    this.metaTagService.addTags([
      { name: 'keywords', content: 'Mediocrates, Business Community' },
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: 'Pete Romano' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { charset: 'UTF-8' }
    ]);
    
    const appTitle = this.titleService.getTitle();
    this.router
      .events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => {
          let child = this.activatedRoute.firstChild;
          while (child?.firstChild) {
            child = child?.firstChild;
          }
          if (child?.snapshot.data['title']) {
            return child?.snapshot.data['title'];
          }
          return appTitle;
        })
      ).subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
      
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        //console.log(data?.state.root.firstChild);
        //this.layout = data.state.root.firstChild.data.layout;
      }
    });

  }
}
