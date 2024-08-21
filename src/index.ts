const add = document.getElementsByClassName("add-btn")[0] as HTMLButtonElement;
const cardContainer = document.getElementsByClassName(
  "card-container"
)[0] as HTMLDivElement;
const title = document.getElementsByClassName(
  "title-inp"
)[0] as HTMLInputElement;
const desc = document.getElementsByClassName(
  "description-inp"
)[0] as HTMLInputElement;
const category = document.getElementsByClassName(
  "category-val"
)[0] as HTMLInputElement;
const categoryDiv = document.getElementsByClassName(
  "category-inp"
)[0] as HTMLInputElement;
const priorityVal = document.getElementsByClassName(
  "priority-inp"
)[0] as HTMLInputElement;
const dateVal = document.getElementsByClassName(
  "date-inp"
)[0] as HTMLInputElement;

category.addEventListener("change", () => {
  const crossBtn = document.createElement("button");
  crossBtn.classList.add("cross-btn");
  crossBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  const val = document.createElement("span");
  val.classList.add("category-value");
  val.textContent = category.value;
  val.appendChild(crossBtn);
  categoryDiv.appendChild(val);
  crossBtn.addEventListener("click", () => {
    categoryDiv.removeChild(val);
  });
});

add.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === "") return;
  else if (desc.value === "") return;
  else createCards();
});

function createCards(): void {
  const card = document.createElement("div");
  card.classList.add("task-card");
  const leftDiv = document.createElement("div");
  leftDiv.classList.add("leftDiv");
  const check = document.createElement("input");
  check.setAttribute("type", "checkbox");
  leftDiv.appendChild(check);
  card.appendChild(leftDiv);
  const rightDiv = document.createElement("div");
  rightDiv.classList.add("rightDiv");
  const cardTitle = document.createElement("h4");
  cardTitle.classList.add("title");
  cardTitle.textContent = title.value;
  rightDiv.appendChild(cardTitle);
  rightDiv.appendChild(categoryDiv);
  const priorityDiv = document.createElement("div");
  const priority = document.createElement("span");
  priority.textContent =
    dateVal.value +
    "   |   12:10 in the afternoon   |   " +
    priorityVal.value +
    " priority";
  priorityDiv.appendChild(priority);
  rightDiv.appendChild(priorityDiv);
  const cardDesc = document.createElement("p");
  cardDesc.classList.add("desc");
  cardDesc.textContent = desc.value;
  rightDiv.appendChild(cardDesc);
  card.appendChild(rightDiv);
  cardContainer.appendChild(card);
  title.value = "";
  desc.value = "";
}
