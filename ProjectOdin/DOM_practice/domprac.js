// add text to <p> element
const container = document.querySelector("#container");
const paragraph = document.createElement("p");
paragraph.classList.add("paragraph");
paragraph.textContent = "Hey I'm red!";
paragraph.style.color = "red";
container.appendChild(paragraph);

const h3 = document.createElement("h3");
h3.classList.add("h3");
h3.textContent = "I'm a blue h3";
h3.style.color = "blue";
container.appendChild(h3);

const newDiv = document.createElement('div');
const newh1 = document.createElement('h1');
const newp = document.createElement('p');
newDiv.style.borderColor = "black";
newDiv.style.backgroundColor = "pink";

newDiv.classList.add("newDiv");
newDiv.appendChild(newh1);
newDiv.appendChild(newp);
container.appendChild(newDiv);
newh1.textContent = "I'm in a div";
newp.textContent = "ME TOO!";



