// src/app/services/api.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Export da interface
export interface User { 
  id: number;
  name: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
// Export da classe
export class ApiService {
  
  private apiUrl = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }
}