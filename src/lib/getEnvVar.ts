export default function getEnvVar(varName: string) {
  const varVal = process.env[varName];
  if (!varVal) throw new Error(`${varName} environment variable not found`);
  return varVal;
}
