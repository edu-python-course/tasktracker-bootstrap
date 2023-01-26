const Action = {COMPLETE: "complete", REOPEN: "reopen", DELETE: "delete"};


const toggleTaskEntryComplete = (uid, btn) => {
    let action = btn.getAttribute("data-action");
    action = action === Action.COMPLETE ? Action.REOPEN : Action.COMPLETE;
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


const actionButtons = document.querySelectorAll(".task-action.btn");
actionButtons.forEach(btn => btn.addEventListener("click", handleTaskAction));
