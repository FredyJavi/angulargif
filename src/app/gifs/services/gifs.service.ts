import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

@Injectable({providedIn: 'root'})
export class GifService {

    public gifList:Gif[]=[] //lugar para almacenar la busqueda
    private _tagsHistory:string[]=[];
    private apiKey:string='ynxHBynIxLx0Z1gavGBxZHtJVhhufQtB' //llave de conexion generada por la api
    private serviceUrl:   string = 'https://api.giphy.com/v1/gifs';
    
    constructor(private http:HttpClient) { 
        this.leerLocalStorage()
    }
 
get tagsHistory(){
    return [...this._tagsHistory]; //crea una copia del valor
}

//funcion para eliminar las busuqedas que se repitan
private organizeHistori(tag:string){
    tag=tag.toLowerCase();//pasarlo a minuscula
    if ( this._tagsHistory.includes( tag ) ) {
        this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag )//evitar duplicados
      }
      this._tagsHistory.unshift( tag ); //agrega el elemento
      this._tagsHistory = this.tagsHistory.splice(0,10); //limita las busquedas en 10
      this.savelocalStorage();
    }
//guardar en el local storage
private savelocalStorage():void{
    localStorage.setItem('history',JSON.stringify(this._tagsHistory))
}
//leer o cargar con localstorage
private leerLocalStorage():void{
  if(!localStorage.getItem('history'))return // si no hay nada
    this._tagsHistory=JSON.parse(localStorage.getItem('history')!)
}

 searchTag(tag:string):void{
    if(tag.length==0)return
    this.organizeHistori(tag)
    const params = new HttpParams()
    .set('api_key', this.apiKey )
    .set('limit', '10' )
    .set('q', tag ) //get es un generico que se trea los tipos de datos de la interfaz
    this.http.get<SearchResponse>(`${ this.serviceUrl }/search`, { params })
        .subscribe(resp=>{
            //console.log(resp.data)
            this.gifList=resp.data
            console.log(this.gifList)
        })
    //this._tagsHistory.unshift(tag) //añadirlo al inicio
    //console.log(this.tagsHistory)
    //fetch('https://api.giphy.com/v1/gifs/search?api_key=ynxHBynIxLx0Z1gavGBxZHtJVhhufQtB&q=valoran&limit=10')
    //.then(resp=>resp.json())
    //.then(data=>console.log(data))
    
    }
}