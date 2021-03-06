import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable()
export class ArticleDataService {

  constructor(private http: HttpClient) { }

  getCategoryCounts() {
    return this.http.get('/api/getCounts');
  }

  getArticlesByCategory(category: string) {
    return this.http.get('/api/getArticlesByCategory', {
      params: {
        category
      }
    });
  }

}
