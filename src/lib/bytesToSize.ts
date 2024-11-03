export default function bytesToSize(bytes: number, precision = 2) {
  if (bytes === 0) return "0 Байт";
  const units = ["Байт", "КБ", "МБ", "ГБ", "ТБ"];
  const index = Math.floor(Math.log(bytes) / Math.log(1024));
  return (
    (bytes / Math.pow(1024, index)).toFixed(precision) + " " + units[index]
  );
}
