export function print(out: OutputStream, ...s: string[]) {
  s.forEach(out.write);
}

export function println(out: OutputStream, ...s: string[]) {
  if (s.length > 0) {
    let t: string;
    let i = 0;
    for (let limit = s.length - 1; i < limit; i++) {
      t = s[i];
      out.write(t);
    }
    t = s[i];
    out.writeln(t);
  } else {
    out.writeln('');
  }
}

export default {
  print,
  println,
};
