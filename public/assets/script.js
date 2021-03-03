/*---------------------------------*/
/*-----------ENTRY PAGE------------*/
/*---------------------------------*/

let arr;

function fetchJSON(url, method = "get", data = {}) {
  const fetchOptions = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (method === "post" || method === "put")
    fetchOptions.body = JSON.stringify(data);

  return fetch(url, fetchOptions).then((r) => r.json());
}

async function loadQuote() {
  const id = location.hash.substr(1);
  console.log(`[editNote] ${id}`);
  if (Number(id) > 0) {
    // load the data
    const noteData = await fetchJSON(`/api/notes/${id}`);
    if (noteData.id > 0) {
      console.log(` ... noteData: `, noteData);
      // display the quote info
      arr = noteData.emotion;
      document.querySelector("#id").value = noteData.id;
      document.querySelector("#title").value = noteData.title;
      document.querySelector("#note").value = noteData.note;
      document.querySelector("#newBtn").innerHTML = `
                <button class="btn btn-light" onClick='deleteNote(${noteData.id})'>DELETE</button>
                <button class="btn btn-light float-end d-none d-sm-block" onClick="submitForm(event)">SAVE</button>
                `;
    }
  }
}

async function deleteNote(id) {
  if (confirm("Are you sure about this?"))
    await fetchJSON(`/api/notes/${id}`, "delete");
  location.href = "/recents.html";
}

function push1() {
  arr = "1";
  let q = document.getElementById("one");
  let w = document.getElementById("two");
  let e = document.getElementById("three");
  let r = document.getElementById("four");
  let t = document.getElementById("five");
  w.style.boxShadow = "none";
  e.style.boxShadow = "none";
  r.style.boxShadow = "none";
  t.style.boxShadow = "none";
  q.style.boxShadow = "0 0 0 3px black";
}
function push2() {
  arr = "2";
  let q = document.getElementById("one");
  let w = document.getElementById("two");
  let e = document.getElementById("three");
  let r = document.getElementById("four");
  let t = document.getElementById("five");
  q.style.boxShadow = "none";
  e.style.boxShadow = "none";
  r.style.boxShadow = "none";
  t.style.boxShadow = "none";
  w.style.boxShadow = "0 0 0 3px black";
}
function push3() {
  arr = "3";
  let q = document.getElementById("one");
  let w = document.getElementById("two");
  let e = document.getElementById("three");
  let r = document.getElementById("four");
  let t = document.getElementById("five");
  w.style.boxShadow = "none";
  q.style.boxShadow = "none";
  r.style.boxShadow = "none";
  t.style.boxShadow = "none";
  e.style.boxShadow = "0 0 0 3px black";
}
function push4() {
  arr = "4";
  let q = document.getElementById("one");
  let w = document.getElementById("two");
  let e = document.getElementById("three");
  let r = document.getElementById("four");
  let t = document.getElementById("five");
  w.style.boxShadow = "none";
  e.style.boxShadow = "none";
  q.style.boxShadow = "none";
  t.style.boxShadow = "none";
  r.style.boxShadow = "0 0 0 3px black";
}
function push5() {
  arr = "5";
  let q = document.getElementById("one");
  let w = document.getElementById("two");
  let e = document.getElementById("three");
  let r = document.getElementById("four");
  let t = document.getElementById("five");
  w.style.boxShadow = "none";
  e.style.boxShadow = "none";
  r.style.boxShadow = "none";
  q.style.boxShadow = "none";
  t.style.boxShadow = "0 0 0 3px black";
}

async function submitForm(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;

  const noteData = {
    emotion: arr,
    title: document.getElementById("title").value,
    note: document.getElementById("note").value,
  };

  await fetchJSON(`/api/notes/${id}`, id ? "put" : "post", noteData);

  location.href = "/recents.html";
}

/*---------------------------------*/
/*----------RECENTS PAGE-----------*/
/*---------------------------------*/

function editQuote(id) {
  location.href = `/entry.html#${id}`;
}

async function getList() {
  const data = await fetch("/api/notes").then((r) => r.json());



//   template list    //
  data.map((r) => {
    document.getElementById("entrySlot").innerHTML += `
  <h3>${r.title}</h3>
  <h3> ${r.note} </h3>
  <button class="btn btn-primary" onclick=editQuote(${r.id})>edit</button>
  `;
  });
}



/*---------------------------------*/
/*---------VIEW DATA PAGE----------*/
/*---------------------------------*/

