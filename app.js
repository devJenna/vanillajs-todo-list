const newInput = document.querySelector(".new-input");
const addButton = document.querySelector(".add-button");
const listItems = document.querySelector(".items");

// add event to change add button from text to icon while typing in the input field
newInput.addEventListener("input", function () {
    addButton.innerHTML = "<i class='icon-plus-1'></i>";
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
        console.log(newItem);

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
            console.log(todoItem);
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
            console.log(todoItem);
            console.log(todoItemInput.value);
            console.log(eachContent.innerHTML);
            todoItemInput.style.display = "none";
            editButton.style.display = "block";
            saveButton.style.display = "none";
            // eachContent.style.textDecoration = "none";
            eachContent.value = todoItemInput.value;
            todoItem = todoItemInput.value;
            console.log(todoItem);
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

        // delete the item
        deleteButton.addEventListener("click", () => {
            listItems.removeChild(newList);
        })

    }
    // empty input field
    newInput.value = "";
    newInput.focus();
};

// add color option
const colorArray = [
    "rgb(231, 140, 137)",
    "rgb(247, 162, 159)",
    "rgb(238, 238, 131)",
    "rgb(247, 247, 148)",
    "rgb(161, 224, 248)",
    "rgb(155, 172, 248)",
    "rgb(167, 152, 250)",
    "rgb(178, 185, 197)"
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
    }
})


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
