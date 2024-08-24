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
const rightCategory = document.getElementsByClassName(
  "category-right"
)[0] as HTMLInputElement;

type Tasks = {
  titleName: string;
  descName: string;
  priorityName: string;
  completed: boolean;
  category: string[];
  date: string;
};

let tasks: Tasks[] = loadTasks();

let categoryArr: string[] = [];
let categoryRightArr: string[] = [];

add.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === "") return;
  if (desc.value === "") return;
  if (dateVal.value === "") return;
  if (priorityVal.value === "") return;
  if (categoryArr.length === 0) return;
  else generateArray(tasks);
});

function generateArray(tasks: Tasks[]): void {
  const titleName = title.value;
  const descName = desc.value;
  const priorityName = priorityVal.value;
  const completed = false;
  const category = categoryArr;
  const dateValue = dateVal.value;
  tasks.push({
    ...tasks,
    titleName: titleName,
    descName: descName,
    priorityName: priorityName,
    completed: completed,
    category: category,
    date: dateValue
  });
  saveTasks(tasks);
  createCards(tasks);
}
const rightCategoryDiv = document.getElementsByClassName(
  "category-right-inp"
)[0] as HTMLDivElement;
rightCategory.addEventListener("change", () => {
  if(rightCategory.value==="") return;
  const val = document.createElement("span") as HTMLSpanElement;
  val.classList.add("category-value");
  val.textContent = rightCategory.value;
  const crossBtn = document.createElement("button");
  crossBtn.classList.add("cross-btn");
  crossBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  val.classList.add("category-value");
  val.appendChild(crossBtn);
  rightCategoryDiv.appendChild(val);
  categoryRightArr.push(rightCategory.value);
  crossBtn.addEventListener("click", () => {
    rightCategoryDiv.removeChild(val);
    categoryRightArr = categoryRightArr.filter(
      (category) => category !== val.textContent
    );
    if(categoryRightArr.length === 0) {
      rightCategory.value = "";
      createCards(tasks);
    }
    filterCategory(tasks);
  });
  filterCategory(tasks);
});

function filterCategory(tasks:Tasks[]):void{
  if(categoryRightArr.length === 0){
    createCards(tasks);
    return;
  }
  const filterArr = tasks.filter((task) =>
    task.category.some((item) => categoryRightArr.includes(item))
  );
  createCards(filterArr);
}

category.addEventListener("change", () => {
  const crossBtn = document.createElement("button");
  crossBtn.classList.add("cross-btn");
  crossBtn.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  const val = document.createElement("span") as HTMLSpanElement;
  val.classList.add("category-value");
  val.textContent = category.value;
  val.appendChild(crossBtn);
  categoryDiv.appendChild(val);
  categoryArr.push(category.value);
  crossBtn.addEventListener("click", () => {
    categoryDiv.removeChild(val);
    let removeIndex = 0;
    categoryArr.forEach((item, i) => {
      if (item.includes(category.value)) removeIndex = i;
    });
    categoryArr.splice(removeIndex, 1);
  });

  category.value = "";
});

searchVal.addEventListener("input", () => applyFilters(tasks));
priorityValRight.addEventListener("change", () => applyFilters(tasks));
iscompleted.addEventListener("change", () => applyFilters(tasks));


function applyFilters(tasks: Tasks[]): void {
  let filteredTasks = tasks;
  if (categoryRightArr.length > 0) {
    filteredTasks = filteredTasks.filter((task) =>
      task.category.some((item) => categoryRightArr.includes(item))
    );
  }

  if (priorityValRight.value !== "") {
    filteredTasks = sortPriority(filteredTasks, priorityValRight.value);
  }

  if (iscompleted.value !== "all") {
    const val = iscompleted.value === "complete";
    filteredTasks = filteredTasks.filter((task) => task.completed === val);
  }

  const searchValTrimmed = searchVal.value.trim();
  if (searchValTrimmed !== "") {
    filteredTasks = filteredTasks.filter((task) => {
      return (
        task.titleName.toLowerCase().includes(searchValTrimmed.toLowerCase()) ||
        task.descName.toLowerCase().includes(searchValTrimmed.toLowerCase())
      );
    });
  }

  createCards(filteredTasks);
}

function sortPriority(tasks: Tasks[], order: String): Tasks[] {
  const priorityMap: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
  };
  return tasks.sort((a, b) => {
    const p1 = priorityMap[a.priorityName];
    const p2 = priorityMap[b.priorityName];

    if (order === "asc") {
      return p1 - p2;
    } else {
      return p2 - p1;
    }
  });
}

function createCards(tasks: Tasks[]): void {
  cardContainer.innerHTML = "";
  if (tasks.length === 0) return;
  tasks.forEach((task,i) => {
    const card = document.createElement("div");
    card.classList.add("task-card");
    const leftDiv = document.createElement("div");
    leftDiv.classList.add("leftDiv");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    check.checked = task.completed;
    check.addEventListener("change", () => {
      task.completed = check.checked;
      saveTasks(tasks);
    });
    leftDiv.appendChild(check);
    card.appendChild(leftDiv);
    const rightDiv = document.createElement("div");
    rightDiv.classList.add("rightDiv");
    const cardTitle = document.createElement("h2");
    cardTitle.classList.add("title");
    cardTitle.textContent = task.titleName;
    rightDiv.appendChild(cardTitle);
    const priorityDiv = document.createElement("div");
    if(task.priorityName === "high") priorityDiv.style.color = "red";
    else if(task.priorityName === "low") priorityDiv.style.color = "green";
    else priorityDiv.style.color = "#E4971A";
    priorityDiv.classList.add('priority-div');
    const priority = document.createElement("span");
    const date = new Date(task.date);
    const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
    const monthName = date.toLocaleDateString('en-US', { month: 'short' }); 
    const day = date.getDate();
    const year = date.getFullYear(); 
    priority.textContent =
      `${dayName} ${monthName}-${day}-${year}` +
      "   |   12:10 in the afternoon   |   " +
      task.priorityName +
      " priority";
    priorityDiv.appendChild(priority);
    rightDiv.appendChild(priorityDiv);
    const itemDivContainer = document.createElement("div");
    itemDivContainer.classList.add('item-div-container');
    task.category.forEach((item) => {
      const itemDiv = document.createElement("span") as HTMLSpanElement;
      itemDiv.classList.add('category-item-value');
      itemDiv.textContent = item;
      itemDivContainer.appendChild(itemDiv);
    });
    rightDiv.appendChild(itemDivContainer);
    const cardDesc = document.createElement("p");
    cardDesc.classList.add("desc");
    cardDesc.textContent = task.descName;
    rightDiv.appendChild(cardDesc);
    card.appendChild(rightDiv);
    const trashDiv = document.createElement('div');
    trashDiv.classList.add('trash');
    trashDiv.innerHTML = `<i class="fa-solid fa-trash"></i>`;
    card.appendChild(trashDiv);
    cardContainer.appendChild(card);
    trashDiv.addEventListener('click',()=>{
      cardContainer.removeChild(card);
      tasks.splice(i, 1);
      saveTasks(tasks);
      createCards(tasks);
    })
  });
  title.value = "";
  desc.value = "";
  priorityVal.value = "";
  categoryDiv.innerHTML = "";
  categoryArr = [];
  dateVal.value="";
}

function saveTasks(tasks: Tasks[]): void {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks(): Tasks[] {
  const tasksJSON = localStorage.getItem("tasks");
  return tasksJSON ? JSON.parse(tasksJSON) : [];
}

createCards(tasks); 