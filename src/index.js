module.exports = function check(str, bracketsConfig) {
  let stack = [];
  let closingBrackets = {};
  let openBrackets = [];

  // closingBrackets и openBrackets имеют разные типы данных
  // closingBrackets - объект, обращаемся к нему по ключу закрывающего символа (в целях проверки парности)
  bracketsConfig.forEach(el => {
    closingBrackets[el[1]] = el[0];
    openBrackets.push(el[0]);
  });

  // console.log(openBrackets);
  // console.log(closingBrackets);


  for (let i = 0; i < str.length; i++) {
    let currentSymbol = str[i];
    let nextSymbol = str[i + 1];
    let lastStackSymbol = stack[stack.length - 1];

    // Блок условий #1 (если парные символы одинаковы)
    if (currentSymbol === closingBrackets[currentSymbol]) {
      if (currentSymbol === nextSymbol) {
        i++;
      } else if (stack.length === 0) {
        stack.push(currentSymbol);
      } else if (currentSymbol === lastStackSymbol) {
        stack.pop();
      } else {
        stack.push(currentSymbol);
      }
    }

    // Блок условий #2 (1. если символ - открывающий; 2. иначе...)
    else if ((openBrackets.includes(currentSymbol))) {
      stack.push(currentSymbol);
    } else {
      // стэк пустой, символ есть, но не открывающий и не парный - что-то здесь не так
      if (stack.length === 0) {
        return false;
      }

      // console.log(closingBrackets[lastStackSymbol]);
      // console.log(openBrackets.indexOf(lastStackSymbol));

      //
      if (closingBrackets[currentSymbol] === lastStackSymbol) {
        stack.pop();
      } else {
        return false;
      }
    }
  }

  return stack.length === 0;
}
