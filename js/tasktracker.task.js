const Action = {COMPLETE: "complete", REOPEN: "reopen", DELETE: "delete"};


const getToggleAction = action => action === Action.COMPLETE ? Action.REOPEN : Action.COMPLETE

const toggleTaskEntryComplete = (uid, btn) => {
    const action = getToggleAction(btn.getAttribute("data-action"));
    const task = document.getElementById(uid);
    task.classList.toggle("task-completed");
    btn.setAttribute("data-action", action);
    btn.classList.toggle("bi-check-lg");
    btn.classList.toggle("bi-repeat");
}


const removeTaskEntry = uid => {
    const taskContainer = document.getElementById("taskContainer");
    const task = document.getElementById(uid);
    taskContainer.removeChild(task);
}


const handleTaskAction = event => {
    const target = event.target.getAttribute("data-target");
    const action = event.target.getAttribute("data-action");

    if (action === Action.COMPLETE || action === Action.REOPEN) toggleTaskEntryComplete(target, event.target);
    if (action === Action.DELETE) removeTaskEntry(target);
}


const toggleTaskStatusButton = btn => {
    const action = getToggleAction(btn.getAttribute("data-action"));
    btn.classList.toggle("bi-check-lg");
    btn.classList.toggle("bi-repeat");
    btn.classList.toggle("btn-success");
    btn.classList.toggle("btn-primary");
    btn.setAttribute("data-action", action);
}


const toggleTaskStatus = event => {
    toggleTaskStatusButton(event.target);
}

const listActionButtons = document.querySelectorAll("#taskContainer .actions .btn.task-action");
listActionButtons.forEach(btn => btn.addEventListener("click", handleTaskAction));

const taskActionButton = document.querySelector("#taskActionsContainer .btn.task-action");
if (taskActionButton) taskActionButton.addEventListener("click", toggleTaskStatus);
