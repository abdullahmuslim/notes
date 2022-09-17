//get viewport width
let viewportWidth = window.screen.availWidth;
let maxX = (viewportWidth / 4);
let minX = maxX * -1;
let oldPos = 0;

function menu(){
  let menu = document.getElementById("menu");
  let trans = document.getElementById("trans");
  menu.style.display = "flex";
  trans.style.left = "0";
}
function canc(){
  let menu = document.getElementById("menu");
  let trans = document.getElementById("trans");
  menu.style.display = "none";
  trans.style.left = "-101vw";
}

function slideDelete(e){
  if(oldPos !== 0){
    if(event.isTrusted){
      let touches = e.changedTouches;
      touches = touches[0];
      let newPos = touches.pageX;
      let target = e.currentTarget;
      let prevPos = window.getComputedStyle(target).getPropertyValue("left");
      prevPos = Number(prevPos.replace("px", ""));
      let movement = (newPos - oldPos);
      if (movement > maxX || movement < (maxX)*-1){
        target.style.left = `${prevPos + movement}px`;
        target.style.background = "#f66";3
        oldPos += movement;
      }
    }
  }
  else{
    let touches = e.changedTouches;
    touches = touches[0];
    let newPos = touches.pageX;
    oldPos = newPos;
  }
}
function rePos(e){
  let target = e.currentTarget;
  let position = window.getComputedStyle(target).getPropertyValue("left");
  position = position.replace("px", "");
  position = Number(position);
  target.style.left = "0";
  target.style.background = "#444";
  if(position < minX || position > maxX){
    gradualDelete(target);
  }
  oldPos = 0;
}
function gradualDelete(target){
  let height = window.getComputedStyle(target).getPropertyValue("height").replace("px", "")
  parent = target.parentElement;
  target.style.display = "none";
  parent.style.height = height;
  parent.style.width = "80vw";
  parent.style.background = "#f66";
  parent.style.justifyContent = "right";
  parent.lastElementChild.textContent = "Undo";
  parent.addEventListener("click", cancGradualDelete)
  target.setAttribute("deleteIt", "true");
  setTimeout(function() {
    SLIDEDELETE(target, parent);
  }, 1500);
}
function cancGradualDelete(e){
  let note = e.currentTarget.children[0];
  note.setAttribute("deleteIt", "false");
  let parent = e.currentTarget;
  let target = parent.children[0];
  SLIDEDELETE(target, parent);
  e.currentTarget.removeEventListener("click", cancGradualDelete);
}
function SLIDEDELETE(target, parent){
  if(JSON.parse(target.getAttributeNode("deleteIt").value)){
    parent.parentElement.removeChild(parent);
    saveToLocal();
  }else{
    target.style.display = "flex";
    target.style.left = "0";
    parent.lastElementChild.textContent = "";
    parent.style.background = "#444";
    parent.style.justifyContent = "center";
  }
}
function deleteAll(){
  canc();
  back();
  let confirmBox = new ConfirmBox("Action is irreversible.");
  confirmBox.create("DELETEALL()");
}
function DELETEALL(){
  let notes = document.getElementById("notes");
  notes.innerHTML = "";
  cancBox();
  saveToLocal();
}
function deleteNote(event){
  let p = event.target.parentElement.firstElementChild;
  if(event.target.parentElement.id == "deleteEdit"){
    p = event.target.parentElement.parentElement.firstElementChild;
  }
  if(JSON.parse(p.getAttributeNode("infos").value).pos || JSON.parse(p.getAttributeNode("infos").value).pos == 0){
    let pos = JSON.parse(p.getAttributeNode("infos").value).pos;
    let confirmBox = new ConfirmBox("Action is irreversible.");
    confirmBox.create("DELETENOTE("+pos+")");
  }else{
    let confirmBox = new ConfirmBox("Note have not been saved.");
    confirmBox.create("cancBox()");
  }
}
function DELETENOTE(pos){
  cancEdit();
  let notes = document.getElementById("notes");
  let child = notes.children[Number(pos)];
  back();
  notes.removeChild(child);
  cancBox();
  reArrangePos();
}
function read(event){
  let navBtn1 = document.getElementById("navBtn1");
  let navBtn2 = document.getElementById("navBtn2");
  let navTxt = document.getElementById("navTxt");
  navTxt.innerHTML = "Reading";
  navTxt.style.justifyContent = "center";
  navBtn1.style.display = "flex";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "none";//cancel icon
  navBtn1[1].style.display = "flex";//back icon
  navBtn2[0].style.display = "flex";//menu icon
  navBtn2[1].style.display = "none";//save icon
  document.getElementById("addBtn").style.display = "none";
  document.getElementById("edit").style.display = "none"
  document.getElementById("notes").style.display = "none";
  let read = document.getElementById("read");
  read.style.display = "block";
  read = read.children[0];
  read.setAttribute("infos", event.target.getAttributeNode("infos").value);
  read.textContent = event.target.textContent;
}
function back(){
  let addBtn = document.getElementById("addBtn");
  addBtn.style.display = "flex";
  let notes = document.getElementById("notes");
  notes.style.display = "flex";
  let read = document.getElementById("read");
  let navBtn1 = document.getElementById("navBtn1");
  let navBtn2 = document.getElementById("navBtn2");
  let navTxt = document.getElementById("navTxt");
  navTxt.innerHTML = "Notes";
  navTxt.style.justifyContent = "left";
  navBtn1.style.display = "none";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "none";//cancel icon
  navBtn1[1].style.display = "flex";//back icon
  navBtn2[0].style.display = "flex";//menu icon
  navBtn2[1].style.display = "none";//save icon
  read.style.display = "none";
}
function editOld(event){
  document.getElementById("read").style.display = "none";
  let textarea = document.getElementById("textarea");
  textarea.value = event.target.previousElementSibling.innerHTML;
  textarea.setAttribute("infos",event.target.previousElementSibling.getAttributeNode("infos").value);
  document.body.style.background = "#fff";
  let addBtn = document.getElementById("addBtn");
  addBtn.style.display = "none";
  let notes = document.getElementById("notes");
  notes.style.display = "none";
  let edit = document.getElementById("edit");
  let navBtn1 = document.getElementById("navBtn1");
  let navBtn2 = document.getElementById("navBtn2");
  let navTxt = document.getElementById("navTxt");
  navTxt.innerHTML = "Editing";
  navTxt.style.justifyContent = "center";
  navBtn1.style.display = "flex";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "flex";//cancel icon
  navBtn1[1].style.display = "none";//back icon
  navBtn2[0].style.display = "none";//menu icon
  navBtn2[1].style.display = "flex";//save icon
  edit.style.display = "flex";
}
function add(){
  document.body.style.background = "#fff";
  let addBtn = document.getElementById("addBtn");
  addBtn.style.display = "none";
  let notes = document.getElementById("notes");
  notes.style.display = "none";
  let edit = document.getElementById("edit");
  let textarea = document.getElementById("textarea");
  textarea.value = "";
  let navBtn1 = document.getElementById("navBtn1");
  let navBtn2 = document.getElementById("navBtn2");
  let navTxt = document.getElementById("navTxt");
  navTxt.innerHTML = "Editing";
  navTxt.style.justifyContent = "center";
  navBtn1.style.display = "flex";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "flex";//cancel icon
  navBtn1[1].style.display = "none";//back icon
  navBtn2[0].style.display = "none";//menu icon
  navBtn2[1].style.display = "flex";//save icon
  edit.style.display = "flex";
  let selected = document.getElementsByClassName("current")[0].children[1].textContent;
  let time = new Date().getTime()
  let values = {category:selected,time:time,length:0, new:true}
  textarea.setAttribute("infos", JSON.stringify(values));
}
function cancEdit(){
  document.body.style.background = "#444";
  let addBtn = document.getElementById("addBtn");
  addBtn.style.display = "flex";
  let notes = document.getElementById("notes");
  notes.style.display = "flex";
  let edit = document.getElementById("edit");
  let navBtn1 = document.getElementById("navBtn1");
  let navBtn2 = document.getElementById("navBtn2");
  let navTxt = document.getElementById("navTxt");
  navTxt.innerHTML = "Notes";
  navTxt.style.justifyContent = "left";
  navBtn1.style.display = "none";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "none";//cancel icon
  navBtn1[1].style.display = "flex";//back icon
  navBtn2[0].style.display = "flex";//menu icon
  navBtn2[1].style.display = "none";//save icon
  edit.style.display = "none";
}
function openCategory(){
  let trans = document.getElementById("trans");
  trans.style.left = "0";
  try {
    let current = document.getElementsByClassName("current")[0];
    current.style.background = "#333";
  } catch (e) {}
  let others = document.getElementsByClassName("others");
  for(let i = 0; i < others.length; i++){
    others[i].style.display = "flex";
  }
  let category = document.getElementById("category");
  category.style.width = "60vw";
  category.style.fontSize = "1.2em";
  category.style.height = "auto";
}
function closeCategory(){
  let trans = document.getElementById("trans");
  trans.style.left = "101vw";
  try{
    let current = document.getElementsByClassName("current")[0];
    current.style.background = "#444";
  }catch(e){
    /*errors here a probably because of alteration due to checkDelete (f) on the category tray*/
  }
  let others = document.getElementsByClassName("others");
  for(let i = 0; i < others.length; i++){
    others[i].style.display = "none";
  }
  let category = document.getElementById("category");
  category.style.width = "40vw";
  category.style.fontSize = "0.9em";
  category.style.height = "3em";
}

