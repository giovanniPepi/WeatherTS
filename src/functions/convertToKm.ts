const convertToKm = (m: number) => {
  const kmH = (m * 3.6).toFixed(1);
  return kmH;
};
export default convertToKm;