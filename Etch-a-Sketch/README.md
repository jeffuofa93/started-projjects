# Etch-a-Sketch


Overview:
For this project I created a rainbow colored sketch pad. The program works by generating a random rgb value for each square when the user's mouse hovers over it. Each square also gets progessivly darker on each hover eventually turning completly black on the 10th hover event. At the user's discretion they can reset the grid to any size they specify with the reset grid button. The grid internally restricts the size to 100x100. The users input is prompted and recorded from a pop up  

External Help:
I used the psbc github repo to darken the color for the grid objects

Improvements:
Two major functionality improvements for this project
1. Develop method to implement color darkening independently 
2. When the grid gets very large over 50x50 the column that the button is located on stops shrinking. This causes the rows in this column to be wider than the others. Was unable to find a solution on my own. 
