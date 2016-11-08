function divmod(pDividend,pDivisor) {
  var vQuotient = 0;
  if (pDivisor > 0) {
      while (pDividend > pDivisor) {
        pDividend = pDividend - pDivisor;
        vQuotient++;
      }
  } else {
    console.log("ERROR (divmod): Divisor is not greater 0");
  };
  return vQuotient;
}
