const newInput = document.querySelector(".new-input");
const addButton = document.querySelector(".add-button");
const listItems = document.querySelector(".items");
const leftTasks = document.querySelector(".status");
const clearChecked = document.querySelector(".clear-checked");

// add event to change add button from text to icon while typing in the input field
newInput.addEventListener("input", function () {
    // console.log(newInput.value);
    if (newInput.value != "") {
        addButton.innerHTML = "<i class='icon-plus-1'></i>";
    }
    else {
        addButton.innerHTML = "Add";
    }
})

// trigger button click on enter 
// newInput.addEventListener("keyup", function (event) {
//     if (event.keyCode === 13) {
//         event.preventDefault();
//         addItems(event);
//     }
// })
newInput.addEventListener("keyup", enterKey);
function enterKey(event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        addItems(event);
    }
}

addButton.addEventListener("click", addItems);
function addItems() {
    // add todo only when the input field is not empty
    if (newInput.value != "") {
        const newItem = newInput.value;
        // console.log(newItem);

        // change add button back to text
        addButton.innerHTML = "Add";

        // create li item that contains content div(checkbox and text content) and delete button
        const newList = document.createElement("li");
        newList.classList.add("item");
        listItems.appendChild(newList);
        // show the items border once input value is added
        listItems.style.display = "block";

        // create content div to include checkbox and text content
        const newListContent = document.createElement("div");
        newListContent.classList.add("content");
        newList.appendChild(newListContent);

        // add checkbox
        // const labelContainer = document.createElement("span");
        const labelContainer = document.createElement("label");
        labelContainer.classList.add("item-container");
        // add input and span inside of label
        labelContainer.innerHTML = "<input type='checkbox' class='checkbox'></input><span class='checkmark'></span>";
        // newList.appendChild(labelContainer);
        newListContent.appendChild(labelContainer);

        // add text content
        // const eachContent = document.createElement("div");
        const eachContent = document.createElement("span");
        eachContent.classList.add("item-content");
        eachContent.innerHTML = newItem;
        // newList.appendChild(eachContent);
        // newListContent.appendChild(eachContent);
        // add todo content to label element to make checkbox checked when the content is clicked
        labelContainer.appendChild(eachContent);

        // // empty input field
        // newInput.value = "";
        // newInput.focus();

        // create container for edit, delete, save button to align better (space between)
        const newListButton = document.createElement("div");
        newListButton.classList.add("button");
        newList.appendChild(newListButton);

        // create edit button and make the content editable
        const editButton = document.createElement("span");
        editButton.classList.add("edit");
        editButton.innerHTML = "Edit";
        // newList.appendChild(editButton);
        newListButton.appendChild(editButton);
        let todoItem = eachContent.innerHTML;
        const todoItemInput = document.createElement("input");
        // const todoItemInput = document.createElement("textarea");

        editButton.addEventListener("click", editItem);
        function editItem() {
            // console.log(todoItem);
            todoItemInput.classList.add("edit-input");
            labelContainer.appendChild(todoItemInput);
            eachContent.style.display = "none";
            todoItemInput.value = todoItem;
            editButton.style.display = "none";
            saveButton.style.display = "block";
            todoItemInput.style.display = "block";
            todoItemInput.focus();
        }

        // create save button and update the content
        const saveButton = document.createElement("span");
        saveButton.classList.add("save");
        saveButton.innerHTML = "Save";
        // newList.appendChild(saveButton);
        // labelContainer.appendChild(saveButton);
        newListButton.appendChild(saveButton);

        saveButton.addEventListener("click", saveItem);
        function saveItem() {
            eachContent.style.display = "block";
            eachContent.innerHTML = todoItemInput.value;
            // console.log(todoItem);
            // console.log(todoItemInput.value);
            // console.log(eachContent.innerHTML);
            todoItemInput.style.display = "none";
            editButton.style.display = "block";
            saveButton.style.display = "none";
            // eachContent.style.textDecoration = "none";
            eachContent.value = todoItemInput.value;
            todoItem = todoItemInput.value;
            // console.log(todoItem);
        }

        // trigger save button click on enter after edit the input value
        todoItemInput.addEventListener("keyup", enterKeyToSave);
        function enterKeyToSave(event) {
            if (event.keyCode === 13) {
                event.preventDefault();
                saveItem(event);
            }
        }

        // add delete button
        const deleteButton = document.createElement("span");
        deleteButton.classList.add("delete");
        deleteButton.innerHTML = '<i class="icon-cancel-2"></i>';
        // deleteButton.innerHTML = '<i class="icon-trash"></i>';
        // listItems.appendChild(deleteButton); 
        // newList.appendChild(deleteButton);
        newListButton.appendChild(deleteButton);

        // count the number of checked items 
        const checkedCount = document.querySelectorAll("input[type=checkbox]:checked").length;
        // add number of items left in the list
        const todoCount = document.querySelectorAll(".item").length;
        const leftCount = todoCount - checkedCount;

        clearChecked.style.display = "block";
        // clearAll.style.display = "block";
        clearAll.style.display = "none";
        console.log(checkedCount);
        console.log(todoCount);
        // console.log(currentTodoCount);
        console.log(leftCount);
        // console.log(currentLeftCount);
        if (leftCount > 1) {
            leftTasks.textContent = `${leftCount} items left`;
            clearChecked.textContent = `Clear ${checkedCount} completed`;
            // display text when task count is more than 1
            clearAll.textContent = "Clear all";
            clearAll.style.display = "block";
        } else if (leftCount === 1) {
            leftTasks.textContent = `${leftCount} item left`
                ;
            clearChecked.textContent = `Clear ${checkedCount} completed`;
            clearAll.style.display = "none";
            if (todoCount > 1) {
                clearAll.style.display = "block";
            }
        } else if (leftCount === 0) {
            leftTasks.textContent = "";
            // clearChecked.textContent = "";
        }
        // clearChecked.textContent = `Clear ${checkedCount} Completed`;


        // delete the item
        // deleteButton.addEventListener("click", () => {
        deleteButton.addEventListener("click", deleteItem);
        function deleteItem() {
            listItems.removeChild(newList);

            // currentTodoCount is the number of the remaining to do items after deleted
            const currentTodoCount = document.querySelectorAll(".item").length;
            console.log(checkedCount);
            console.log(todoCount);
            console.log(currentTodoCount);
            console.log(leftCount);
            // console.log(currentLeftCount);
            if (currentTodoCount === 0) {
                // remove border when all todo lists have been deleted
                listItems.style.display = "none";

                clearChecked.style.display = "none";
                clearAll.style.display = "none";
            }
            if (currentTodoCount === 1) {
                leftTasks.textContent = `${currentTodoCount} item left`;
                clearAll.style.display = "none";
                // clearAll.textContent = "";
                // clearAll.style.display = "block";
                clearChecked.textContent = `Clear ${checkedCount} completed`;
            }
            if (currentTodoCount > 1) {
                leftTasks.textContent = `${currentTodoCount} items left`;
                clearChecked.textContent = `Clear ${checkedCount} completed`;
                // clearAll.style.display = "block";
            }
            // })
        }

        document.addEventListener("click", function () {
            // count the number of checked boxes
            const checkedCount = document.querySelectorAll("input[type=checkbox]:checked").length;
            const currentTodoCount = document.querySelectorAll(".item").length;

            const currentLeftCount = (currentTodoCount - checkedCount);
            console.log(checkedCount);
            console.log(todoCount);
            console.log(currentTodoCount);
            console.log(leftCount);
            console.log(currentLeftCount);


            if (currentLeftCount > 1) {
                leftTasks.textContent = `${currentLeftCount} items left`;
                listItems.style.display = "block";
                clearChecked.style.display = "block";
                clearAll.style.display = "block";
            } else if (currentLeftCount === 1) {
                leftTasks.textContent = `${currentLeftCount} item left`;
                listItems.style.display = "block";
                clearChecked.style.display = "block";
                // clearAll.style.display = "block";
                clearAll.style.display = "none";
                if (currentTodoCount > 1) {
                    clearAll.style.display = "block";
                }
            } else if (currentLeftCount === 0) {
                leftTasks.textContent = "";
            }

            clearChecked.textContent = `Clear ${checkedCount} completed`;

            const checkedTodo = document.querySelectorAll(".checkbox:checked");

            // clear items that have been checked in the list
            clearChecked.addEventListener("click", deleteCheckedItems);
            function deleteCheckedItems() {
                console.log(checkedCount);
                console.log(todoCount);
                console.log(currentTodoCount);
                console.log(leftCount);
                console.log(currentLeftCount);
                // if (checkedCount === 0) {
                //     return;
                // }

                // else if (checkedCount != 0) {
                // else {
                checkedTodo.forEach(item => item.parentNode.parentNode.parentNode.remove());

                // display none when clearChecked button has been clicked if all to do items are checked or no items are left in the list
                if (currentTodoCount === checkedCount || currentLeftCount === 0 && currentTodoCount === 0) {
                    listItems.style.display = "none";
                    clearChecked.style.display = "none";
                    clearAll.style.display = "none";
                }
                else if (currentTodoCount !== checkedCount) {
                    listItems.style.display = "block";
                    clearChecked.style.display = "block";
                    clearAll.style.display = "block";
                }
            }
            // }
        })

    }
    // empty input field
    newInput.value = "";
    newInput.focus();
};


