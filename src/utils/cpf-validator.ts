export function isValidCPF(cpf: string): boolean {
  if (!cpf) return false;

  const onlyDigits = String(cpf).replace(/\D/g, "");

  if (onlyDigits.length !== 11) return false;

  if (/^(\d)\1{10}$/.test(onlyDigits)) return false;

  const nums = onlyDigits.split("").map(Number);

  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += nums[i] * (10 - i);
  }
  let remainder = sum % 11;
  const dig1 = remainder < 2 ? 0 : 11 - remainder;
  if (nums[9] !== dig1) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += nums[i] * (11 - i);
  }
  remainder = sum % 11;
  const dig2 = remainder < 2 ? 0 : 11 - remainder;
  if (nums[10] !== dig2) return false;

  return true;
}
