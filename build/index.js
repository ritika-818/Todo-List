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
var rightCategory = document.getElementsByClassName("category-right")[0];
console.log("hello ritika");
var tasks = loadTasks();
var categoryArr = [];
var categoryRightArr = [];
add.addEventListener("click", function (e) {
    e.preventDefault();
    if (title.value === "")
        return;
    if (desc.value === "")
        return;
    if (dateVal.value === "")
        return;
    if (priorityVal.value === "")
        return;
    if (categoryArr.length === 0)
        return;
    else
        generateArray(tasks);
});
function generateArray(tasks) {
    var titleName = title.value;
    var descName = desc.value;
    var priorityName = priorityVal.value;
    var completed = false;
    var category = categoryArr;
    var dateValue = dateVal.value;
    tasks.push(__assign(__assign({}, tasks), { titleName: titleName, descName: descName, priorityName: priorityName, completed: completed, category: category, date: dateValue }));
    console.log(tasks);
    saveTasks(tasks);
    createCards(tasks);
}
var rightCategoryDiv = document.getElementsByClassName("category-right-inp")[0];
rightCategory.addEventListener("change", function () {
    if (rightCategory.value === "")
        return;
    var val = document.createElement("span");
    val.classList.add("category-value");
    val.textContent = rightCategory.value;
    var crossBtn = document.createElement("button");
    crossBtn.classList.add("cross-btn");
    crossBtn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>";
    val.classList.add("category-value");
    val.appendChild(crossBtn);
    rightCategoryDiv.appendChild(val);
    categoryRightArr.push(rightCategory.value);
    crossBtn.addEventListener("click", function () {
        rightCategoryDiv.removeChild(val);
        categoryRightArr = categoryRightArr.filter(function (category) { return category !== val.textContent; });
        if (categoryRightArr.length === 0) {
            rightCategory.value = "";
            createCards(tasks);
        }
        filterCategory(tasks);
    });
    filterCategory(tasks);
});
function filterCategory(tasks) {
    if (categoryRightArr.length === 0) {
        createCards(tasks);
        return;
    }
    var filterArr = tasks.filter(function (task) {
        return task.category.some(function (item) { return categoryRightArr.includes(item); });
    });
    createCards(filterArr);
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
    categoryArr.push(category.value);
    crossBtn.addEventListener("click", function () {
        categoryDiv.removeChild(val);
        var removeIndex = 0;
        categoryArr.forEach(function (item, i) {
            if (item.includes(category.value))
                removeIndex = i;
        });
        categoryArr.splice(removeIndex, 1);
    });
    category.value = "";
});
searchVal.addEventListener("input", function () { return filterSearch(tasks); });
priorityValRight.addEventListener("change", function () { return filterPriority(tasks); });
iscompleted.addEventListener("change", function () { return filterComplete(tasks); });
function filterSearch(tasks) {
    var val = searchVal.value.trim();
    // const taskComplete = iscompleted.value === "complete";
    if (val === "")
        createCards(tasks);
    var filterTasks = tasks.filter(function (task) {
        return (task.titleName.toLowerCase().includes(val.toLowerCase()) ||
            task.descName.toLowerCase().includes(val.toLowerCase()));
    });
    console.log("ritika", filterTasks);
    createCards(filterTasks);
}
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
function filterComplete(tasks) {
    if (iscompleted.value === "all") {
        createCards(tasks);
        return;
    }
    var val = iscompleted.value === "complete";
    var filterTasks = tasks.filter(function (task) {
        return task.completed === val;
    });
    console.log("Filtered Tasks", filterTasks);
    createCards(filterTasks);
}
function createCards(tasks) {
    cardContainer.innerHTML = "";
    if (tasks.length === 0)
        return;
    tasks.forEach(function (task, i) {
        var card = document.createElement("div");
        card.classList.add("task-card");
        var leftDiv = document.createElement("div");
        leftDiv.classList.add("leftDiv");
        var check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.checked = task.completed;
        check.addEventListener("change", function () {
            task.completed = check.checked;
            saveTasks(tasks);
        });
        leftDiv.appendChild(check);
        card.appendChild(leftDiv);
        var rightDiv = document.createElement("div");
        rightDiv.classList.add("rightDiv");
        var cardTitle = document.createElement("h2");
        cardTitle.classList.add("title");
        cardTitle.textContent = task.titleName;
        rightDiv.appendChild(cardTitle);
        var priorityDiv = document.createElement("div");
        if (task.priorityName === "high")
            priorityDiv.style.color = "red";
        else if (task.priorityName === "low")
            priorityDiv.style.color = "green";
        else
            priorityDiv.style.color = "#E4971A";
        priorityDiv.classList.add('priority-div');
        var priority = document.createElement("span");
        var date = new Date(task.date);
        var dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        var monthName = date.toLocaleDateString('en-US', { month: 'short' });
        var day = date.getDate();
        var year = date.getFullYear();
        priority.textContent =
            "".concat(dayName, " ").concat(monthName, "-").concat(day, "-").concat(year) +
                "   |   12:10 in the afternoon   |   " +
                task.priorityName +
                " priority";
        priorityDiv.appendChild(priority);
        rightDiv.appendChild(priorityDiv);
        var itemDivContainer = document.createElement("div");
        itemDivContainer.classList.add('item-div-container');
        task.category.forEach(function (item) {
            var itemDiv = document.createElement("span");
            itemDiv.classList.add('category-item-value');
            itemDiv.textContent = item;
            itemDivContainer.appendChild(itemDiv);
        });
        rightDiv.appendChild(itemDivContainer);
        var cardDesc = document.createElement("p");
        cardDesc.classList.add("desc");
        cardDesc.textContent = task.descName;
        rightDiv.appendChild(cardDesc);
        card.appendChild(rightDiv);
        var trashDiv = document.createElement('div');
        trashDiv.classList.add('trash');
        trashDiv.innerHTML = "<i class=\"fa-solid fa-trash\"></i>";
        card.appendChild(trashDiv);
        cardContainer.appendChild(card);
        trashDiv.addEventListener('click', function () {
            cardContainer.removeChild(card);
            tasks.splice(i, 1);
            saveTasks(tasks);
            createCards(tasks);
        });
    });
    title.value = "";
    desc.value = "";
    priorityVal.value = "";
    categoryDiv.innerHTML = "";
    categoryArr = [];
    dateVal.value = "";
}
function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    var tasksJSON = localStorage.getItem("tasks");
    return tasksJSON ? JSON.parse(tasksJSON) : [];
}
createCards(tasks);
