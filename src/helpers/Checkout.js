class Checkout {

  constructor(offers, products){
    this.offers = offers;
    this.products = products;
    this.scan = this.scan.bind(this);
    this.total = this.total.bind(this);
    this.checkoutList = [];
  }

  scan(code){
    let index = this.checkoutList.findIndex((element) => element.code === code);
    if(index > - 1) {
      this.checkoutList[index].quantity++;
    } else {
      this.checkoutList.push({
        code: code,
        quantity: 1
      })
    }
    return this.checkoutList;
  }

  total(){
    let totalPrice = 0;
    for(let k = 0, kMax = this.checkoutList.length; k < kMax; k++){
      const offersIndex = this.offers.findIndex((element) => element.code === this.checkoutList[k].code);
      const productsIndex = this.products.findIndex((element) => element.code === this.checkoutList[k].code);
      if (offersIndex > -1
          && this.checkoutList[k].quantity >= this.offers[offersIndex].minNumArticles){
        if (this.offers[offersIndex].discount.length === 1) {
          totalPrice += (this.checkoutList[k].quantity
                         * (this.products[productsIndex].price - this.offers[offersIndex].discount[0]));
        } else {
          const mod = this.checkoutList[k].quantity % this.offers[offersIndex].discount[1];
          totalPrice += (((this.checkoutList[k].quantity - mod)
                           * this.offers[offersIndex].discount[0]/this.offers[offersIndex].discount[1])
                         * (this.products[productsIndex].price));
          totalPrice += (mod * this.products[productsIndex].price);
        }
      } else {
        totalPrice += (this.products[productsIndex].price * this.checkoutList[k].quantity)
      }
    }
    return totalPrice;
  }

}

export default Checkout;