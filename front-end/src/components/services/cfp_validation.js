export function TestaCPF(strCPF) {
  var Soma;
  var Resto;
  Soma = 0;
  if (strCPF == "00000000000") return false;
    
  for (var i=1; i<=9; i++) {
    Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (11 - i);
    console.log("soma:" + strCPF.substring(i-1, i));
  }
  Resto = (Soma * 10) % 11;
  console.log("1 resto:" + Resto);
  
  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(9, 10)) ) return false;
  
  Soma = 0;
  for (var i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i-1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;
  console.log("2 resto:" + Resto);

  if ((Resto == 10) || (Resto == 11))  Resto = 0;
  if (Resto != parseInt(strCPF.substring(10, 11) ) ) return false;
  return true;
}