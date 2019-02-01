var dataInput = document.getElementById("new-task");
var parentDev = document.getElementById("tdl-list");
var doneDev = document.getElementById("done-list");
var removeTask;
var i = 1;
var doneTaskArray = [];

addingTasks();
storageReload();

function storageReload() {
    var countDone = 0;
    var archive = [];
    var doneArchive = [];

    doneArchive = JSON.parse(localStorage.getItem(100));
   
    for (let k = 0; k < doneArchive.length; k++) {
        var newTask2 = document.createElement("li");
        var textNode2 = document.createTextNode(doneArchive[k]);
        newTask2.appendChild(textNode2);
        doneDev.appendChild(newTask2);
    }
    for (let j = 1; j < localStorage.length; j++) {
        archive[j] = JSON.parse(localStorage.getItem(j));

        var newTask = document.createElement("li");
        newTask.setAttribute("id", Object.keys(localStorage)[j]);
        var textNode = document.createTextNode(archive[j]);
        newTask.appendChild(textNode);
        parentDev.appendChild(newTask);
        removeTask = document.createElement("button");
        removeTask.setAttribute("id", Object.keys(localStorage)[j]);
        removeTask.textContent = "X"
        newTask.appendChild(removeTask);

        var doneTask = document.createElement("button");
        doneTask.setAttribute("id", countDone);
        doneTask.textContent = "Done"
        newTask.appendChild(doneTask);

        removeTask.addEventListener("click", removeElement);

        function removeElement() {
            var id = this.getAttribute("id")
            parentDev.removeChild(newTask);
            newTask.removeChild(removeTask);
            localStorage.removeItem(Object.keys(localStorage)[j - 1]);
        }
        doneTask.addEventListener("click", doneElement);

        function doneElement() {
            var id = this.getAttribute("id");

            var newTask2 = document.createElement("li");
            newTask2.setAttribute("id", id);
            var data = JSON.parse(localStorage.getItem(id));

            var textNode = document.createTextNode(data);
            newTask2.appendChild(textNode);
            doneDev.appendChild(newTask2);
            newTask2.appendChild(removeTask);
            newTask2.appendChild(doneTask);
            parentDev.removeChild(newTask);
            localStorage.removeItem(id);
        }
        countDone++;
    } //end of for 
}


function addingTasks() {

    btnAdd.addEventListener("click", addListener);

    function addListener() {
        var newTask = document.createElement("li");
        newTask.setAttribute("id", i);
        var textNode = document.createTextNode(dataInput.value);
        newTask.appendChild(textNode);
        parentDev.appendChild(newTask);

        var removeTask = document.createElement("button");
        removeTask.setAttribute("id", i);
        removeTask.textContent = "X"
        newTask.appendChild(removeTask);

        var doneTask = document.createElement("button");
        doneTask.setAttribute("id", i);
        doneTask.textContent = "Done"
        newTask.appendChild(doneTask);

        localStorage.setItem(i, JSON.stringify(dataInput.value));

        removeTask.addEventListener("click", removeElement);

        function removeElement() {
            var id = this.getAttribute("id");
            parentDev.removeChild(newTask);
            localStorage.removeItem(id);
        }
        doneTask.addEventListener("click", doneElement);

        function doneElement() {
            var id = this.getAttribute("id");
            var newTask2 = document.createElement("li");
            newTask2.setAttribute("id", id);
            var data = JSON.parse(localStorage.getItem(id));
            console.log(data);
            var textNode = document.createTextNode(data);
            newTask2.appendChild(textNode);
            doneDev.appendChild(newTask2);
            parentDev.removeChild(newTask);
            doneTaskArray.push(data);
            localStorage.setItem(100, JSON.stringify(doneTaskArray));
            localStorage.removeItem(id);
            //console.log(doneTaskArray);

        }
        i++;
    }

}


var removeAll = document.getElementById("btnClear");
removeAll.addEventListener("click", remove);

function remove() {
    localStorage.clear();
    while (parentDev.firstChild) {
        parentDev.removeChild(parentDev.firstChild);
    }
}
