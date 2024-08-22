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
const searchVal = document.getElementsByClassName('search')[0] as HTMLInputElement;


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

type Tasks = {
  titleName: string;
  descName: string;
}

const tasks: Tasks[]=[];

add.addEventListener("click", (e) => {
  e.preventDefault();
  if (title.value === "") return;
  else if (desc.value === "") return;
  else generateArray(tasks);
});

function generateArray(tasks:Tasks[]):void{
  const titleName = title.value;
  const descName = desc.value;
  tasks.push({titleName:titleName,descName:descName});
  console.log(tasks);
  createCards(tasks);
}
console.log("ttt",tasks.length)

  searchVal.addEventListener('input',()=>filterSearch(tasks));
function filterSearch(tasks:Tasks[]):void{
  const val = searchVal.value.trim();
  if(val==="") createCards(tasks);
  const filterTasks = tasks.filter((task)=>{return task.titleName.toLowerCase().includes(val.toLowerCase());
  });
  console.log("ritika",filterTasks);
  createCards(filterTasks);
}

function createCards(tasks:Tasks[]): void {
  if(tasks.length === 0) generateArray(tasks);
  cardContainer.innerHTML = '';
  tasks.forEach((task)=>{
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
  cardTitle.textContent = task.titleName;
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
  // rightDiv.appendChild(categoryDiv);
  const cardDesc = document.createElement("p");
  cardDesc.classList.add("desc");
  cardDesc.textContent = task.descName;
  rightDiv.appendChild(cardDesc);
  card.appendChild(rightDiv);
  cardContainer.appendChild(card);
  })
  title.value = "";
  desc.value = "";
}
