import expandIcon from './icons/expand-icon.png';
import descriptionIcon from './icons/description-icon.png';
import plusIcon from './icons/plus-icon.png';
import saveIcon from './icons/save-icon.png';
import deleteIcon from './icons/delete-icon.png';


import { itemFactory, projectFactory } from './addItems';

export function makeElement(element, parentElement, optionalClass, optionalID, attributes = {}) {
    const newElement = document.createElement(element);
    if (typeof optionalClass !== "undefined") {
      newElement.className = optionalClass;
    }
    if (typeof optionalID !== "undefined") {
      newElement.id = optionalID;
    }

    // Set additional attributes
    for (const attr in attributes) {
        newElement.setAttribute(attr, attributes[attr]);
    }

    parentElement.appendChild(newElement);
}


export function makeImage(imageURL, parentElement, optionalClass, optionalID) {
    const newImage = new Image();
    newImage.src = imageURL;
    if (typeof optionalClass !== "undefined") {
        newImage.className = optionalClass;
    }
    if (typeof optionalID !== "undefined") {
        newImage.id = optionalID;
    }
    parentElement.appendChild(newImage);
}

export function styleElementID (elementID, styleAttribute, styleValue){
    const elementToStyle = document.getElementById(elementID)
    if(styleAttribute == "innerHTML"){
        elementToStyle.innerHTML = styleValue;
    } else {
        elementToStyle.style[styleAttribute] = styleValue;
    }
    // console.log(`Styling ${elementToStyle} with ${styleAttribute} set to ${styleValue}`)
    // console.log(elementToStyle.style[styleAttribute] = styleValue)
}

export function styleElementClass (elementClass, styleAttribute, styleValue){
    const elementToStyle = document.getElementByClassName(elementClass)
    elementToStyle.style[styleAttribute] = styleValue;
    //console.log(`Styling ${elementToStyle} with ${styleAttribute} set to ${elementToStyle.style[styleAttribute]}`)
}

export function createProjectsAndItemContainers (){
    // Grid Container to host nav bar and body
    makeElement("div", document.body, "project-container-outer", "project-container-outer");
    makeElement("div", document.body, "item-container-outer", "item-container-outer");
}

export function deleteChildElements (parentClassOrID){
    var parent = document.querySelector(parentClassOrID);
    parent.replaceChildren([]);
    //console.log(`Deleted children of ${parent}`)
}

export function selectProject (project){
    project.classList.add("selected-project");
    //console.log(`Clicked ${project}`);
}

export function createDropdown (optionsArray, parentElementID, item){
    var select = document.getElementById(parentElementID)
    
    // Loop through the options and create option elements
    for (var i = 0; i < optionsArray.length; i++) {
        var option = document.createElement("option");
        option.value = optionsArray[i];
        option.text = optionsArray[i];
        option.className = `priority-${optionsArray[i]}`
    
        // If the option value matches the item.priority, set it as selected
        if (option.value == item.priority) {
            option.selected = true;
            select.className = `priority-${optionsArray[i]}`
        }
        select.appendChild(option);
    }
}

export function showItemsOfProject (project){
    newItemIcon(project);
    displayProjectItems(project);
    //console.log({project});
}

export function projectRemoveSelection (projects){
    [...projects].forEach(button => {
        button.classList.remove("selected-project");
        //console.log("Removed project selection")
    });
    
}

export function newItemIcon (project){
    makeImage(plusIcon, document.getElementById("item-container-outer"), "plus", 'item-plus');
    document.getElementById('item-plus').addEventListener("click", function () {
        project.items.unshift(itemFactory("New Item"));
        refreshItemDisplay(project)
    })
}

