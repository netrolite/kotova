export default async function wait(durationMs: number) {
  return new Promise((res) => setTimeout(res, durationMs));
}
