

const actionBtn = document.getElementById("action-btn");
const openStatusBtn = document.getElementById("open-status-btn");
const closeStatusBtn = document.getElementById("close-status-btn");

actionList = document.getElementById("action-list");
statusList = document.getElementById("status-list");
optList = document.querySelectorAll('.optList')

function toggleDropDownAction(e) {
  e.preventDefault();
  const actionList = document.getElementById("action-list");
  const statusList = document.getElementById("status-list");

  if (!statusList.classList.contains("hidden")) {
    statusList.classList.add("hidden");
  }

  actionList.classList.toggle("hidden");
}

function toggleDropDownStatus(e) {
  e.preventDefault();
  const actionList = document.getElementById("action-list");
  const statusList = document.getElementById("status-list");

  if (!actionList.classList.contains("hidden")) {
    actionList.classList.add("hidden");
  }

  statusList.classList.toggle("hidden");

  changeStatus(e)
}

function changeStatus(e) {
    e.preventDefault();
    const options = document.querySelectorAll('#status-list li');
    
    options.forEach(opt => {
        if (opt.classList.contains('hidden')) {
            opt.classList.remove('hidden')
        }else{
            opt.classList.add('hidden')
        }
    });
}


function init() {
actionBtn.addEventListener("click", toggleDropDownAction);
openStatusBtn.addEventListener("click", toggleDropDownStatus);
optList.forEach(opt => {
    opt.addEventListener('click', changeStatus);
    console.log(opt)
})
}

init()