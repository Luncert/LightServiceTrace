
export function parseTimestamp(timestamp: number) {
  const date = new Date(timestamp);
  return `${wrapDateNumber(date.getFullYear())}-${wrapDateNumber(date.getMonth() + 1)}-${wrapDateNumber(date.getDate())}T${wrapDateNumber(date.getHours())}:${wrapDateNumber(date.getMinutes())}:${wrapDateNumber(date.getSeconds())}.${wrapDateNumber(date.getMilliseconds(), 3)}`;
}

function wrapDateNumber(v: number, bits: number = 2) {
  if (v == 0) {
    return '0'.repeat(bits);
  }
  
  let n = v;
  while (n > 0) {
    n = Math.floor(n / 10);
    bits--;
  }
  return bits > 0 ? '0'.repeat(bits) + v : v;
}