// delete all items if click clear all
const clearAll = document.querySelector(".clear-all");
clearAll.addEventListener("click", () => {
    listItems.style.display = "none";
    listItems.textContent = "";
    clearAll.textContent = "";
    clearAll.style.display = "none";
    // clearChecked.textContent = "";
    clearChecked.style.display = "none";
});

// add color option
const colorArray = [
    "rgb(231, 140, 137)",
    "rgb(247, 162, 159)",
    "rgb(240, 174, 135)",
    // "rgb(238, 232, 150)",
    "rgb(238, 225, 150)",
    // "rgb(247, 247, 148)",
    "rgb(150, 214, 206)",
    "rgb(155, 172, 248)",
    "rgb(167, 152, 250)",
    "rgb(162, 165, 170)"
];

const colorOption = document.querySelectorAll(".color-option");
// change background color on color option button click
colorOption.forEach((option, i) => {
    // set default color for color option button
    option.style.backgroundColor = colorArray[i];
    // add click event to change background color and input border when the color option is selected
    option.addEventListener("click", colorSelect);
    function colorSelect() {
        document.body.style.backgroundColor = colorArray[i];
        newInput.style.borderColor = colorArray[i];
        // colorOption[i].style.borderColor = "black";
        // colorOption[i].style.borderStyle = "none";

        // change color of the border of the option button to black when clicked
        const colorlist = Array.from(colorOption);
        option.style.border = "2px solid black";
        colorlist.filter(color => color.id != option.id).forEach(otherOption => {
            otherOption.style.borderColor = "gray";
        })
    }
});


// //  for loop - updated to forEach
// for (let i = 0; i < colorOption.length; i++) {
//     colorOption[i].addEventListener("click", function () {
//         document.body.style.backgroundColor = colorArray[i];
//         newInput.style.borderColor = colorArray[i];
//         colorOption[i].style.borderColor = "black";
//         // colorOption[i].style.borderStyle = "block";
//         // colorOption[i].style.backgroundColor = "black";
//         // colorOption[i].style.backgroundColor = colorArray[i];
//     })
// };
