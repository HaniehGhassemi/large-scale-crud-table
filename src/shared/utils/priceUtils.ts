export default function priceSeparator(price: number): string {
  let priceStr = price.toString();
  priceStr = priceStr.replace(/,/g, '');
  const x = priceStr.split('.');
  let y = x[0];
  const z = x.length > 1 ? '.' + x[1] : '';
  const rgx = /(\d)(?=(\d{3})+(?!\d))/g;
  y = y.replace(rgx, '$1' + ',');
  return y + z;
}
