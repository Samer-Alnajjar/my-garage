"use strict"

//Variables
var array = ["bmw.png", "chevrolet.png", "hyundai.png", "kia.png", "lexus.png", "tesla.png", "toyota.png"];
var arrayOfObjects = [];
var table = document.getElementById("table");
var form = document.getElementById("form");
var img = document.getElementById("img");
var clearButton = document.getElementById("clear");


//Constructers
function Cars(name, category, year) {
  this.name = name;
  this.year = year;
  this.category = `./img/${category}.png`;

  arrayOfObjects.push(this);
}



//functions
// function objects() {
//   for (let i = 0; i < array.length; i++) {
//     var name = array[i].split(".")[0];
//     var car = new Cars(name,array[i])    
//   }
// }

function handleSubmission(event) {
  event.preventDefault();
  var name = event.target.name.value;
  var category = event.target.category.value;
  var year = event.target.year.value;

  var newCar = new Cars(name, category , year)
  newCar.renderData();
}

//Prototype
Cars.prototype.renderData = function() {
  var tableRow = document.createElement("tr");
  var tableData1 = document.createElement("td");
  var img = document.createElement("img");
  img.setAttribute("src", this.category);
  tableData1.appendChild(img);

  tableRow.appendChild(tableData1);

  var tableData2 = document.createElement("td");
  var span1 = document.createElement("span");
  var span2 = document.createElement("span");
  span1.textContent = `Car name: ${this.name}`
  span2.textContent = `Model Year: ${this.year}`
  tableData2.appendChild(span1);
  tableData2.appendChild(span2);

  tableRow.appendChild(tableData2);
  storeData();

  table.appendChild(tableRow);
}

//Storing the data
function storeData() {
  localStorage.setItem("cars", JSON.stringify(arrayOfObjects));
}

//Checking LS
function checkLS() {
  if(localStorage.getItem("cars")) {
    var locObj = JSON.parse(localStorage.getItem("cars"));
    console.log(locObj);
    for (let i = 0; i < locObj.length; i++) {
      // var category = locObj[i].category.split("img")[0]
      var temp1 =locObj[i].category.split("img/")[1]
      var temp2 = temp1.split(".")[0]
      var newObj = new Cars(locObj[i].name, temp2 , locObj[i].year);
      newObj.renderData();      
    }
  }
}
function handleClear() {
  localStorage.clear()
  checkLS();
  location.reload();
}


//Event Listener
form.addEventListener("submit", handleSubmission);
clearButton.addEventListener("click", handleClear);
// objects();
checkLS();