export function newProjectIcon (projects, sorted_projects){
    makeImage(plusIcon, document.getElementById("project-container-outer"), "plus", 'project-plus');
    document.getElementById('project-plus').addEventListener("click", function () {
        let key = prompt("Enter a name for your new project"); // Ask the user to enter a name
        if (key in projects) { // Check if the name already exists in the dictionary
            alert("This name is already taken. Please choose another one."); // Alert the user
            return; // Exit the function
        }
        projects[key] = projectFactory(key); // Add the key and value to the dictionary
        sorted_projects.splice(0, 0, key); // Add the key to the sorted array
        refreshProjectDisplay(projects, sorted_projects); // Refresh the display
        console.log(projects);
    })
}


export function createProjectButtons (projects, projectsArray){
    console.log(projectsArray)
    for (var i in projectsArray) {
        //Set button text to project title
        const current_project_title = projectsArray[i]
        makeElement("button", document.getElementById("project-container-outer"), "project-name", current_project_title);
        styleElementID(current_project_title, "innerHTML", current_project_title);
        const current_button = document.getElementById(current_project_title)

        //Add delete icon for each project
        makeImage(deleteIcon, current_button, "project-delete-icon", `${current_project_title}-delete-icon`);
        const project_delete_icon = document.getElementById(`${current_project_title}-delete-icon`)
        

        console.log('made a button!')
      }

      let projects_buttons = document.getElementsByClassName("project-name");
      //Listens to display items for each project
      [...projects_buttons].forEach(button => {
          button.addEventListener("click", () => {
              projectRemoveSelection(projects_buttons);
              deleteChildElements('.item-container-outer');
              selectProject(button);
              let current_project = projects[button.id];
              showItemsOfProject(current_project);
            })
      })
}


export function displayProjectItems (project) {
    [...project.items].forEach(item => {
        const itemPosition = `${project.items.indexOf(item)}`
        let itemContainerID = `item-container:${itemPosition}`;
        let checkboxID = `checkbox:${itemPosition}`;
        let labelTitleID = `label:${itemPosition}`;
        let labelPriorityID = `label:${itemPosition}-priority`;
        let labelPriorityClass = `priority-${item.priority}`;
        let SelectorID = `Priority Selector-${item.itemPosition}`;
        let labeldueDateID = `label:${itemPosition}-dueDate:${item.dueDate}`;

        makeElement("div", document.querySelector('.item-container-outer'), 'item', itemContainerID, { draggable: "false"});
        makeElement("input", document.getElementById(itemContainerID), 'checkbox', checkboxID, { type: "checkbox" });
        
        // Item Title
        makeElement("label", document.getElementById(itemContainerID), 'label-title', labelTitleID, { type: "label" });
        styleElementID(labelTitleID, "innerHTML", `${item.title}`);
        document.getElementById(labelTitleID).contentEditable = true;
        document.getElementById(labelTitleID).addEventListener("input", function() {
            item.title = this.textContent;
        });

        /* Item Priority */
        makeElement("select", document.getElementById(itemContainerID), 'priority-selector', labelPriorityID);
        createDropdown(["Low", "Medium", "High"], labelPriorityID, item);
        // Updates item.priority and the class name based on selection
        document.getElementById(labelPriorityID).addEventListener("change", function() {
            item.priority = this.value;
            this.className = `priority-${item.priority}`;
        });

        // Due Date
        makeElement("input", document.getElementById(itemContainerID), 'label-dueDate', labeldueDateID, { type: "date", value: item.dueDate});
        styleElementID(labeldueDateID, "innerHTML", `${item.dueDate}`);
        var dateInput = document.getElementById(labeldueDateID);
        dateInput.addEventListener("change", function() {
            item.dueDate = dateInput.value;
        })

        function clickableItemIcon(icon, text, clickFunction){
            let buttonID = `${text}-button-${itemPosition}`;
            let imageID = `${text}-${itemPosition}`;
            makeElement("input", document.getElementById(itemContainerID), `${text}-button`, buttonID);
            //makeImage(icon, document.getElementById(buttonID), `${text}`, imageID);
            let buttonIcon = document.getElementById(buttonID)
            buttonIcon.className = "item-icon";
            buttonIcon.type = "image";
            buttonIcon.src = icon;
            buttonIcon.addEventListener("click", clickFunction);
        }

        function test(){
            console.log("It worked!")
        }
        clickableItemIcon(expandIcon, "expand", test);
        clickableItemIcon(descriptionIcon, "description", function () {
            return makeItemDescriptionDialog(item, project)});
        clickableItemIcon(deleteIcon, "delete", function () {
            return deleteItemFromProject(item, project)});
                    
    })
}

