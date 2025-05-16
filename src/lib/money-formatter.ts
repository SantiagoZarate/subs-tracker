export const moneyFormatter = new Intl.NumberFormat('en-us', {
  style: 'currency',
  currency: 'usd',
  minimumIntegerDigits: 1,
  maximumFractionDigits: 2,
});

export function formatMoney(money: string | number) {
  return moneyFormatter.format(Number(money));
}
