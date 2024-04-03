import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
  styleUrl: './lazy-image.component.css'
})

export class LazyImageComponent implements OnInit{
  
  public hasLoader:boolean=false

  @Input()
  public url!:string;

  @Input()
  public alt:string="";

  ngOnInit(): void {
    if(!this.url)  throw new Error('Url is requerid');
  }

  onLoad(){
    //console.log("Img loader")
    setTimeout(()=>{
      this.hasLoader=true
    },100)
    
  }
}
