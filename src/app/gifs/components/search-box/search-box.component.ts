import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  
  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  constructor(private gifservice:GifService){}

  searchTag(){
    const newTag=this.tagInput.nativeElement.value
     this.gifservice.searchTag(newTag); //llamamos al servicio que se cargo en el constructor
     this.tagInput.nativeElement.value="" //el valor el input es vacio 
    }
}