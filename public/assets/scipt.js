/*------------------------------*/
/*--------ENTRY PAGE------------*/
/*------------------------------*/

function fetchJSON(url, method = "get", data = {}) {
  const fetchOptions = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (method === "post" || method === "put")
    fetchOptions.body = JSON.stringify(data);

  // for get we don't need header, others we do
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
      arr = noteData.emo;
      document.querySelector("#id").value = noteData.id;
      document.querySelector("#title").value = noteData.title;
      document.querySelector("#note").value = noteData.note;
      document.querySelector("#newBtn").innerHTML = `
            <button class="btn btn-light" onClick='deleteNote(${noteData.id})'>DELETE</button>
            <button class="btn btn-light float-end d-none d-sm-block" onClick="save(event)">SAVE</button>
            `;
    }
  }
}

async function deleteNote(id) {
  if (confirm("Are you sure about this?"))
    await fetchJSON(`/api/notes/${id}`, "delete");
  location.href = "/recents.html";
}

let arr;

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

async function save(e) {
  e.preventDefault();

  const id = document.getElementById("id").value;
  const noteData = {
    emo: arr,
    title: document.getElementById("title").value,
    note: document.getElementById("note").value,
  };

  await fetchJSON(`/api/notes/${id}`, id ? "put" : "post", noteData);

  location.href = "/recents.html";
}

/*------------------------------*/
/*-----------RECENTS------------*/
/*------------------------------*/

function editQuote(id) {
  location.href = `/entry.html#${id}`;
}

async function getList() {
  const data = await fetch("/api/notes").then((r) => r.json());

  data.map((r) => {
    document.getElementById("recentsList").innerHTML += `
<h3>${r.title}</h3>
<h3> ${r.note} </h3>
<button class="btn btn-primary" onclick=editQuote(${r.id})>edit</button>
`;
  });
}