export function refreshItemDisplay (project){
    deleteChildElements('#item-container-outer');
    newItemIcon(project);
    displayProjectItems(project);
}

export function sortProjects (projects){
    let sorted_projects = Object.keys(projects).sort();
    return sorted_projects
}
export function refreshProjectDisplay (projects, sorted_projects){
    //console.log("Running refreshProjectDisplay...")
    deleteChildElements('#project-container-outer');
    newProjectIcon(projects, sorted_projects);
    createProjectButtons(projects, sorted_projects);
}

export function makeItemDescriptionDialog (item, project) {
    let dialog = document.createElement("dialog");

    let header = document.createElement("header");
    dialog.appendChild(header);

    let closeButton = document.createElement("button");
    closeButton.textContent = "X";
    let title = document.createElement("h3");
    title.textContent = "Title: ";

    header.appendChild(closeButton);
    header.appendChild(title);

    let titleSpan = document.createElement("textArea");
    titleSpan.setAttribute("rows", "1");
    titleSpan.setAttribute("cols", "40");
    titleSpan.textContent = item.title;
    title.appendChild(titleSpan);

    let section = document.createElement("section");
    dialog.appendChild(section);

    let descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description:";

    let description = document.createElement("textArea");
    description.setAttribute("rows", "3");
    description.setAttribute("cols", "40");
    description.textContent = item.description;

    section.appendChild(descriptionLabel);
    section.appendChild(description);

    // Footer and Children
    let footer = document.createElement("footer");
    dialog.appendChild(footer);

    let notesLabel = document.createElement("label");
    notesLabel.setAttribute("for", "notes");
    notesLabel.textContent = "Notes:";

    let notes = document.createElement("textArea");
    notes.setAttribute("rows", "3");
    notes.setAttribute("cols", "40");
    notes.textContent = item.notes;

    let submitButton = document.createElement("button");
    submitButton.textContent = "Submit";
    let resetButton = document.createElement("button");
    resetButton.textContent = "Reset";

    footer.appendChild(notesLabel);
    footer.appendChild(notes);
    footer.appendChild(submitButton);
    footer.appendChild(resetButton);

    function closeDialog() {
        dialog.close();
    }

    function submitDialog() {
        // Get the values of the title, description, and notes elements
        let titleValue = titleSpan.value;
        let descriptionValue = description.value;
        let notesValue = notes.value;
        // Do something with the values, such as updating or saving them
        item.title = titleValue;
        item.description = descriptionValue;
        item.notes = notesValue;

        // Close the dialog using the close() method
        dialog.close();
        dialog.remove();
        refreshItemDisplay(project);
    }

    // Define a function to reset the dialog
    function resetDialog() {
        // Reset the values of the title, description, and notes elements to empty strings
        titleSpan.textContent = "New Item";
        description.textContent = "I like this a lot";
        notes.textContent = "Remember to do it this important way";
    }

    // Add event listeners to the buttons
    closeButton.addEventListener("click", closeDialog);
    submitButton.addEventListener("click", submitDialog);
    resetButton.addEventListener("click", resetDialog);


    // Append the dialog element to the body of the document
    document.body.appendChild(dialog);
    dialog.showModal()
}

export function saveButton(){
    makeImage(saveIcon, document.body, "icon", "save-icon");
}

export function deleteButton(){
    makeImage(deleteIcon, document.body, "icon", "delete-icon");
}

function deleteItemFromProject(item, project){
    //Changes the project items to a new array without the removed item
    project.items = project.items.filter(eachItem => eachItem !== item)
    deleteChildElements("#item-container-outer");
    showItemsOfProject(project);
}