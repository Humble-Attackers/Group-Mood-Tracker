/* unlike node where we can pull in packages with npm, or react, for normal
    webpages, we can use a cool resource called unpkg from the html page, so
    in this example we use the moment npm package on both the server & client side */

/*
    note how we wrap our api fetch in this function that allows us to do some
    additional error / message handling for all API calls...
*/
async function fetchJSON(url, method = 'get', data = {}) {
  const fetchOptions = {
    method,
    headers: { 'Content-Type': 'application/json' }
  }
  // only attach the body for put/post
  if (method === 'post' || method === 'put') {
    fetchOptions.body = JSON.stringify(data)
  }

  const result = await fetch(url, fetchOptions).then(res => res.json())

  /* put the api result message onto the screen as a message if it exists */
  if (result.status && result.message) {
    const apiResultEl = document.querySelector('#apiMessage')
    apiResultEl.innerHTML = result.message
    apiResultEl.classList.remove('d-none')
    console.log('showing message: ' + result.message)
    setTimeout(function () {
      apiResultEl.classList.add('d-none')
    }, 5000)
  } else if (!result.status && result.message) {
    alert('Problems: ' + result.message)
  }

  return result
}

async function taskList(due = '') {
  const taskList = await fetchJSON(`/api/tasks/${due}`)
  console.log(`[taskList] due='${due}'`, taskList)

  const listEl = document.querySelector('#list')
  listEl.innerHTML = ''

  taskList.forEach(function (task) {
    listEl.innerHTML += `
        <li class="list-group-item">
            <div class="float-right p-0">
                <button onClick="taskDelete(${task.id})" class="border-0 btn-transition btn btn-outline-danger"> <i class="fa fa-trash"></i> </button>
            </div>
            <div class="todo-indicator bg-${task.priority}"></div>
            <h3 class="text-primary">${task.info}</h3>
            <small class="text-muted">${task.due ? 'Due: ' + moment(task.due).format('MMM Do, YYYY') : ''}</small>
        </li>
        `
  })
}

/* functions triggered by the html page */

function showTodaysTasks() {
  document.querySelector('#todayTasksBtn').classList.add('d-none')
  document.querySelector('#allTasksBtn').classList.remove('d-none')

  const today = moment().format('YYYY-MM-DD')
  taskList(today)
}

function showAllTasks() {
  document.querySelector('#todayTasksBtn').classList.remove('d-none')
  document.querySelector('#allTasksBtn').classList.add('d-none')

  taskList()
}

// toggled by the [Add Task] button
function toggleTaskForm(forceHide = false) {
  const formEl = document.querySelector('#taskForm')
  if (!forceHide || formEl.classList.contains('d-none')) {
    formEl.classList.remove('d-none')
  } else {
    formEl.classList.add('d-none')
  }
}

// triggered by the [x] delete button
async function taskDelete(id) {
  const deleteResponse = await fetchJSON(`/api/tasks/${id}`, 'delete')
  console.log('[taskDelete] ', deleteResponse)

  taskList()
}

// save the new form
async function saveForm(event) {
  event.preventDefault()

  const formData = {
    priority: document.querySelector('#taskPriority').value,
    info: document.querySelector('#taskInfo').value,
    due: document.querySelector('#taskDue').value
  }

  // clear form
  document.querySelector('#taskPriority').value = ''
  document.querySelector('#taskInfo').value = ''
  document.querySelector('#taskDue').value = ''
  console.log('[saveForm] formData=', formData)

  const saveResponse = await fetchJSON('/api/tasks', 'post', formData)
  console.log('[saveResponse] ', saveResponse)

  if (saveResponse.status) {
    // hide the form
    toggleTaskForm(true)

    // refresh the list
    taskList()
  }
}

console.log('[mainApp] starting...')

// show the task list ...
taskList()


// INDEX PAGE
async function buildCalendar() {
  const dataArray = []
  const usedDates = []
  const averages = []

  const dbData = await fetch('/api/notes/calendar').then(r => r.json())

  let startDate = dbData[0]["DATE(time)"]
  let currentDate = new Date()
  let endDate = `${currentDate.getFullYear()}` + "/" + `${currentDate.getMonth() + 1}` + "/" + `${currentDate.getDate()}`


  for (let i = 0; i < dbData.length; i++) {

    dataArray.push([dbData[i]["DATE(time)"], dbData[i].emotion])
    usedDates.push(dbData[i]["DATE(time)"])
  }


  var chart = JSC.chart('chartDiv', {
    type: 'calendar month solid',
    calendar_range: [startDate, endDate],
    calendar_calculation: `average`,
    data: dataArray,
    palette: {
      colors: [
        `#FFFFFF`,
        '#FF0000',
        '#FFA500',
        '#FFFF00',
        '#00FF00',
        '#0000FF'
      ],
      colorBar_axis_scale_interval: 1,
    },
    calendar: {
      defaultEdgePoint: {
        mouseTracking: false,
        label_visible: false
      },
      defaultEmptyPoint: {
        outline_width: 0,
        opacity: 0.5,
        legendEntry_visible: false
      }
    },
    legend: {
      title_label: {
        text: '<b>Select Month</b>',
        align: 'right',
        style: { fontSize: '15px' }
      },
      defaultEntry: {
        style: { fontSize: '12px' },
        states_hidden_color: '#a5a5a5'
      },
      template: `%name`
    },

    defaultPoint: {
      tooltip:
        '<b>{%date:date D}</b><br> You felt like a %zValue out of 5',
    },

    yAxis_visible: false,
    xAxis_line_visible: false,

  }
  );
}