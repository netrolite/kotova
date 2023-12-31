export default function getPercentage(val: number, maxVal: number) {
  return Math.round((val / maxVal) * 100);
}
