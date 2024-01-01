export default function makeArrOfLength(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) arr.push(i);
  return arr;
}

type MakeArrParams = {
  from: number;
  to: number;
};

export function makeArr({ from, to }: MakeArrParams) {
  const arr = [];
  for (let i = from; i <= to; i++) arr.push(i);
  return arr;
}
