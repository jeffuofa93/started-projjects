const btn = document.querySelector("#btn");
btn.onclick = () => alert("Hello World");

// Recommened way to do it
function alertFunction () {
    alert('Yay I did it');
}
btnListener.onclick = alertFunction;


// Don't get what this does
btnListener.addEventListener("click",alertFunction);
btnListener.addEventListener("click",function(e) {
    e.target.style.background = "blue";
});


// buttons is a node list. It looks and acts much like an array.
const buttons = document.querySelectorAll('button');

// we use the .forEach method to iterate through each button
buttons.forEach((button) => {

  // and for each one we add a 'click' listener
  button.addEventListener('click', () => {
    alert(button.id);
  });
});
