export default class Product {
  id: string = "";
  title: string;
  price: number;
  image: string;
  description: string;
  category: string;

  constructor(
    title: string,
    price: number,
    image: string,
    description: string,
    category: string
  ) {
    this.title = title;
    this.price = price;
    this.image = image;
    this.description = description;
    this.category = category;
  }

  get ID() {
    return this.id;
  }

  set ID(value: string) {
    this.id = value;
  }
}
