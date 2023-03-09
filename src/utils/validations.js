export const emailValid = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
export const mobileNumberValid = /^09(0[1-2]|1[0-9]|3[0-9]|2[0-1])-?[0-9]{3}-?[0-9]{4}/
export const persianNumberValid = /^[\u06F0-\u06F90-9]+$/
export function validNationalCode(input) {
  if (
    !/^\d{10}$/.test(input) ||
    input == '0000000000' ||
    input == '1111111111' ||
    input == '2222222222' ||
    input == '3333333333' ||
    input == '4444444444' ||
    input == '5555555555' ||
    input == '6666666666' ||
    input == '7777777777' ||
    input == '8888888888' ||
    input == '9999999999'
  )
    return false
  var check = parseInt(input[9])
  var sum = 0
  var i
  for (i = 0; i < 9; ++i) {
    sum += parseInt(input[i]) * (10 - i)
  }
  sum %= 11
  return (sum < 2 && check == sum) || (sum >= 2 && check + sum == 11)
}
