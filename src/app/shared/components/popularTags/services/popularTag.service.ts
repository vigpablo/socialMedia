import { Injectable } from "@angular/core";
import { Observable, map } from "rxjs";
import { PopularTagType } from "src/app/shared/types/popularTag.type";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { GetPopularTagsResponseInterface } from "../types/getPopularTagsResponse.interface";


@Injectable({
  providedIn: 'root',
})
export class PopularTagService {
  constructor(private http: HttpClient){}

  getPopularTags(): Observable<PopularTagType[]> {
    const url = environment.apiUrl + '/tags'
    return this.http.get<GetPopularTagsResponseInterface>(url)
    .pipe(map((response) => response.tags))
  } //de no usar redux este sería el método para hacer la petición, obtener los tags y faltaria asignarlos a una variable para renderizarlos en el html.
}