function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
  window.scrollTo(0, this.scrollHeight);
}
function autoFocus(){
  let navTxt = document.getElementById("navTxt");
  let textarea = document.getElementById("textarea");
  if(navTxt.textContent == "Editing" && document.activeElement.nodeName != "TEXTAREA"){
    textarea.focus();
  }
}
function changeCategory(event){
  try{
    let current = document.getElementsByClassName("current");
    current[0].classList.remove("current");
  }catch(e){
    /*errors here a probably because of alteration due to checkDelete (f) on the category tray*/
  }
  // make all options others first
  let category = document.getElementsByClassName("category");
  for(let i = 0; i < category.length; i++){
    category[i].classList.add("others");
    category[i].style.background = "#444";
  }
  let target = event.currentTarget;
  if(target.lastElementChild.classList.contains("stakeCategory")){
    target.classList.remove("category");
    let category = document.getElementsByClassName("category");
    if(category.length > 0){
      target = category[0];
      let element = target.children[1];
      let selected = element.textContent;
      let textarea = document.getElementById("textarea");
      let infos = JSON.parse(textarea.getAttributeNode("infos").value);
      target.classList.add("current");
      target.classList.remove("others");
      infos.category = selected;
      textarea.setAttribute("infos", JSON.stringify(infos));
    }
  }else{
    let element = target.children[1];
    let selected = element.textContent;
    let textarea = document.getElementById("textarea");
    let infos = JSON.parse(textarea.getAttributeNode("infos").value);
    target.classList.add("current");
    target.classList.remove("others");
    infos.category = selected;
    textarea.setAttribute("infos", JSON.stringify(infos));
  }
}
function addCategory(){
  let parent = document.getElementById("category");
  let addCategory = document.getElementById("addCategory");
  let newCategory = document.createElement("input");
  newCategory.type = "text";
  newCategory.id = "newCategory";
  newCategory.maxLength = 13;
  newCategory.style.width = "100%";
  newCategory.style.height = "10vw";
  newCategory.addEventListener("keypress", confirmNewCategory)
  parent.replaceChild(newCategory, addCategory);
  newCategory.focus();
}
function cancAddCategory(){
  let parent = document.getElementById("category");
  let add = document.createElement("div");
  add.onclick = function(){
    addCategory();
  };
  add.id = "addCategory";
  add.fontSize = "15vw";
  add.textContent = "+";
  parent.replaceChild(add, parent.lastElementChild);
  parent.appendChild(add);
}
function confirmNewCategory(e){
  let newCategory = document.getElementById("newCategory");
  if(newCategory.innerHTML.length > 13){
    newCategory.innerHTML = newCategory.innerHTML.substr(0, 12);
  }
  if(e.keyCode === 13){
    e.preventDefault();
    let parent = document.getElementById("category");
    let newCategoryDef = document.getElementById("newCategory")
    let newCategoryName = newCategoryDef.value;
    let newCategory = document.createElement("div");
    newCategory.className = "clickables category others";
    newCategory.addEventListener("click", changeCategory);
    newCategory.addEventListener("touchstart", prepareDelete);
    let p = document.createElement("p");
    p.className = "child";
    //change newCategoryName to title case.
    let finalString = "";
    for (let i = 0;i < newCategoryName.length; i++){
      if(i == 0){
        finalString += newCategoryName.charAt(0).toUpperCase();
      }else{
        finalString += newCategoryName.charAt(i).toLowerCase();
      }
    }
    newCategory.innerHTML = `<svg class="child" viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="20" style="stroke: ${generateColor(finalString)}; stroke-width: 7; stroke-linecap: round;"/>
      <line x1="80" y1="20" x2="50" y2="80" style="stroke: ${generateColor(finalString)}; stroke-width: 7; stroke-linecap: round;"/>
      <line x1="50" y1="80" x2="20" y2 ="20" style="stroke: ${generateColor(finalString)}; stroke-width: 7; stroke-linecap: round;"/>
    </svg>`;
    newCategoryName = finalString;
    p.textContent = newCategoryName;
    newCategory.appendChild(p);
    parent.insertBefore(newCategory, newCategoryDef);
    cancAddCategory();
  // force categories update
    closeCategory();
    openCategory();
  }
}
function prepareDelete(e){
  let category = e.currentTarget;
  let startTime = new Date().getTime();
  values = startTime;
  category.setAttribute("delete", JSON.stringify(values));
  category.addEventListener("touchmove", checkDelete)
  category.addEventListener("touchend", checkDelete)
}
function checkDelete(e){
  let category = e.currentTarget;
  let endTime = new Date().getTime();
  let startTime = JSON.parse(category.getAttributeNode("delete").value);
  if(endTime - startTime > 600){
    category.removeEventListener("touchmove", checkDelete);
    category.style.background = "#f66";
    let img = document.createElement("img");
    img.className = "clickables delete stakeCategory";
    img.src = "delete.png";
    category.appendChild(img)
    category.addEventListener("click", DELETECATEGORY);
    category.parentElement.replaceChild(category, category);
    document.getElementById("trans").addEventListener("click", cancDeleteCategory);
    document.getElementById("category").addEventListener("click", cancDeleteCategory);
  }
  category.removeEventListener("touchend", checkDelete);
}
function DELETECATEGORY(e){
  let category = e.currentTarget
  category.parentElement.removeChild(category);
}
function cancDeleteCategory(){
  let stakeCategory = document.getElementsByClassName("stakeCategory");
  if(stakeCategory.length > 0){
    for(let i = 0;i < stakeCategory.length; i++){
      stakeCategory[i].parentElement.removeEventListener("click", DELETECATEGORY);
      stakeCategory[i].parentElement.classList.add("category");
      document.getElementById("trans").removeEventListener("click", cancDeleteCategory);
      document.getElementById("category").removeEventListener("click", cancDeleteCategory);
      stakeCategory[i].parentElement.removeChild(stakeCategory[i]);
    }
  }
}
function arrangeDate(dateString){
  let months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let date = new Date(dateString);
  let timeString = "";
  timeString += months[date.getMonth()];
  timeString += " " + date.getDate();
  timeString += ", " + date.getFullYear();
  /*date.getHours = function(){
     return 11+12;
  }*/
  if(use12Hours){
    if(date.getHours() > 12 && (date.getHours()-12).toString.length < 2 || date.getHours().toString().length < 2){
      timeString += " 0";
    }else{
      timeString += " ";
    }
    timeString += (date.getHours() > 12) ? `${date.getHours() - 12}`: `${date.getHours()}`;
    if(date.getMinutes() < 10){
      timeString += ":0";
    }else{
      timeString += ":";
    }
    timeString += (date.getHours() > 12) ? `${date.getMinutes()} PM`: `${date.getMinutes()} AM`;
  }else{
    timeString += (date.getHours() < 10) ? " 0" + date.getHours() : " " + date.getHours();
    timeString += (date.getMinutes() < 10) ? ":0" + date.getMinutes() : ":" + date.getMinutes();
  }
  return timeString;
}
function save(){
  let months = ["Jan", "Feb", "Mar","Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
  let textarea = document.getElementById("textarea");
  let note = textarea.value;
  let infos = JSON.parse(textarea.getAttributeNode("infos").value);
  infos.length = textarea.value.length;
  let notes = document.getElementById("notes");
  let date = new Date();
  infos.time = date.getTime();
  if(infos.new){
    infos.content = note;
    infos.new = false;
    let pos = notes.childElementCount;
    infos.pos = pos;
    let aNoteParent = document.createElement("div");
    aNoteParent.className = "parent";
    let aNote = document.createElement("div");
    aNote.id = "note"+pos;
    aNote.className = "aNote";
    aNote.addEventListener("touchmove", slideDelete);
    aNote.addEventListener("touchend", rePos);
    let categoryColor = document.createElement("div");
    categoryColor.className = "categoryColor";
    aNote.appendChild(categoryColor);
    let container = document.createElement("div");
    container.className = "container";
    let p = document.createElement("p");
    p.setAttribute("infos", JSON.stringify(infos));
    p.addEventListener("click", read);
    p.innerHTML = note;
    container.appendChild(p);
    let edit = document.createElement("img");
    edit.addEventListener("click", editOld);
    edit.alt = "edit";
    edit.src = "edit.png";
    edit.className = "clickables editPen";
    container.appendChild(edit)
    let deleteNoteImg = document.createElement("img");
    deleteNoteImg.className = "clickables delete";
    deleteNoteImg.src = "delete.png";
    deleteNoteImg.alt = "delete";
    deleteNoteImg.onclick = function(){
      deleteNote(event);
    }
    container.appendChild(deleteNoteImg);
    let time = document.createElement("div");
    time.className = "time";
    time.textContent = arrangeDate(date.getTime());
    let warning = document.createElement("div");
    warning.setAttribute("role", "delete warning");
    aNote.appendChild(container);
    aNote.appendChild(time);
    aNoteParent.appendChild(aNote);
    aNoteParent.appendChild(warning);
    notes.appendChild(aNoteParent);
  }else{
    infos.content = note;
    let pos = infos.pos;
    let aNote = notes.children[pos].children[0];
    aNote.id = "note"+pos;
    let time = aNote.children[2];
    time.textContent = arrangeDate(date.getTime());
    let p = aNote.children[1].children[0];
    p.textContent = textarea.value;
    p.setAttribute("infos", JSON.stringify(infos));
  }
  changeCategoryColor();
  cancEdit();
  saveToLocal();
}

window.onload = function(){
  let textarea = document.getElementById("textarea");
  textarea.addEventListener("input", autoResize);
}
window.beforeunload = function(){
  saveToLocal();
}
function ConfirmBox(message){
  this.message = message;
  this.create = function(callback){
    document.getElementById("trans").style.left = 0;
    let div = document.createElement("div");
    div.innerHTML = `<p>${this.message}</p>
    <div id="confirmBtns">
      <p id="confirmBtn1" onclick="${callback}">ok</p>
      <p id="confirmBtn2" onclick="cancBox()">cancel</p>
    </div>`;
    div.id = "confirmBox";
    div.style.height = "auto";
    document.body.appendChild(div);
    div = document.getElementById("confirmBox");
    let height = window.screen.availHeight;
    let divHeight = window.getComputedStyle(div).getPropertyValue("height");
    div.style.top = `${(height - div.innerHeight) / 2}px`;
    document.getElementById("trans").addEventListener("click", cancBox);
  }
}
function cancBox(e){
  let confirmBox = document.getElementById("confirmBox");
  confirmBox.parentElement.removeChild(confirmBox);
  document.getElementById("trans").style.left = "101vw";
  document.getElementById("trans").removeEventListener("click", cancBox);
}
function reArrangePos(){
  let notes = document.getElementById("notes");
  if(notes.children.length > 0){
    for (let i = 0; i < notes.children.length; i++){
      let aNote = notes.children[i].children[0];
      aNote.id = "note"+i;
      let p = aNote.children[1].children[0];
      let infos = JSON.parse(p.getAttributeNode("infos").value);
      infos.pos = i;
      p.setAttribute("infos", JSON.stringify(infos));
    }
  }
  saveToLocal();
}
function generateColor(string){
  let finalString = "";
  for (let i = 0;i < string.length;i++){
    if(!Number(string.charAt(i))){
      finalString += string.charCodeAt(i);
    }else{
      finalString += string.charAt(i);
    }
  }
  if (finalString.length < 7){
    finalString += "123";
  }
  finalString = Number(finalString).toString(16).substr(0,6);
  return "#"+finalString;
}

function changeCategoryColor(){
  let notes = document.getElementById("notes");
  if(notes.children.length > 0){
    for (let i = 0; i < notes.children.length; i++){
      let aNote = notes.children[i].children[0];
      let p = aNote.children[1].children[0];
      let infos = JSON.parse(p.getAttributeNode("infos").value);
      let category = infos.category;
      let categoryColor = aNote.children[0];
      categoryColor.style.color = generateColor(category);
      categoryColor.style.background = generateColor(category);
    }
  }
}

function sortBySize(){
  let notes = document.getElementById("notes");
  let lengths = {};
  for(let i = 0;i < notes.children.length; i++){
    let aNote = notes.children[i].children[0];
    aNoteId = aNote.id;
    let infos = JSON.parse(aNote.children[1].children[0].getAttributeNode("infos").value)
    let length = infos.length;
    lengths[length] = aNoteId;
  }
  let counter = 0;
  for(length in lengths){
    if(counter <= notes.children.length){
      if(document.getElementById(lengths[length]) != notes.children[counter]){
        notes.insertBefore(document.getElementById(lengths[length]).parentElement, notes.children[counter]);
      }
    }
    counter++;
  }
  let message = document.getElementById("message");
  message.style.animation = "showMessage 2s linear";
  setTimeout(function() {
    message.style.animation = "";
  }, 2000);
  lastSort = "size";
  reArrangePos();
}

function sortByTime(){
  let notes = document.getElementById("notes");
  let times = {};
  for(let i = 0;i < notes.children.length; i++){
    let aNote = notes.children[i].children[0];
    aNoteId = aNote.id;
    let infos = JSON.parse(aNote.children[1].children[0].getAttributeNode("infos").value)
    let time = infos.time;
    times[time] = aNoteId;
  }
  let counter = 0;
  for(time in times){
    if(counter <= notes.children.length){
      if(document.getElementById(times[time]) != notes.children[counter]){
        notes.insertBefore(document.getElementById(times[time]).parentElement, notes.children[counter]);
      }
    }
    counter++;
  }
  let message = document.getElementById("message");
  message.style.animation = "showMessage 2s linear";
  setTimeout(function() {
    message.style.animation = "";
  }, 2000);
  lastSort = "time";
  reArrangePos();
}

function sortByCategory(){
  let notes = document.getElementById("notes");
  let categories = {};
  for(let i = 0;i < notes.children.length; i++){
    let aNote = notes.children[i].children[0];
    aNoteId = aNote.id;
    let infos = JSON.parse(aNote.children[1].children[0].getAttributeNode("infos").value);
    let category = infos.category;
    if(categories[category]){
      categories[category][categories[category].length] = aNoteId;
    }else{
      categories[category] = [];
      categories[category][0] = aNoteId;
    }
  }
  let counter = 0;
  let indices = 0;
  for(category in categories){
    categories[category].sort();
    if(counter <= notes.children.length){
      for (let i = 0;i < categories[category].length;i++){
        if(document.getElementById(categories[category][i]) != notes.children[counter]){
          notes.insertBefore(document.getElementById(categories[category][i]).parentElement, notes.children[counter]);
        }
        counter++;
      }
    }
    lastSort = "category";
  }
  let message = document.getElementById("message");
  message.style.animation = "showMessage 2s linear";
  setTimeout(function() {
    message.style.animation = "";
  }, 2000);
  reArrangePos();
}

function saveToLocal(){
  let categories = document.getElementsByClassName("category");
  let notes = document.getElementById("notes");
  let data = {};
  data.sortOrder = lastSort;
  data.use12Hours = use12Hours;
  data.categories = [];
  data.notes = {};
  if(categories.length > 0){
    for(let i = 0; i < categories.length; i++){
      let category = categories[i];
      let text = category.children[1].textContent;
      data.categories[i] = text;
      if(category.classList.contains("current")){
        data.lastCategory = text;
      }
    }
  }
  if (notes.children.length > 0){
    for(let i = 0; i < notes.children.length; i++){
      let note = notes.children[i].children[0];
      let id = note.id;
      let p = note.children[1].children[0];
      let infos = JSON.parse(p.getAttributeNode("infos").value);
      data.notes[id] = infos;
    }
  }
  localStorage.setItem("noteData", JSON.stringify(data));
}

function load(data){
  let categories = document.getElementById("category");
  categories.innerHTML = "";
  //load categories
  for(categoryContent of data.categories){
    let category = document.createElement("div");
    category.className = "clickables category";
    if (data.lastCategory == categoryContent){
      category.classList.add("current");
    }else{
      category.classList.add("others");
    }
    if(categoryContent !== "Uncategorized"){
      category.addEventListener("touchstart", prepareDelete);
    }
    category.addEventListener("click", changeCategory);
    category.innerHTML = `<svg class="child" viewBox="0 0 100 100">
      <line x1="20" y1="20" x2="80" y2="20" style="stroke: ${generateColor(categoryContent)}; stroke-width: 7; stroke-linecap: round;"/>
      <line x1="80" y1="20" x2="50" y2="80" style="stroke: ${generateColor(categoryContent)}; stroke-width: 7; stroke-linecap: round;"/>
      <line x1="50" y1="80" x2="20" y2 ="20" style="stroke: ${generateColor(categoryContent)}; stroke-width: 7; stroke-linecap: round;"/>
    </svg>`;
    let p = document.createElement("p");
    p.className = "child";
    p.textContent = `${categoryContent}`;
    category.appendChild(p)
    categories.appendChild(category);
  }
  let categoryAdder = document.createElement("div");
  categoryAdder.id = "addCategory";
  categoryAdder.addEventListener("click", addCategory);
  categoryAdder.innerHTML = "+";
  categories.appendChild(categoryAdder);
  //load notes.
  let notes = document.getElementById("notes");
  notes.innerHTML = "";
  for (id in data.notes){
    let infos = data.notes[id];
    let content = infos.content;
    let parent = document.createElement("div");
    parent.className = "parent";
    let aNote = document.createElement("div");
    aNote.id = id;
    aNote.className = "aNote";
    aNote.addEventListener("touchmove", slideDelete);
    aNote.addEventListener("touchend", rePos);
    let categoryColor = document.createElement("div");
    categoryColor.className = "categoryColor";
    categoryColor.innerHTML = "&nbsp;";
    categoryColor.style.background = generateColor(infos.category);
    aNote.appendChild(categoryColor);
    let container = document.createElement("div");
    container.className = "container";
    let p = document.createElement("p");
    p.setAttribute("infos", JSON.stringify(infos));
    p.addEventListener("click", read);
    p.innerHTML = content;
    container.appendChild(p);
    let editPen = document.createElement("img");
    editPen.src = "edit.png";
    editPen.alt = "edit";
    editPen.className = "clickables editPen";
    editPen.addEventListener("click", editOld);
    editPen.style.width = "10vw";
    container.appendChild(editPen);
    let noteDelete = document.createElement("img");
    noteDelete.src = "delete.png";
    noteDelete.alt = "delete";
    noteDelete.className = "clickables delete";
    noteDelete.addEventListener("click", deleteNote);
    container.appendChild(noteDelete);
    aNote.appendChild(container);
    let time = document.createElement("div");
    time.className = "time";
    time.innerHTML = arrangeDate(infos.time);
    aNote.appendChild(time);
    parent.appendChild(aNote);
    let warning = document.createElement("div");
    warning.className = "warning";
    warning.setAttribute("role", "delete warning");
    parent.appendChild(warning);
    notes.appendChild(parent);
  }
}
let use12Hours;
let lastSort;
if(localStorage.getItem("noteData")){
  let data = JSON.parse(localStorage.getItem("noteData"));
  if(data.lastCategory == undefined || data.lastCategory == null){
    data.lastCategory = "Uncategorized";
  }
  use12Hours = data.use12Hours;
  lastSort = data.sortOrder;
  load(data);
}else{
  saveToLocal();
}

changeCategoryColor();
let adate = new Date(1663419333203).getMinutes();
console.log(adate)