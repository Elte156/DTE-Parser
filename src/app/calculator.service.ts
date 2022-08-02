import { Injectable } from '@angular/core';
import { ParserService } from './parser.service';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  constructor(protected parserService: ParserService) {}
}
