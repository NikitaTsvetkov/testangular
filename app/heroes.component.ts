import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service'
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css'],
  directives: [HeroDetailComponent]
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  addingHero: Boolean = false;
  error: any;
  onSelect(hero: Hero) { this.selectedHero = hero; };
  getHeroes() {
    this.heroService.getHeroes().then(heroes => this.heroes = heroes);
  }
  constructor(private router: Router,
              private heroService: HeroService) { }
    ngOnInit() {
    this.getHeroes();
  }
  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
  addHero() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  delete(hero: Hero, event: any) {
    event.stopPropagation();
    this.heroService
        .delete(hero)
        .then(res => {
          this.heroes = this.heroes.filter(h => h !== hero);
          if (this.selectedHero === hero) { this.selectedHero = null; }
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  close(savedHero: Hero) {
    this.addingHero = false;
    if (savedHero) { this.getHeroes(); }
  }
}
