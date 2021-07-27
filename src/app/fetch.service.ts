import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})

export class FetchService {
  apiKey = 'k_8qjm3m35';
  get_url = 'https://prod-61.westus.logic.azure.com/workflows/984d35048e064b61a0bf18ded384b6cf/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=6ZWKl4A16kST4vmDiWuEc94XI5CckbUH5gWqG-0gkAw';
  post_url = 'https://prod-62.westus.logic.azure.com/workflows/779069c026094a32bb8a18428b086b2c/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=o_zIF50Dd_EpozYSPSZ6cWB5BRQc3iERfgS0m-4gXUo';
  rut = '18.299.973-3';
  constructor(private http:HttpClient) {}

  getMovies() {
    return this.http.get(this.get_url, {responseType:'json'})
  }

  respond(movieList: string[]) {
    const body = {
      RUT : this.rut,
      Peliculas: movieList
    }
    console.log(movieList)
    return this.http.post(this.post_url, body)
  }

  getFullMovie(name: string) {
    var movieUrl = 'https://imdb-api.com/en/API/SearchMovie/'+this.apiKey+'/'+name;
    return this.http.get(movieUrl, {responseType:'json'})
  }

}
