var label = document.querySelector("#label");
var input = document.querySelector("#numInput")
var backBtn = document.querySelector("#backBtn");
var nextBtn = document.querySelector("#nextBtn");
var doneBtn = document.querySelector("#doneBtn");

var inputDiv = document.querySelector("#inputDiv");
var navBody = document.querySelector("#navBody");
var screenCount = {};
var list = [];
var i = 0;


function onChange(event) {
  var reader = new FileReader();
  reader.onload = onReaderLoad;
  reader.readAsText(event.target.files[0]);
}

function onReaderLoad(event) {
  res = event.target.result
  list = res.split(",")

  for (let y = 0; y < list.length; y++) {
    list[y] = list[y].trim()
    screenCount[list[y]] = 0;
  }
  console.log(screenCount)
  i = 0;
  updateLabel();
}



function next() {
  if (list.length > 0) {
    screenCount[list[i]] = numInput.value
    if (i + 1 < list.length) {
      i += 1;
    }
    else {
      i = 0;
    }
  }
  else {
    alert("Please Select a CSV File")
  }
  updateLabel()
}
function back() {
  if (list.length > 0) {
    screenCount[list[i]] = numInput.value
    if (i - 1 >= 0) {
      i -= 1;
    }
    else {
      i = list.length - 1
    }
  }
  else {
    alert("Please Select a CSV File")
  }
  updateLabel()
}
function updateLabel() {

  if (list.length > 0) {
    label.innerHTML = list[i];
    numInput.value = screenCount[list[i]]
    numInput.select();


    nextBtn.classList.remove("hidden");
    backBtn.classList.remove("hidden");
    doneBtn.classList.remove("hidden");


    navBody.innerHTML = "";
    for (let y = 0; y < list.length; y++) {
      let row = document.createElement("div");
      row.classList.add("navRow");
      if (y == i) {
        row.classList.add("selected");
      }
      let navStr = "";
      navStr += "<a><strong>" + list[y] + "</strong></a>"
      navStr += "<div>" + screenCount[list[y]] + "</div>"
      row.innerHTML = navStr;
      row.addEventListener("click", function() {
        screenCount[list[i]] = numInput.value
        i = y
        updateLabel();
      })
      navBody.appendChild(row)

    }
    document.querySelector(".selected").scrollIntoView()
  }
  else {
    navBody.innerHTML = "";
    label.innerHTML = "Select CSV File";

    nextBtn.classList.add("hidden");
    backBtn.classList.add("hidden");
    doneBtn.classList.add("hidden");

    alert("Please Select a CSV File")

  }

}
function done() {
  if (list.length > 0) {
    navBody.classList.add("outputBody")
    html2canvas(navBody).then(canvas => {
      var image = canvas.toDataURL();
      var aDownloadLink = document.createElement('a');
      aDownloadLink.download = 'canvas_image.png';
      aDownloadLink.href = image;
      aDownloadLink.click();
      navBody.classList.remove("outputBody");
    });
  }
  else {
    alert("Please Select a CSV File")
  }
}

input.addEventListener("keypress", function(event) {
  if (event.key == "Enter" && list.length > 0) {
    next();
  }
})


document.getElementById('fileUpload').addEventListener('change', onChange);
