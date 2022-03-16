const newInput = document.querySelector(".new-input");
const addButton = document.querySelector(".add-button");
const listItems = document.querySelector(".items");

addButton.addEventListener("click", addItems);
function addItems() {
    const newItem = newInput.value;
    console.log(newItem);

    // create li item that contains content div(checkbox and text content) and delete button
    const newList = document.createElement("li");
    newList.classList.add("item");
    listItems.appendChild(newList);

    // create content div to include checkbox and text content
    const newListContent = document.createElement("div");
    newListContent.classList.add("content");
    newList.appendChild(newListContent);

    // add checkbox
    // const eachCheckbox = document.createElement("span");
    const eachCheckbox = document.createElement("label");
    eachCheckbox.classList.add("item-checkbox");
    eachCheckbox.innerHTML = "<input type='checkbox' class='checkbox'></input>";
    // newList.appendChild(eachCheckbox);
    newListContent.appendChild(eachCheckbox);

    // add text content
    const eachContent = document.createElement("div");
    eachContent.classList.add("item-content");
    eachContent.innerHTML = newItem;
    // newList.appendChild(eachContent);
    newListContent.appendChild(eachContent);

    // empty input field
    newInput.value = "";
    newInput.focus();

    // add delete button
    const deleteButton = document.createElement("span");
    deleteButton.classList.add("delete");
    deleteButton.innerHTML = '<i class="icon-cancel-2"></i>';
    // deleteButton.innerHTML = '<i class="icon-trash"></i>';
    // listItems.appendChild(deleteButton); 
    newList.appendChild(deleteButton);


    // delete the item
    deleteButton.addEventListener("click", () => {
        listItems.removeChild(newList);
    })

};