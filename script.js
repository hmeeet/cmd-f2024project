
import "./style.css";

import Cropper from "cropperjs";
var currpage = 0; //CHANGE THIS depending on which page we're on

var j = 0;

var script = document.createElement('script');

// Set the src attribute to the Cropper.js CDN URL
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.5.12/cropper.min.js';

// Define a callback function to be executed after the script is loaded
script.onload = function() {
    // The Cropper.js library is now loaded, so you can initialize Cropper.js here
    var image = document.getElementById('image');
    var cropper = new Cropper(image, {
        aspectRatio: 16 / 9, // Set aspect ratio as per your requirement
        crop: function(event) {
            console.log(event.detail.x);
            console.log(event.detail.y);
            console.log(event.detail.width);
            console.log(event.detail.height);
            console.log(event.detail.rotate);
            console.log(event.detail.scaleX);
            console.log(event.detail.scaleY);
        }
    });
};

// Append the <script> element to the <head> or <body> of your HTML document
document.head.appendChild(script);

const image = document.getElementById("image");
const result = document.getElementById("result");

const cropper = new Cropper(image, {

    crop: function (event) {
  }
});


//when the crop/comment happens, highlight the thing, and add the flashcard
crop.onclick = function () {
  const canvasData = cropper.getCroppedCanvas();
  addFlashcard(canvasData);
  highlight(canvasData);
};


//when the save/confirm button is clicked, then save highlight and the comment as a pair:
function addFlashcard(canvasData) {
  saveImage(canvasData, j + '.png');
  j += 1;
};



//highlight the area
function highlight(canvasData) {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  const image = new Image();
  image.src = canvasData;
  image.onload = function() {
    ctx.drawImage(image, 0, 0);
    ctx.fillStyle = "rgba(255, 0, 0, 0.5)";
    ctx.fillRect(0, 0, image.width, image.height);
    result.innerHTML = "";
    result.appendChild(canvas);
  };
};

//Code for storing and showing comments below:
var currid = 0; //the id for the current comment
var currentlyShowingComment = 0;
var table = document.getElementById("commentTable");
var commentTextBox = document.getElementById("commentText"); //assuming we have a text box with the id "commentText"
var createCommentButton = document.getElementById("createCommentButton"); //assuming that the "Save" button when creating a comment has the id "createCommentButton"
var tableShowing = false;

var arrayOfComments = []; //this is the array where we store all the comments added to the pdf thus far

createCommentButton.addEventListener("click", function() {
  var newComment = {id: currid, text: commentTextBox.value, pic: currid + ".png", inTable: true, deleted: false, pagenum: currpage}; //creates a new comment with the id currid, the text from the text box, and the image file name (an image with the id of 1 will have the corresponding image file name of 1.png))
  arrayOfComments.push(newComment); //adds the new comment to the array
  currid++;

  //Below is code for accessing the data for a comment and displaying the comment and image on the page, where currentlyShowingComment is the comment's id:
  /*
  paragraph.textContent = "Text: " +   arrayOfComments[currentlyShowingComment].text + ", id: " + arrayOfComments[currentlyShowingComment].id;
  let img = document.createElement('img');
  var imgname = arrayOfComments[currentlyShowingComment].pic;
  img.src = imgname;
  [element].appendChild(img); //replace [element] with the name of an element variable that was already defined by document.getId("example text")
  */ 

  //Below is code for adding the comment and picture to the table, if the table is already being viewed:
  if (tableShowing) {
    let img = document.createElement('img');
    var imgname = arrayOfComments[currid - 1].pic;
    img.src = imgname;
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.appendChild(img)
    cell2.innerHTML = arrayOfComments[currid - 1].text;
    cell3.innerHTML = currpage;
  }
});

function createTable() {
  tableShowing = true;
  for (var i = 0; i < arrayOfComments.length; i++) {
    let img = document.createElement('img');
    var imgname = arrayOfComments[i].pic;
    img.src = imgname;
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.appendChild(img)
    cell2.innerHTML = arrayOfComments[i].text;
    cell3.innerHTML = currpage;
  }
  table = document.createElement("table");
  var row1 = document.createElement('tr');
  var header1 = document.createElement('th');
  header1.innerHTML = "Term";
  var header2 = document.createElement("th");
  header2.innerHTML = "Definition";
  var header3 = document.createElement("th");
  header3.innerHTML = "Page #";
  row1.appendChild(header1);
  row1.appendChild(header2);
  row1.appendChild(header3);
  table.appendChild(row1);
  for (let j = 0; j < arrayOfComments.length; j++) {
    let img = document.createElement('img');
    var imgname = arrayOfComments[j].pic;
    img.src = imgname;
    var row = table.insertRow();
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    cell1.appendChild(img)
    cell2.innerHTML = arrayOfComments[j].text;
    cell3.innerHTML = arrayOfComments[j].pagenum;
    tableSpace.appendChild(table);
  }
}






