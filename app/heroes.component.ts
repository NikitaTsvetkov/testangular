import { Component } from '@angular/core';
import { Router } from '@angular/router-deprecated';

import { HeroDetailComponent } from './hero-detail.component';
import { Hero } from './hero';
import { HeroService } from './hero.service'
import { OnInit } from '@angular/core';

@Component({
  selector: 'my-heroes',
  templateUrl: 'app/heroes.component.html',
  styleUrls:  ['app/heroes.component.css']
  directives: [HeroDetailComponent],
})
export class HeroesComponent implements OnInit {
  title = 'Tour of Heroes';
  heroes: Hero[];
  selectedHero: Hero;
  onSelect(hero: Hero) { this.selectedHero = hero; };
  getHeroes() {
    this.heroService.getHeroesSlowly().then(heroes => this.heroes = heroes);
  }
  constructor(private router: Router,
              private heroService: HeroService) { }
    ngOnInit() {
    this.getHeroes();
  }  
  gotoDetail() {
    this.router.navigate(['HeroDetail', { id: this.selectedHero.id }]);
  }
}
