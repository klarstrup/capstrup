export const shuffle = <A>(arrRaw?: A[]): A[] => {
  if (!arrRaw?.length) return [];
  const arr = [...arrRaw];
  return arr.reduceRight<A[]>((acc) => {
    acc.push(arr.splice(0 | (Math.random() * arr.length), 1)[0]!);
    return acc;
  }, []);
};
