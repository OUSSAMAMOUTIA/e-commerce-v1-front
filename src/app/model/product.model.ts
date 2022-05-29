export class Product {
  id!:number;
  name!:string;
  description!:string;
  currentPrice!:number;
  quantity!:number;
  promotion!:boolean;
  selected!:boolean;
  available!:boolean;
  photoName!:string;
  _links!:{
    self:{
      href:string
    },
    category:{
      href:string
    },
    product:{
      href:string
    }
  }
}
