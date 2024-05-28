export interface Product {
  id?: number,
  name: string,
  unity: string,
  quantity?: number,
  price: number | string,
  isPerishableProduct: boolean,
  expirationDate?: any,
  fabricationDate:  Date | string,
}
