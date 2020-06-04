const info = (text: string): string => {
  console.log(`INFO : ${text}`);
  return text;
};
const error = (text: string): string => {
  console.log(`Error : ${text}`);
  return text;
};
export { info, error };
