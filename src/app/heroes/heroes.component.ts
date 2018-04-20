import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
    selector: 'app-heroes',
    templateUrl: './heroes.component.html',
    styleUrls: ['./heroes.component.css']
})

export class HeroesComponent implements OnInit {

    heroes: Hero[];

    constructor(private heroService: HeroService) { }

    ngOnInit() {
        this.getHeroes();
    }

    getHeroes(): void {
        this.heroService.getHeroes()
            .subscribe(heroes => this.heroes = heroes);
    }

    add(id: string, name: string, age: string): void {
        name = name.trim();
        id = id.trim();
        age = age.trim();
        if (!name||!id||!age||   isNaN(Number(id))  ||   isNaN(Number(age))  ) { return; }
        this.heroService.addHero({ id: parseInt(id), name: name, age: parseInt(age) } as Hero)
            .subscribe(hero => {
                this.heroes.push(hero);
            });
        location.reload();
    }

    delete(hero: Hero): void {
        this.heroes = this.heroes.filter(h => h !== hero);
        this.heroService.deleteHero(hero).subscribe();
    }
}