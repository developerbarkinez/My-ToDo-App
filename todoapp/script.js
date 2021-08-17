//UI variants
const myForm = document.querySelector('form');
const myInput = document.querySelector('#txtTaskName');
const myBtnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;


//Load items
loadItems();
//call event listeners
eventListeners();
function loadItems() {
    items = getItemsFromLS();
    items.forEach(function (item) {
        createItem(item);
    });
}
//Get Items From Local Storage
function getItemsFromLS(){
   if(localStorage.getItem('items')===null){
       items=[];
   }
   else{
       items=JSON.parse(localStorage.getItem('items'));
   }
   return items;
}
//set item to Local Storage
function setItemToLS(text){
    items=getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));

}
//delete item to Local Storage
function deleteItemFromLS(text){
    items=getItemsFromLS();
    items.forEach(function(item,index){
    if(item===text){
        items.splice(index,1);
    }
    });
    localStorage.setItem('items',JSON.stringify(items));

}
//event listener
function eventListeners() {
    //submit event
    myForm.addEventListener('submit', addNewItem);
    //Button Delete event
    myBtnDeleteAll.addEventListener('click', deleteAllItems);
    //Tasklist Bar Delete event
    taskList.addEventListener('click', deleteItem)
}
//add new item
function addNewItem(e) {
    //input verification
    if (myInput.value !== '') {
        alert(myInput.value + ' adlı yeni göreviniz eklendi.');
    }
    else if (myInput.value === '') {
        alert('Görev eklemediniz!');
        taskList.remove(taskList.lastElementChild);
    }
    //create item
    createItem(myInput.value);
    //save To LS
    setItemToLS(myInput.value);
    e.preventDefault();
}
//deleteItem from parentElement
function deleteItem(e) {
    if (e.target.className === 'fas fa-times') {
        //Confirmation
        if(confirm('Emin misin?')){
        e.target.parentElement.parentElement.remove();
        //delete item from LS
         deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    alert('Seçilen görev silindi.')
}
//delete all items
function deleteAllItems(e) {
    //const itemRemove = document.getElementsByClassName('list-group');
    //for (i = 0; i < itemRemove.length; i++) {
        //itemRemove[i].parentNode.removeChild(itemRemove[i]);
    //}
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    alert('Görevlerin hepsi silindi.');
    //Clear Local Storage
    localStorage.clear();
    e.preventDefault();
}
//create item method
function createItem(text) {

    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';
    //add a to li
    li.appendChild(a);
    //add li to ul
    taskList.appendChild(li);
    //clear input
    //myInput.value = '';
}

