export default class Product {
  id: String = "";
  title: String;
  price: Number;
  image: String;
  description: String;
  category: String;

  constructor(
    title: String,
    price: Number,
    image: String,
    description: String,
    category: String
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

  set ID(value: String) {
    this.id = value;
  }
}
