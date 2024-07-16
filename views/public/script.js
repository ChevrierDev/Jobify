// const actionBtn = document.getElementById("action-btn");
// const openStatusBtn = document.getElementById("open-status-btn");
// const closeStatusBtn = document.getElementById("close-status-btn");

// actionList = document.getElementById("action-list");
// statusList = document.getElementById("status-list");
// jobSection = document.getElementById("job-status-div");
// optList = document.querySelectorAll(".optList");

// function toggleDropDownAction(e) {
//   e.preventDefault();
//   const actionList = document.getElementById("action-list");
//   const statusList = document.getElementById("status-list");

//   if (!statusList.classList.contains("hidden")) {
//     statusList.classList.add("hidden");
//   }

//   actionList.classList.toggle("hidden");
// }

// function toggleDropDownStatus(e) {
//   e.preventDefault();
//   const actionList = document.getElementById("action-list");
//   const statusList = document.getElementById("status-list");
//   const Open = actionList.classList.contains("hidden");

//   if (!Open) {
//     actionList.classList.add("hidden");
//   } 
//   statusList.classList.toggle("hidden");
// }

// function changeStatus(e) {
//   e.preventDefault();
//   const options = document.querySelectorAll("#status-list li");
//   const closeStatus = jobSection.children[1];
//   const openStatus = jobSection.children[0];

//   options.forEach((opt) => {
//     if (opt.classList.contains("hidden")) {
//       opt.classList.remove("hidden");
//       openStatus.classList.add('hidden')
//       closeStatus.classList.remove('hidden')
//       console.log(opt)
//       console.log(opt)
//     } else {
//       opt.classList.add("hidden");
//       openStatus.classList.remove('hidden')
//       closeStatus.classList.add('hidden')
//     }
//   });
  
//   closeStatus.addEventListener('click', toggleDropDownStatus);
  
// }


// function init() {
//   actionBtn.addEventListener("click", toggleDropDownAction);
//   openStatusBtn.addEventListener("click", toggleDropDownStatus);
//   optList.forEach((opt) => {
//     opt.addEventListener("click", changeStatus);
//   });
// }

// init();

