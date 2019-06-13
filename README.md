# GuaguaJS
A Java Script Lotto frame
# Usage
# 1
Setting prizes with  new Prize(). There 3 parameters in the constructor: 1.id, 2.passibility, 3.the url of picture of prize.
# 2
Pushing all of Prize() into an array.
# 3
Calling function 'LottoGenerator()'. There are 4 parameters for this function: 1.width, 2.height, 3.the array of prizes, 4.the color of the coat ("#696969"). 
# 4
Function 'LottoGenerator()' will return an "object". Adding this "object.div" into the HTML with "appendChild()" this "object" will be display on the web page.
# 5
Using "object.getSelectedPrize()" will return the prize which is selected by Random.
# 6
Using "object.getResult()" to check that if that lotto has been open.
