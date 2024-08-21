"use strict";
var add = document.getElementsByClassName("add-btn")[0];
var cardContainer = document.getElementsByClassName("card-container")[0];
var title = document.getElementsByClassName("title-inp")[0];
var desc = document.getElementsByClassName("description-inp")[0];
var category = document.getElementsByClassName("category-val")[0];
var categoryDiv = document.getElementsByClassName("category-inp")[0];
var priorityVal = document.getElementsByClassName("priority-inp")[0];
var dateVal = document.getElementsByClassName("date-inp")[0];
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
add.addEventListener("click", function (e) {
    e.preventDefault();
    if (title.value === "")
        return;
    else if (desc.value === "")
        return;
    else
        createCards();
});
function createCards() {
    var card = document.createElement("div");
    card.classList.add("task-card");
    var leftDiv = document.createElement("div");
    leftDiv.classList.add("leftDiv");
    var check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    leftDiv.appendChild(check);
    card.appendChild(leftDiv);
    var rightDiv = document.createElement("div");
    rightDiv.classList.add("rightDiv");
    var cardTitle = document.createElement("h4");
    cardTitle.classList.add("title");
    cardTitle.textContent = title.value;
    rightDiv.appendChild(cardTitle);
    rightDiv.appendChild(categoryDiv);
    var priorityDiv = document.createElement("div");
    var priority = document.createElement("span");
    priority.textContent =
        dateVal.value +
            "   |   12:10 in the afternoon   |   " +
            priorityVal.value +
            " priority";
    priorityDiv.appendChild(priority);
    rightDiv.appendChild(priorityDiv);
    var cardDesc = document.createElement("p");
    cardDesc.classList.add("desc");
    cardDesc.textContent = desc.value;
    rightDiv.appendChild(cardDesc);
    card.appendChild(rightDiv);
    cardContainer.appendChild(card);
    title.value = "";
    desc.value = "";
}
