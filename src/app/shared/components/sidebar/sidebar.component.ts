import { Component } from '@angular/core';
import { GifService } from '../../../gifs/services/gifs.service';

@Component({
  selector: 'shared-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
 constructor(private gifService:GifService){}

 get tags(){
  return this.gifService.tagsHistory;
 }

 searchTag(tag:string):void{
  this.gifService.searchTag(tag)
 }
}
