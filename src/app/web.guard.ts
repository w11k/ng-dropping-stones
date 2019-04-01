import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebGuard implements CanActivate {
  constructor() {}

  canActivate(): boolean {
    return environment.web;
  }
}
