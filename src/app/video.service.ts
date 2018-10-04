import { Injectable } from '@angular/core';
import { Http } from "@angular/http";
import 'rxjs/add/operator/map';
@Injectable({
  providedIn: 'root'
})
export class VideoService {
 
  private _getUrl = "api/videos";
  constructor(private _http:Http ) {}

  getVideos(){
    return this._http.get(this._getUrl)
    .map((response: Response) => response.json());
  }
}
