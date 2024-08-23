"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var add = document.getElementsByClassName("add-btn")[0];
var cardContainer = document.getElementsByClassName("card-container")[0];
var title = document.getElementsByClassName("title-inp")[0];
var desc = document.getElementsByClassName("description-inp")[0];
var category = document.getElementsByClassName("category-val")[0];
var categoryDiv = document.getElementsByClassName("category-inp")[0];
var priorityVal = document.getElementsByClassName("priority-inp")[0];
var dateVal = document.getElementsByClassName("date-inp")[0];
var searchVal = document.getElementsByClassName("search")[0];
var priorityValRight = document.getElementsByClassName("priority-right")[0];
var iscompleted = document.getElementsByClassName("filter-inp")[0];
console.log("hello ritika");
var tasks = [];
add.addEventListener("click", function (e) {
    e.preventDefault();
    if (title.value === "")
        return;
    else if (desc.value === "")
        return;
    else
        generateArray(tasks);
});
function generateArray(tasks) {
    var titleName = title.value;
    var descName = desc.value;
    var priorityName = priorityVal.value;
    var completed = false;
    tasks.push(__assign(__assign({}, tasks), { titleName: titleName, descName: descName, priorityName: priorityName, completed: completed }));
    console.log(tasks);
    createCards(tasks);
}
category.addEventListener("change", function () {
    var crossBtn = document.createElement("button");
    crossBtn.classList.add("cross-btn");
    crossBtn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
    var val = document.createElement("span");
    val.classList.add("category-value");
    val.textContent = category.value;
    val.appendChild(crossBtn);
    categoryDiv.appendChild(val);
    crossBtn.addEventListener("click", function () {
        categoryDiv.removeChild(val);
    });
});
searchVal.addEventListener("input", function () { return filterSearch(tasks); });
function filterSearch(tasks) {
    var val = searchVal.value.trim();
    // const taskComplete = iscompleted.value === "complete";
    if (val === "")
        createCards(tasks);
    var filterTasks = tasks.filter(function (task) {
        return ((task.titleName.toLowerCase().includes(val.toLowerCase()) || task.descName.toLowerCase().includes(val.toLowerCase())));
    });
    console.log("ritika", filterTasks);
    createCards(filterTasks);
}
priorityValRight.addEventListener("change", function () { return filterPriority(tasks); });
function filterPriority(tasks) {
    var order = priorityValRight.value;
    var filterarr = sortPriority(tasks, order);
    if (order === "")
        createCards(tasks);
    else
        createCards(filterarr);
}
function sortPriority(tasks, order) {
    var priorityMap = {
        low: 1,
        medium: 2,
        high: 3,
    };
    return tasks.sort(function (a, b) {
        var p1 = priorityMap[a.priorityName];
        var p2 = priorityMap[b.priorityName];
        if (order === "asc") {
            return p1 - p2;
        }
        else {
            return p2 - p1;
        }
    });
}
iscompleted.addEventListener("change", function () { return filterCategory(tasks); });
function filterCategory(tasks) {
    if (iscompleted.value === "all") {
        createCards(tasks);
        return;
    }
    var priority = priorityValRight.value;
    var val = iscompleted.value === "complete";
    var filterTasks = tasks.filter(function (task) {
        return (task.completed === val);
    });
    console.log("Filtered Tasks", filterTasks);
    createCards(filterTasks);
}
function createCards(tasks) {
    cardContainer.innerHTML = "";
    if (tasks.length === 0)
        return;
    tasks.forEach(function (task) {
        var card = document.createElement("div");
        card.classList.add("task-card");
        var leftDiv = document.createElement("div");
        leftDiv.classList.add("leftDiv");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.checked = task.completed;
        check.addEventListener("change", function () {
            task.completed = check.checked;
        });
        leftDiv.appendChild(check);
        card.appendChild(leftDiv);
        var rightDiv = document.createElement("div");
        rightDiv.classList.add("rightDiv");
        var cardTitle = document.createElement("h4");
        cardTitle.classList.add("title");
        cardTitle.textContent = task.titleName;
        rightDiv.appendChild(cardTitle);
        rightDiv.appendChild(categoryDiv);
        var priorityDiv = document.createElement("div");
        var priority = document.createElement("span");
        priority.textContent =
            dateVal.value +
                "   |   12:10 in the afternoon   |   " +
                task.priorityName +
                " priority";
        priorityDiv.appendChild(priority);
        rightDiv.appendChild(priorityDiv);
        // rightDiv.appendChild(categoryDiv);
        var cardDesc = document.createElement("p");
        cardDesc.classList.add("desc");
        cardDesc.textContent = task.descName;
        rightDiv.appendChild(cardDesc);
        card.appendChild(rightDiv);
        cardContainer.appendChild(card);
    });
    title.value = "";
    desc.value = "";
    priorityVal.value = "";
}
