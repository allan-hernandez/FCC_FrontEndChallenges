// Get all the keys from document where it's a span
var keys = document.querySelectorAll('#keys span');
var currentInput = '';

console.log(keys);

// logic: add onclick event to all buttons 
// if number/operator - add to current input value 
// if clear - clear averything 
// if negative - add multiply * -1 to get opposite
// evaluate operation on equals

for (var i = 0; i < keys.length; i++) {
  keys[i].onclick = function() {

    // if input is invalid - break and go to error
    try {
      // Get the input and button values

      var val = this.getAttribute("data-value");

      switch (val) {
        case 'C':
          currentInput = '';
          break;
        case '=':
          currentInput = eval(currentInput);
          break;
        case '(-)':
          currentInput = currentInput + '* -1';
          break;
        default:
          currentInput = currentInput + val;
      }

      console.log(currentInput);
      document.getElementById('total').value = currentInput;
    }
    //end try
    catch (e) {
      document.getElementById('total').value = '';
      alert("Invalid entry");
    }
  }

}