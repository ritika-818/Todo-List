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
const searchVal = document.getElementsByClassName(
  "search"
)[0] as HTMLInputElement;
const priorityValRight = document.getElementsByClassName(
  "priority-right"
)[0] as HTMLInputElement;
const iscompleted = document.getElementsByClassName(
  "filter-inp"
)[0] as HTMLInputElement;
console.log("hello ritika");

type Priority = "low" | "medium" | "high";

type Tasks = {
  titleName: string;
  descName: string;
  priorityName: Priority;
  completed: boolean;
};

const tasks: Tasks[] = [];

add.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === "") return;
  else if (desc.value === "") return;
  else generateArray(tasks);
});

function generateArray(tasks: Tasks[]): void {
  const titleName = title.value;
  const descName = desc.value;
  const priorityName = priorityVal.value as Priority;
  const completed = false;
  tasks.push({
    ...tasks,
    titleName: titleName,
    descName: descName,
    priorityName: priorityName,
    completed: completed,
  });
  console.log(tasks);
  createCards(tasks);
}

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

searchVal.addEventListener("input", () => filterSearch(tasks));

function filterSearch(tasks: Tasks[]): void {
  const val = searchVal.value.trim();
  // const taskComplete = iscompleted.value === "complete";
  if (val === "") createCards(tasks);
  const filterTasks = tasks.filter((task) => {
    return (
      (task.titleName.toLowerCase().includes(val.toLowerCase()) || task.descName.toLowerCase().includes(val.toLowerCase())) 
    );
  });
  console.log("ritika", filterTasks);
  createCards(filterTasks);
}

priorityValRight.addEventListener("change", () => filterPriority(tasks));

function filterPriority(tasks: Tasks[]): void {
  const order = priorityValRight.value;
  const filterarr = sortPriority(tasks,order);
  if(order === "") createCards(tasks);
  else createCards(filterarr);
}

function sortPriority(tasks:Tasks[],order:String):Tasks[]{
  const priorityMap : Record<Priority,number> = {
    low:1,
    medium:2,
    high:3,
  };
  return tasks.sort((a,b)=>{
    const p1 = priorityMap[a.priorityName as Priority];
    const p2 = priorityMap[b.priorityName as Priority];

    if(order === "asc"){
      return p1-p2;
    } else{
      return p2-p1;
    }
  });
}

iscompleted.addEventListener("change", () => filterCategory(tasks));

function filterCategory(tasks: Tasks[]): void {
  if (iscompleted.value === "all") {
    createCards(tasks);
    return;
  }
  const priority = priorityValRight.value;
  const val = iscompleted.value === "complete";
  const filterTasks = tasks.filter((task) => {
    return (task.completed === val)
  });
  console.log("Filtered Tasks", filterTasks);
  createCards(filterTasks);
}

function createCards(tasks: Tasks[]): void {
  cardContainer.innerHTML = "";
  if (tasks.length === 0) return;
  tasks.forEach((task) => {
    const card = document.createElement("div");
    card.classList.add("task-card");
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftDiv");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = task.completed;
    check.addEventListener("change", () => {
      task.completed = check.checked;
    });
    leftDiv.appendChild(check);
    card.appendChild(leftDiv);
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("rightDiv");
    const cardTitle = document.createElement("h4");
    cardTitle.classList.add("title");
    cardTitle.textContent = task.titleName;
    rightDiv.appendChild(cardTitle);
    rightDiv.appendChild(categoryDiv);
    const priorityDiv = document.createElement("div");
    const priority = document.createElement("span");
    priority.textContent =
      dateVal.value +
      "   |   12:10 in the afternoon   |   " +
      task.priorityName +
      " priority";
    priorityDiv.appendChild(priority);
    rightDiv.appendChild(priorityDiv);
    // rightDiv.appendChild(categoryDiv);
    const cardDesc = document.createElement("p");
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
