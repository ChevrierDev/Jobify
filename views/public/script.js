actionBtn = document.getElementById('action-btn').addEventListener('click', toggleDropDown);
actionList = document.getElementById('action-list');

function toggleDropDown(e) {
    e.preventDefault()
    const dropDown = actionList;
   dropDown.classList.contains('hidden') ? dropDown.classList.remove('hidden') : dropDown.classList.add('hidden')
}

toggleDropDown()
