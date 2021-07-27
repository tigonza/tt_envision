import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FetchService } from './fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'prueba Tecnica';
  public movies: Movie[] = [];
  panelOpenState = false;
  public clicked = false;

  constructor (
    private fetchService: FetchService, 
    private snackBar: MatSnackBar
    ) {
  }

  ngOnInit(){
  }

  buttonClick(){
    this.clicked = true;
    this.fetchService.getMovies().subscribe((resp:any) => {
      // fetch movies & sort them by rating
      this.movies = resp.response;
      this.movies.sort((n1,n2) => {
        if (n1.rating > n2.rating) {
          return -1;
        }
    
        if (n1.rating < n2.rating) {
          return 1;
        }
    
        return 0;
      })
      
      // get poster for each
      for(let mov of this.movies){
        this.getPicture(mov)
      }

      // copies the movies array without reference & sorts them by metascore
      var response:Movie[] = Object.assign([], this.movies);
      response.sort((n1,n2) => {
        if (n1.metascore > n2.metascore) {
          return -1;
        }
    
        if (n1.metascore < n2.metascore) {
          return 1;
        }
    
        return 0;
      })
      // once the movie list is sent, a snackbar opens with the response
      this.fetchService.respond(response.map(value => value.title)).subscribe((res:any) => {
        this.openSnackBar(res.message)
      }
      )
    })
  }

  // get movie poster from open free IMBD API (up to 100 querys per day)
  getPicture(movie:Movie){
    this.fetchService.getFullMovie(movie.title+' '+movie.year).subscribe((r:any) => {
      movie.img = r.results[0].image;
    })
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Aceptar');
  }
}

// Movie interface
interface Movie {
  title: string;
  year: number;
  rating: number;
  metascore: number;
  director: string;
  img?: string;
} 