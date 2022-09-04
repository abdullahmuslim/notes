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
}
function deleteNote(event){
  console.log("parent",event.target.parentElement.parentElement.firstElementChild)
  let p = event.target.parentElement.firstElementChild;
  if(event.target.parentElement.id == "deleteEdit"){
    p = event.target.parentElement.parentElement.firstElementChild;
  }
  console.log(p.getAttributeNode("infos"))
  let pos = JSON.parse(p.getAttributeNode("infos").value).pos;
  console.log(pos)
  let confirmBox = new ConfirmBox("Action is irreversible.");
  confirmBox.create("DELETENOTE("+pos+")");
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
  //event.target = this;
  console.log('Reading')
  read.setAttribute("infos", event.target.getAttributeNode("infos").value);
  console.log(read)
  read.textContent = event.target.textContent;
  //console.log(event.target.parentElement.parentElement.getAttributeNode("infos").value)
  //console.log(read.infos)
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
  console.log(event.target.previousElementSibling.getAttributeNode("infos").value)
  textarea.setAttribute("infos",event.target.previousElementSibling.getAttributeNode("infos").value);
  //textarea.infos = JSON.stringify(event.target.getAttributeNode("infos").value);
  //console.log(textarea.infos)
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
  navBtn1.style.display = "flex";
  navBtn1 = navBtn1.children;
  navBtn2 = navBtn2.children;
  navBtn1[0].style.display = "flex";//cancel icon
  navBtn1[1].style.display = "none";//back icon
  navBtn2[0].style.display = "none";//menu icon
  navBtn2[1].style.display = "flex";//save icon
  edit.style.display = "flex";
  let time = new Date().getTime()
  let values = {"category":"Uncategorized","time":time,"length":0,"use12Hours":true, "new":true}
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
  let current = document.getElementsByClassName("current")[0];
  current.style.background = "#333";
  let others = document.getElementsByClassName("others");
  for(let i = 0; i < others.length; i++){
    others[i].style.display = "flex";
  }
  let category = document.getElementById("category");
  category.style.width = "60vw";
  category.style.fontSize = "6vw";
  category.style.height = "auto";
}
function closeCategory(){
  let trans = document.getElementById("trans");
  trans.style.left = "101vw";
  let current = document.getElementsByClassName("current")[0];
  current.style.background = "#444";
  let others = document.getElementsByClassName("others");
  for(let i = 0; i < others.length; i++){
    others[i].style.display = "none";
  }
  let category = document.getElementById("category");
  category.style.width = "40vw";
  category.style.fontSize = "4vw";
  category.style.height = "10vw";
}
function autoResize() {
  this.style.height = 'auto';
  this.style.height = this.scrollHeight + 'px';
  window.scrollTo(0, this.scrollHeight);
  console.log(this.infos)
}
function autoFocus(){
  let navTxt = document.getElementById("navTxt");
  let textarea = document.getElementById("textarea");
  console.log("nodeName",document.activeElement.nodeName);
  if(navTxt.textContent == "Editing" && document.activeElement.nodeName != "TEXTAREA"){
    textarea.focus();
    console.log(document.activeElement.nodeName)
  }
}
function changeCategory(event){
  let current = document.getElementsByClassName("current");
  current[0].classList.remove("current");
  // make all options others first
  let category = document.getElementsByClassName("category");
  for(let i = 0; i < category.length; i++){
    category[i].classList.add("others");
    category[i].style.background = "#444";
  }
  let target = event.target;
  console.log("outer", target)
  if(target.classList.contains("child")){
    console.log(target);
    target = target.parentElement;
  }
  target.classList.add("current");
  target.classList.remove("others");
  let element = target.children[1];
  let selected = element.textContent;
  let textarea = document.getElementById("textarea");
  let infos = JSON.parse(textarea.infos);
  infos.category = selected;
  textarea.infos = JSON.stringify(infos);
}
function addCategory(){
  console.log('yey')
  let parent = document.getElementById("category");
  let addCategory = document.getElementById("addCategory");
  let newCategory = document.createElement("input");
  newCategory.type = "text";
  newCategory.id = "newCategory";
  newCategory.maxlength = 13;
  newCategory.style.width = "100%";
  newCategory.style.height = "10vw";
  newCategory.onchange = function(){
    confirmNewCategory();
  }
  //newCategory.addEventListener("click", );
  parent.replaceChild(newCategory, addCategory);
  newCategory.focus();
  console.log(parent.children[3])
  //addCategory.innerHTML = '"<input type="text" max="13"/>';
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
  console.log(parent.lastElementChild, add)
  parent.replaceChild(add, parent.lastElementChild);
  parent.appendChild(add);
}
function confirmNewCategory(){
  let parent = document.getElementById("category");
  let newCategoryDef = document.getElementById("newCategory")
  let newCategoryName = newCategoryDef.value;
  let newCategory = document.createElement("div");
  newCategory.className = "category others";
  newCategory.onclick = function(){
    changeCategory(event);
  };
  newCategory.innerHTML = `<svg class="child" viewBox="0 0 100 100">
    <line x1="20" y1="20" x2="80" y2="20" style="stroke: #5ff; stroke-width: 7; stroke-linecap: round;"/>
    <line x1="80" y1="20" x2="50" y2="80" style="stroke: #f5f; stroke-width: 7; stroke-linecap: round;"/>
    <line x1="50" y1="80" x2="20" y2="20" style="stroke: #ff5; stroke-width: 7; stroke-linecap: round;"/>
  </svg>`;
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
  newCategoryName = finalString;
  p.textContent = newCategoryName;
  newCategory.appendChild(p);
  parent.insertBefore(newCategory, newCategoryDef);
  cancAddCategory();
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
  let use12Hours = infos.use12Hours;
  if(infos.new){
    infos.new = false;
    let pos = notes.childElementCount;
    infos.pos = pos;
    let aNote = document.createElement("div");
    aNote.className = "aNote";
    let categoryColor = document.createElement("div");
    categoryColor.className = "categoryColor";
    aNote.appendChild(categoryColor);
    let container = document.createElement("div");
    container.className = "container";
    let p = document.createElement("p");
    p.setAttribute("infos", JSON.stringify(infos));
    p.addEventListener("click", read);
    //console.log(p.getAttributeNode("infos").value)
    p.innerHTML = note;
    container.appendChild(p);
    let edit = document.createElement("img");
    //edit.addEventListener("click", function handleClick(event){
      //editOld(event);
   // });
    edit.addEventListener("click", editOld);
    edit.alt = "edit";
    edit.src = "edit.png";
    edit.className = "editPen";
    container.appendChild(edit)
    let deleteNoteImg = document.createElement("img");
    deleteNoteImg.className = "delete";
    deleteNoteImg.src = "delete.png";
    deleteNoteImg.alt = "delete";
    deleteNoteImg.onclick = function(){
      deleteNote(event);
    }
    console.log(deleteNoteImg)
    container.appendChild(deleteNoteImg);
    let time = document.createElement("div");
    let timeString = "";
    timeString += months[date.getMonth()];
    timeString += " " + date.getDate();
    timeString += ", " + date.getFullYear();
    if(use12Hours){
      timeString += (date.getHours() > 12) ? ` ${date.getHours() - 12}:${date.getMinutes()} PM`: ` ${date.getHours()}:${date.getMinutes()} AM`;
    }else{
      timeString += " " + date.getHours() +":"+ date.getMinutes();
    }
    time.className = "time";
    time.textContent = timeString;
    aNote.appendChild(container);
    aNote.appendChild(time);
    notes.appendChild(aNote);
  }else{
    console.log(infos.pos)
    let pos = infos.pos;
    let aNote = notes.children[pos];
    let time = aNote.children[2];
    let timeString = "";
    timeString += months[date.getMonth()];
    timeString += " " + date.getDate();
    timeString += ", " + date.getFullYear();
    if(use12Hours){
      timeString += (date.getHours() > 12) ? ` ${date.getHours() - 12}:${date.getMinutes()} PM`: ` ${date.getHours()}:${date.getMinutes()} AM`;
    }else{
      timeString += " " + date.getHours() +":"+ date.getMinutes();
    }
    time.textContent = timeString;
    let p = aNote.children[1].children[0];
    p.textContent = textarea.value;
    p.setAttribute("infos", JSON.stringify(infos));
  }
  //console.log(note)
  cancEdit();
}

