// Intialize constants
const container = document.querySelector(".container");
const button = document.createElement("button");

// declare variables used in the program
let idDict = {};
let idName;
let size = 16;
let columnName;
let rowName;
let grid;

// Create button object information
button.textContent = "Reset Grid"
button.style.backgroundColor = "grey";
button.style.borderColor = "black";


const pSBC=(p,c0,c1,l)=>{
    let r,g,b,P,f,t,h,i=parseInt,m=Math.round,a=typeof(c1)=="string";
    if(typeof(p)!="number"||p<-1||p>1||typeof(c0)!="string"||(c0[0]!='r'&&c0[0]!='#')||(c1&&!a))return null;
    if(!this.pSBCr)this.pSBCr=(d)=>{
        let n=d.length,x={};
        if(n>9){
            [r,g,b,a]=d=d.split(","),n=d.length;
            if(n<3||n>4)return null;
            x.r=i(r[3]=="a"?r.slice(5):r.slice(4)),x.g=i(g),x.b=i(b),x.a=a?parseFloat(a):-1
        }else{
            if(n==8||n==6||n<4)return null;
            if(n<6)d="#"+d[1]+d[1]+d[2]+d[2]+d[3]+d[3]+(n>4?d[4]+d[4]:"");
            d=i(d.slice(1),16);
            if(n==9||n==5)x.r=d>>24&255,x.g=d>>16&255,x.b=d>>8&255,x.a=m((d&255)/0.255)/1000;
            else x.r=d>>16,x.g=d>>8&255,x.b=d&255,x.a=-1
        }return x};
    h=c0.length>9,h=a?c1.length>9?true:c1=="c"?!h:false:h,f=this.pSBCr(c0),P=p<0,t=c1&&c1!="c"?this.pSBCr(c1):P?{r:0,g:0,b:0,a:-1}:{r:255,g:255,b:255,a:-1},p=P?p*-1:p,P=1-p;
    if(!f||!t)return null;
    if(l)r=m(P*f.r+p*t.r),g=m(P*f.g+p*t.g),b=m(P*f.b+p*t.b);
    else r=m((P*f.r**2+p*t.r**2)**0.5),g=m((P*f.g**2+p*t.g**2)**0.5),b=m((P*f.b**2+p*t.b**2)**0.5);
    a=f.a,t=t.a,f=a>=0||t>=0,a=f?a<0?t:t<0?a:a*P+t*p:0;
    if(h)return"rgb"+(f?"a(":"(")+r+","+g+","+b+(f?","+m(a*1000)/1000:"")+")";
    else return"#"+(4294967296+r*16777216+g*65536+b*256+(f?m(a*255):0)).toString(16).slice(1,f?undefined:-2)
}


// Function to generate a random integer inside a specified range
function getRndInteger(max) {
    return Math.floor((Math.random() * max)+1);
}

// Function to create rgb text string to pass to CSS fields
function generateRGBStr(val=256) {
    return 'rgb(' + getRndInteger(val) + ',' + getRndInteger(val) + ',' + getRndInteger(val) + ')';
}

// This function builds the grid of elements
function buildGrid(size,columnName,rowName,container,button,idName,idDict) {
    for (i=0;i<size;i++){
        columnName = document.createElement("div");
        columnName.classList.add("col");
        for (j=0;j<size;j++){
            rowName = document.createElement("div");
            rowName.classList.add("row");
            rowName.style.minHeight = (1/size)*100 + "vh";
            rowName.style.backgroundColor = "black" + "red";
            idName = i.toString()+j.toString();
            idDict[idName] = 0;
            rowName.setAttribute("id",idName);
            columnName.appendChild(rowName);

            // At the center column add the button to reset the grid
            if (i===(Math.floor(size/2))&& (j===0)){
                rowName.appendChild(button);
            }
        }
        //append column to container
        container.appendChild(columnName);
    }
    // add event to each item in the grid
    grid = document.querySelectorAll(".row");
    grid.forEach((row) => {
        row.addEventListener("mouseover",() => {
            // use dictionary to track value for darkness, -1 is completly black
            idDict[row.id] = idDict[row.id] - .1;
            // increase darkness of background on each hover
            row.style.backgroundColor = pSBC(Math.max(idDict[row.id],-1),generateRGBStr());
        });
    });

}

// this function iterates through the grid and removes all items
// also calls build grid to rebuild the grid to the user specified size
function eraseGrid(size,columnName,rowName,button,container,idName,idDict){
    while (container.firstChild){
        container.removeChild(container.firstChild)
    }
    buildGrid(size,columnName,rowName,container,button,idName,idDict)
}

// This function adds an event listener to the button when it's clicked and calls the eraseGrid function
function buttonEvent (size,columnName,rowName,button,container,grid,idName,idDict) {
    button.addEventListener("click",() => {
        size = prompt("Enter the size of the new grid");
        size = parseInt(size);
        eraseGrid(size,columnName,rowName,button,container,idName,idDict);
    });
}
// Call buildGrid and buttonEvent at the start of the program
buildGrid(size,columnName,rowName,container,button,idName,idDict);
buttonEvent(size,columnName,rowName,button,container,grid,idName,idDict);

// EOF comment
