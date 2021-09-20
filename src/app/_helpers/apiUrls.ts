import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ApiUrls {
  mainUrl = 'http://localhost:8091/';

  getCurrentUser = 'api/v1/user/me';
}