window.onload = function(){
  let textarea = document.getElementById("textarea");
  textarea.addEventListener("input", autoResize);
  /*textarea.addEventListener("focus", positionCategory);
  textarea.addEventListener("unfocus", positionCategory);*/
}

//console.log(value.category)
function ConfirmBox(message){
  this.message = message;
  this.create = function(callback){
    document.getElementById("trans").style.left = 0;
    let div = document.createElement("div");
    div.innerHTML = `<p>${this.message}</p>
    <div id="confirmBtns">
      <p onclick="${callback}">ok</p>
      <p onclick="cancBox()">cancel</p>
    </div>`;
    div.id = "confirmBox";
    div.style.height = "auto";
    document.body.appendChild(div);
    div = document.getElementById("confirmBox");
    let height = document.body.scrollHeight;
    let divHeight = window.getComputedStyle(div).getPropertyValue("height");
    /*let width = document.body.scrollWidth;
    let divWidth = window.getComputedStyle(div).getPropertyValue("width");*/
    // define styles for confirmBox.
    div.style.zIndex = 4;
    div.style.position = "fixed";
    div.style.top = `${(height - div.offsetHeight) / 2}px`;
    /*div.style.left = `${(width - Number(divWidth.replace(/px/g, ""))) / 2}px`;
    div.style.display = "flex";
    div.style.flexDirection = "column";
    div.style.justifyContent = "center";
    div.style.maxWidth = "60vw";
    div.style.color = "#000";
    div.style.fontSize = "5vw";
    div.style.background = "#fff";
    div.style.padding = "5vw";
    div.style.borderRadius = "10%";
    div.children[0].style.alignItems = "none";*/
    let buttons = document.getElementById("confirmBtns");
    buttons.style.marginTop = "3vw";
    buttons.style.display = "flex";
    buttons.style.flexDirection = "row";
    buttons.style.justifyContent = "space-between";
    buttons = buttons.children;
    buttons[0].style.padding = "3vw";
    buttons[0].style.background = "#f22";
    buttons[0].style.borderRadius = "10%";
    buttons[1].style.padding = "3vw";
    buttons[1].style.background = "#5e5";
    buttons[1].style.borderRadius = "10%";
  }
}
function cancBox(){
  let confirmBox = document.getElementById("confirmBox");
  confirmBox.parentElement.removeChild(confirmBox);
  document.getElementById("trans").style.left = "101vw";
}
function reArrangePos(){
  let notes = document.getElementById("notes");
  console.log(notes.children.length)
  if(notes.children.length > 0){
    for (let i = 0; i < notes.children.length; i++){
      let aNote = notes.children[i];
      let p = aNote.children[1].children[0];
      let infos = JSON.parse(p.getAttributeNode("infos").value);
      infos.pos = i;
      p.setAttribute("infos", JSON.stringify(infos));
      console.log("p",p)
    }
  }
}