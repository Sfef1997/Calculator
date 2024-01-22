
const toggelElment = document.querySelector('.themes__toggle');



const toggelAddTheme = () => {
  toggelElment.classList.toggle('themes__toggle--isActive');
};
toggelElment.addEventListener('keydown', (e) => {
  e.key === 'Enter' && toggelAddTheme();
});
toggelElment.addEventListener('click', toggelAddTheme);

let currentNumber = '';
let storedNumber = '';
let operation = '';

const resultElemnet = document.querySelector('.calc__result');

const keyElements = document.querySelectorAll('.calc__key');

const updateScreen = (value) => {
  resultElemnet.innerText = !value ? '0' : value;
};

const numberButtonsHnadel = (value) => {
  if (value === '.' && currentNumber.includes('.')) return;
  if (value === '0' && !currentNumber) return;

  currentNumber += value;
  updateScreen(currentNumber);
};

const resetButonHandler = () => {
  currentNumber = '';
  storedNumber = '';
  operation = '';
  updateScreen(currentNumber);
};

const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === '0') return;

  if (currentNumber.length === 1) {
    currentNumber = '';
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateScreen(currentNumber);
};

const executeOperations = () => {
  if (currentNumber && operation && storedNumber) {
    switch (operation) {
      case '+':
        storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);

        break;
      case '-':
        storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);

        break;
      case '*':
        storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);

        break;
      case '/':
        storedNumber = (parseFloat(storedNumber) / parseFloat(currentNumber)).toFixed(1);

        break;
      default:
        return;
    }
    currentNumber = '';
    updateScreen(storedNumber);
  }
};
const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (currentNumber && !storedNumber) {
    storedNumber = currentNumber;
    currentNumber = '';
    operation = operationValue;
  } else if (storedNumber) {
    operation = operationValue;
    if (currentNumber) executeOperations();
  }
};
const showClickedElmentInReult = () => {
  Array.from(keyElements).map((item) => item.addEventListener('click', () => {
    const { type } = item.dataset;
    if (type === 'number') {
      numberButtonsHnadel(item.dataset.value);
    } else if (type === 'operation') {
      switch (item.dataset.value) {
        case 'c':
          resetButonHandler();
          break;
        case 'Backspace':
          deleteButtonHandler();
          break;
        case 'Enter':
          executeOperations();
          break;
        default:
          operationButtonHandler(item.dataset.value);
      }
    }
  }));
};
showClickedElmentInReult();

// Use Keyborad as input source
const avilabelNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const avilabelOperations = ['+', '-', '*', '/'];
const avilabelKEys = [...avilabelNumbers, ...avilabelOperations, 'Enter', 'Backspace', 'c','.',];

const keyBoradWithHover = (key) => {
  if (avilabelKEys.includes(key)) {
    const ele = document.querySelector(`[data-value="${key}"]`);
  
    ele.classList.add('hover');
    ele.click();
    setTimeout(() => {
      ele.classList.remove('hover');
    }, 300);
  }
};

window.addEventListener('keydown', (e) => {
  keyBoradWithHover(e.key);
});