function buildDoughnut(data) {
  // clear details
  document.getElementById("Great").innerText = ``;
  document.getElementById("Good").innerText = ``;
  document.getElementById("OK").innerText = ``;
  document.getElementById("Meh").innerText = ``;
  document.getElementById("Bad").innerText = ``;

  // set the dimensions and margins of the graph
  var width = 450;
  height = 450;
  margin = 40;

  // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
  var radius = Math.min(width, height) / 2 - margin;

  // append the svg object to the div called 'my_dataviz'
  var svg = d3
    .select("#my_dataviz")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  // Create dummy data

  // set the color scale
  var color = d3
    .scaleOrdinal()
    .domain(["1", "2", "3", "4", "5"])
    .range(["#FF0000", "#ffa500", "#FFFF00", "#00ff00", "#0000ff"]);

  // Compute the position of each group on the pie:
  var pie = d3
    .pie()
    .sort(null) // Do not sort group by size
    .value(function (d) {
      return d.value;
    });
  var data_ready = pie(d3.entries(data));

  // The arc generator
  var arc = d3
    .arc()
    .innerRadius(radius * 0.5) // This is the size of the donut hole
    .outerRadius(radius * 0.8);

  // Another arc that won't be drawn. Just for labels positioning
  var outerArc = d3
    .arc()
    .innerRadius(radius * 0.9)
    .outerRadius(radius * 0.9);

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
    .selectAll("allSlices")
    .data(data_ready)
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.key);
    })
    .attr("stroke", "white")
    .style("stroke-width", "2px")
    .style("opacity", 1);

  // create text log
  if (data[5] > 0) {
    if (data[5] == 1) {
      document.getElementById(
        "Great"
      ).innerText = `You said you felt great ${data[5]} time :D`;
    } else {
      document.getElementById(
        "Great"
      ).innerText = `You said you felt great ${data[5]} times :D`;
    }
  }
  if (data[4] > 0) {
    if (data[4] == 1) {
      document.getElementById(
        "Good"
      ).innerText = `You said you felt good ${data[4]} time`;
    } else {
      document.getElementById(
        "Good"
      ).innerText = `You said you felt good ${data[4]} times`;
    }
  }
  if (data[3] > 0) {
    if (data[3] == 1) {
      document.getElementById(
        "OK"
      ).innerText = `You said you felt ok ${data[3]} time`;
    } else {
      document.getElementById(
        "OK"
      ).innerText = `You said you felt ok ${data[3]} times`;
    }
  }
  if (data[2] > 0) {
    if (data[2] == 1) {
      document.getElementById(
        "Meh"
      ).innerText = `You said you felt meh ${data[2]} time`;
    } else {
      document.getElementById(
        "Meh"
      ).innerText = `You said you felt meh ${data[2]} times`;
    }
  }
  if (data[1] > 0) {
    if (data[1] == 1) {
      document.getElementById(
        "Bad"
      ).innerText = `You said you felt bad ${data[1]} time :(`;
    } else {
      document.getElementById(
        "Bad"
      ).innerText = `You said you felt bad ${data[1]} times :(`;
    }
  }
}

// update text of dropdowns
function updateTime(newText) {
  document.getElementById("timeDropdown").innerText = newText;
}
function updateType(newText) {
  document.getElementById("typeDropdown").innerText = newText;
}

// get values in dropdowns and make API to get necessary data to create chart
async function updateChart() {
  let timeFrame = document.getElementById("timeDropdown").innerText;
  let chartType = document.getElementById("typeDropdown").innerText;
  // check if dropdowns have been changed before doing anyting
  if (chartType !== "What Type of Chart?" && timeFrame !== "How Many Days?") {
    // do server stuff here
    if (chartType == "Doughnut Graph") {
      // vvvvvvvvvvv IMPLEMENT CALL TO SERVER HERE vvvvvvvvvvvvv
      let doughnutData = await getDoughnutData(timeFrame);
      // ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
      document.getElementById("my_dataviz").innerHTML = "";
      document.getElementById(
        "graph_title"
      ).innerText = `Mood For the ${timeFrame}`;
      buildDoughnut(doughnutData);
    }
  }
}
async function getDoughnutData(timeFrame) {
  let range;
  switch (timeFrame) {
    case "Past 7 Days":
      range = 7;
      break;
    case "Past 30 Days":
      range = 30;
      break;
    case "Past 365 Days":
      range = 365;
      break;
    default:
      range = 7;
      break;
  }
  let returnedData = await fetch(`/api/dates/${range}`).then((r) => r.json());
  let doughnutData = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  for (let i = 0; i < returnedData.length; i++) {
    doughnutData[returnedData[i].emotion] += 1;
  }
  return doughnutData;
}

async function main() {
  let initialChartData = await getDoughnutData("Past 7 Days");
  buildDoughnut(initialChartData);
}
