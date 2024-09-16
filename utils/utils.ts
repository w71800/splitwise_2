export const setPaddingZero = (num: number | string): string => {
  return num.toString().padStart(2, '0')
}

export const getSingleDigitMonth = (month : string): string => {
  if (month.length === 1) { 
    return month
  } else {  
    return month.slice(1)
  }
}

export const methods = {
  equal() {return '均等'},
  fixed() {return '定值'},
  percentage() {return '百分比'},
  ratio() {return '比例'}
}