import "./styles.css";
// we use templete literal for HTML generation
debugger;
var sp1 = document.createElement("span");

// Give it an id attribute called 'newSpan'
sp1.id = "newSpan";
// Create some content for the new element.
sp1.innerHTML = `
<br>
<div class="container">
<div class="row">
      <div class="col-4"></div>
        <div class="card" class="col-4" style="background-color: #eee;">
        <div class="card-body">
          <div class="row">
              <div class="col-3"></div>
              <div class="col-6">
                <h1>When Can I afford It?</h1>
                <p id="welcome">This app will show you how long it will take to save enough for your goal.</p>
              </div>
              <div class="col-3"></div>
          </div>


          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <label class="form-label">Please enter your goal</label>
              <div class="input-group mb-3">
                <input id="goalName" class="form-control"  placeholder="Name" required>
              </div>
            </div> 
            <div class="col-3"></div>
          </div>

          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input id="goalCost" class="form-control"  type="number" required>
            </div>
          </div>
          <div class="col-3"></div>
          </div>

          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <label class="form-label">Daily saving</label>
              <div class="input-group mb-3">
                <span class="input-group-text">$</span>
                <input id="dailySa" class="form-control" type="number">
              </div>
            </div>
            <div class="col-3"></div>
            </div>


          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
              <label class="form-label">Total savings (if you have any):</label>
            <div class="input-group mb-3">
              <span class="input-group-text">$</span>
              <input id="totalSa" class="form-control" type="number">
            </div>
          </div>
          <div class="col-3"></div>
          </div>
          <div class="row">
            <div class="col-3"></div>
            <div class="col-6">
            <div class="input-group mb-3 d-grid gap-2 d-md-flex justify-content-md-end">
              <button id="goalSubmit" type="button" class="btn btn-success">calculate</button>
            </div>
            </div>
            </div>
            </div>
          </div>
        <div class="col-4"></div>
        </div>
  </div>
`;
var sp2 = document.getElementById("childSpan");
var parentDiv = sp2.parentNode;
parentDiv.replaceChild(sp1, sp2);
// define variables
let goal;
let paidFor;
let itemNo = 1;
var daysNeeded;
var daily;
var initial;
let savingSince;
// sayfa acildiginda previos item var mi diye sorgula, varsa datobaseden yazdir.
if (localStorage.getItem("item:" + itemNo + ":name")) {
  // document.getElementById("startTheApp").style.display = "none";
  // writeFromLS(localStorage.getItem("savings:since"));
  // itemList(1);
}
//very first time with LocalStorage blank
else {
  //   /* Show the welcome message!
  //  Ask them to enter daily saving and "saved so far" inputs
  // document.getElementById("startTheApp").style.display = "block";
  //  Wait for them to click on Submit button
}

function readSavings() {
  daily = onlyNumbers(document.getElementById("dailySa").value);
  initial = onlyNumbers(document.getElementById("totalSa").value);
  goal = onlyNumbers(document.getElementById("goalCost").value);
  localStorage.setItem(
    "item:" + itemNo + ":name",
    document.getElementById("goalName").value
  );
}

// convert inputs into numbers
function onlyNumbers(a) {
  a = Number(a.toString().replace(/\D/g, ""));
  return a;
}

// Add days to today's date **we define paidFor inside the function to reset it every time.
function addDays(date, days) {
  paidFor = new Date(date);
  paidFor.setDate(paidFor.getDate() + days);
  return paidFor;
}
//Calculate how many days we need to save that money
function calculateDaysNeeded(goal, initial, daily) {
  // const paidDay = new Date();
  daysNeeded = Math.ceil((goal - initial) / daily);
  return daysNeeded;
}

function saveItem() {
  calculateDaysNeeded(goal, initial, daily);
  // add it to start days
  addDays(savingSince, daysNeeded);
  //save paidoff
  localStorage.setItem(
    "item:" + itemNo + ":paidOffDate",
    paidFor.toLocaleDateString()
  );
}

document.getElementById("goalSubmit").addEventListener("click", function () {
  debugger;
  savingSince = new Date();
  readSavings();
  saveItem();
  console.log("paidFor.toLocaleDateString: " + paidFor.toLocaleDateString());
  document.getElementById("dailySa").value = "";
  document.getElementById("totalSa").value = "";
  document.getElementById("goalCost").value = "";
  document.getElementById("goalName").value = "";
  var sp3 = document.createElement("span");
  sp3.id = "results";
  sp3.innerHTML = `<br><br><p>You need to save until</p><br> ${paidFor.toLocaleDateString()}<br>
  to afford ${localStorage.getItem("item:" + itemNo + ":name")} <br><br>
  <button id="reset">reset</button>`;
  parentDiv.replaceChild(sp3, sp1);
  console.log(
    "localStorage.getItem:" + localStorage.getItem("item:" + itemNo + ":name")
  );
  document.getElementById("reset").addEventListener("click", function () {
    parentDiv.replaceChild(sp1, sp3);
  });
});
