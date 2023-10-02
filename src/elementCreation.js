import expandIcon from './icons/expand-icon.png';
import descriptionIcon from './icons/description-icon.png';
import plusIcon from './icons/plus-icon.png';
import saveIcon from './icons/save-icon.png';
import deleteIcon from './icons/delete-icon.png';
import { saveProjects, deleteProjects } from './storage';
import { itemFactory, projectFactory } from './addItems';
import { projects, sorted_projects } from './index';

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
    // console.log(`Styling ${elementToStyle} with ${styleAttribute} set to ${stylecheckedValue}`)
    // console.log(elementToStyle.style[styleAttribute] = stylecheckedValue)
}

export function styleElementClass (elementClass, styleAttribute, styleValue){
    const elementToStyle = document.getElementByClassName(elementClass)
    elementToStyle.style[styleAttribute] = styleValue;
    //console.log(`Styling ${elementToStyle} with ${styleAttribute} set to ${elementToStyle.style[styleAttribute]}`)
}

export function createProjectsAndItemContainers (){
    // Grid Container to host nav bar and body
    makeElement("div", document.body, "projects-container", "projects-container");
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
        option.checkedValue = optionsArray[i];
        option.text = optionsArray[i];
        option.className = `priority-${optionsArray[i]}`
    
        // If the option checkedValue matches the item.priority, set it as selected
        if (option.checkedValue == item.priority) {
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

export function projectRemoveSelection (buttons){
    [...buttons].forEach(button => {
        button.classList.remove("selected-project");
        //console.log("Removed project selection")
    });
    
}

export function newItemIcon (project){
    makeImage(plusIcon, document.getElementById("item-container-outer"), "plus", 'item-plus');
    makeElement("p", document.getElementById("item-container-outer"), "plus-hover-text", 'item-plus-hover-text');
    const hoverText = document.getElementById('item-plus-hover-text');
    hoverText.innerHTML = `Add a <b>new item</b> to your project`;
    hoverText.hidden = true;
    document.getElementById('item-plus').addEventListener("mouseover", function (){
        hoverText.toggleAttribute("hidden");
        //console.log("Hover text hidden? " + hoverText.hidden)
    })
    document.getElementById('item-plus').addEventListener("mouseleave", function (){
        hoverText.toggleAttribute("hidden");
        //console.log("Hover text hidden? " + hoverText.hidden)
    })
    document.getElementById('item-plus').addEventListener("click", function () {
        project.items.unshift(itemFactory("New Item"));
        refreshItemDisplay(project)
    })
}

export function newProjectIcon (){
    makeImage(plusIcon, document.getElementById("projects-container"), "plus", 'project-plus');
    const newProjectPlusIcon = document.getElementById('project-plus');
    makeElement("p", document.getElementById("projects-container"), "plus-hover-text", 'project-plus-hover-text');
    const hoverText = document.getElementById('project-plus-hover-text');
    hoverText.innerHTML = `Add a <b>new project</b> to your to-do list`;
    hoverText.hidden = true;
    document.getElementById('project-plus').addEventListener("mouseover", function (){
        hoverText.toggleAttribute("hidden");
        console.log("Hover text hidden? " + hoverText.hidden)
    })
    document.getElementById('project-plus').addEventListener("mouseleave", function (){
        hoverText.toggleAttribute("hidden");
        console.log("Hover text hidden? " + hoverText.hidden)
    })
    document.getElementById('project-plus').addEventListener("click", function () {
        let checklistKey = prompt("Enter a name for your new project"); // Ask the user to enter a name
        if (checklistKey in projects) { // Check if the name already exists in the dictionary
            alert("This name is already taken. Please choose another one."); // Alert the user
            return; // Exit the function
        }
        projects[checklistKey] = projectFactory(checklistKey); // Add the checklistKey and checkedValue to the dictionary
        sorted_projects.splice(0, 0, checklistKey); // Add the checklistKey to the sorted array
        refreshProjectDisplay(); // Refresh the display
    })
}


export function createProjectButtons (){
    for (var i in sorted_projects) {
        const current_project_title = sorted_projects[i]

        //Create Project Box
        const projectBoxID = `${current_project_title}-box`
        makeElement("div", document.getElementById("projects-container"), "project-box", projectBoxID)

        //Create button for each project
        makeElement("button", document.getElementById(projectBoxID), "project-name", current_project_title);
        styleElementID(current_project_title, "innerHTML", current_project_title);
        let current_button = document.getElementById(current_project_title);
        function projectButtonFunctionality () {
            let projects_buttons = document.getElementsByClassName("project-name");
            projectRemoveSelection(projects_buttons);
            deleteChildElements('.item-container-outer');
            selectProject(current_button);
            let current_project = projects[current_project_title];
            showItemsOfProject(current_project);
        }
        current_button.addEventListener('click', projectButtonFunctionality);

        //Add description icon for each project
        makeImage(descriptionIcon, document.getElementById(projectBoxID), "project-description-icon", `${current_project_title}-description-icon`);
        const project_description_icon = document.getElementById(`${current_project_title}-description-icon`)
        project_description_icon.addEventListener("click", function () {
            return makeProjectDescriptionDialog(projects[current_project_title])
        });

        //Add delete icon for each project
        makeImage(deleteIcon, document.getElementById(projectBoxID), "project-delete-icon", `${current_project_title}-delete-icon`);
        const project_delete_icon = document.getElementById(`${current_project_title}-delete-icon`)
        project_delete_icon.addEventListener("click", () => {
            deleteChildElements('#item-container-outer');
            const parent = document.getElementById("projects-container")
            parent.removeChild(document.getElementById(projectBoxID));
            let currentIndex = sorted_projects.indexOf(current_project_title)
            sorted_projects.splice(currentIndex, 1)
            //console.log({sorted_projects})
            console.log(projects);
            delete projects[current_project_title];
            console.log(projects);
        })
      }
}


export function displayProjectItems (project) {
    [...project.items].forEach(item => {
        const itemPosition = `${project.items.indexOf(item)}`
        let itemContainerID = `item-container:${itemPosition}`;
        let checkboxID = `checkbox:${itemPosition}`;
        let labelTitleID = `label:${itemPosition}`;
        let labelPriorityID = `label:${itemPosition}-priority`;
        let labeldueDateID = `label:${itemPosition}-dueDate:${item.dueDate}`;
        console.log({item})

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
        console.log(item.dueDate)
        var dateInput = document.getElementById(labeldueDateID);
        dateInput.addEventListener("change", function() {
            item.dueDate = dateInput.value;
            console.log(item.dueDate)
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

        function expandList(){
            // Get the element by id
            var newDiv = document.getElementById(`${itemContainerID}-expanded`);

            if (newDiv === null) {
                // Create a new div element
                newDiv = document.createElement("div");
                newDiv.className = "itemExpanded";
                newDiv.id = `${itemContainerID}-expanded`;
                var itemElement = document.getElementById(`item-container:${itemPosition}`);

                // The ol' reddit switcheroo
                itemElement.replaceWith(newDiv);
                newDiv.appendChild(itemElement);

                // Add a ul to the div for the checklist items
                makeElement("ul", document.getElementById(`${itemContainerID}-expanded`), "itemUL", `${itemContainerID}-UL`);
                console.log(item.checklist);

                // Add a plus icon for new checklist items
                makeImage(plusIcon, document.getElementById(`${itemContainerID}-UL`), "checklist-icon", (itemContainerID + "-plus-icon"));
                const newChecklistItem = document.getElementById((itemContainerID + "-plus-icon"));
                makeElement("p", document.getElementById(`${itemContainerID}-UL`), "plus-hover-text", 'checklist-item-plus-hover-text');
                const hoverText = document.getElementById('checklist-item-plus-hover-text');
                hoverText.innerHTML = `Add a <b>new step</b> to your item`;
                hoverText.hidden = true;
                document.getElementById((itemContainerID + "-plus-icon")).addEventListener("mouseover", function (){
                    hoverText.toggleAttribute("hidden");
                    console.log("Hover text hidden? " + hoverText.hidden)
                })
                document.getElementById((itemContainerID + "-plus-icon")).addEventListener("mouseleave", function (){
                    hoverText.toggleAttribute("hidden");
                    console.log("Hover text hidden? " + hoverText.hidden)
                })
                newChecklistItem.addEventListener("click", function (){
                    item.checklist["New step"] = false;
                    expandList();
                    expandList();
                })

                // Add every checklist item to the ul
                for (const checklistKey in item.checklist) {
                    console.log({checklistKey})
                    var checkedValue = item.checklist[checklistKey]
                    console.log({checkedValue})
                    // The container for each checklist item
                    makeElement("div", document.getElementById(`${itemContainerID}-UL`), "checklist-item-container", `${itemContainerID}-${checklistKey}`);
                    const currentContainer = document.getElementById(`${itemContainerID}-${checklistKey}`)
                    // A checkbox
                    makeElement("input", currentContainer, "checklist-item-checkbox", `${itemContainerID}-${checklistKey}-checkbox`, { type: "checkbox" });
                    const currentCheckbox = document.getElementById(`${itemContainerID}-${checklistKey}-checkbox`);
                    currentCheckbox.addEventListener("change", function () {
                        // Sets the checked property to true or false
                        item.checklist[checklistKey] = currentCheckbox.checked ? true : false;
                    })
                    if (checkedValue==true){
                        currentCheckbox.checked = true;
                    }
                    // The checklist item's text
                    makeElement("li", currentContainer, "checklist-item", `checklist-item-${checklistKey}-${itemContainerID}`);
                    const checklistItem = document.getElementById(`checklist-item-${checklistKey}-${itemContainerID}`);
                    checklistItem.textContent = checklistKey;
                    checklistItem.contentEditable = true;
                    checklistItem.addEventListener("blur", function (){
                        let newKey = checklistItem.textContent;
                        item.checklist[newKey] = currentCheckbox.checked;
                        delete item.checklist[checklistKey];
                        console.log('Changed!')
                    })
                    // A delete icon
                    makeImage(deleteIcon, currentContainer, "checklist-icon", (checklistKey + "-delete-icon"));
                    const deleteChecklistItem = document.getElementById((checklistKey + "-delete-icon"));
                    deleteChecklistItem.addEventListener("click", function(){
                        delete item.checklist[checklistKey];
                        console.log(`Deleted ${checklistKey}.`)
                        console.log({item})
                        expandList();
                        expandList();
                    })
                }
            } else {
                var itemElement = newDiv.firstChild;

                // Remove the ul element that is a sibling of the itemElement
                var ul = itemElement.nextSibling;
                newDiv.removeChild(ul);
              
                // Replace the newDiv with the itemElement
                newDiv.replaceWith(itemElement);
            }

        }
        clickableItemIcon(expandIcon, "expand", expandList);
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

export function refreshProjectDisplay (){
    //console.log("Running refreshProjectDisplay...")
    deleteChildElements('#projects-container');
    newProjectIcon();
    createProjectButtons();
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
        // Get the checkedValues of the title, description, and notes elements
        let titleValue = titleSpan.value;
        let descriptionValue = description.value;
        let notesValue = notes.value;
        // Do something with the checkedValues, such as updating or saving them
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
        // Reset the checkedValues of the title, description, and notes elements to empty strings
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

export function makeProjectDescriptionDialog (project) {
    console.log(`Current project: ${project.title}`)
    console.log(`Sorted projects: ${sorted_projects}`)
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
    titleSpan.textContent = project.title;
    title.appendChild(titleSpan);

    let section = document.createElement("section");
    dialog.appendChild(section);

    let descriptionLabel = document.createElement("label");
    descriptionLabel.setAttribute("for", "description");
    descriptionLabel.textContent = "Description:";

    let description = document.createElement("textArea");
    description.setAttribute("rows", "3");
    description.setAttribute("cols", "40");
    description.textContent = project.description;

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
    notes.textContent = project.notes;

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
        // Get the checkedValues of the title, description, and notes elements
        let titleValue = titleSpan.value;
        let descriptionValue = description.value;
        let notesValue = notes.value;

        const buttonToChange = document.getElementById(project.title);
        //console.log({buttonToChange})
        buttonToChange.textContent = titleValue;
        buttonToChange.id = titleValue;

        //Make a copy of project before changes
        let saved_project = project;
        let saved_index = sorted_projects.indexOf(project.title);
        console.log(`Saved index = ${saved_index}`)
        console.log(`Correct index? = ${sorted_projects[saved_index]}`)
        //Change current project checkedValues
        project.title = titleValue;
        project.description = descriptionValue;
        project.notes = notesValue;

        delete projects[saved_project.title];
        projects[project.title] = project;
        console.log(`Correct new project below?`)
        console.log(projects[project.title])
        sorted_projects[saved_index] = project.title;
        console.log(`Is this the correct list of projects? ${projects}`);
        console.log({sorted_projects});


        // Close the dialog using the close() method
        dialog.close();
        dialog.remove();
    }

    // Define a function to reset the dialog
    function resetDialog() {
        // Reset the values of the title, description, and notes elements to empty strings
        titleSpan.textContent = "New Project";
        description.textContent = "This will be a great list of things to do";
        notes.textContent = "They're expecting a GIRL baby";
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
    const save_projects = document.getElementById("save-icon");
    save_projects.addEventListener("click", function() {
        console.log("Saved project data")
        saveProjects();
    })
}

export function deleteButton(){
    makeImage(deleteIcon, document.body, "icon", "delete-icon");
    const delete_storage = document.getElementById("delete-icon");
    delete_storage.addEventListener("click", function() {
        console.log("Deleted project data")
        deleteProjects();
    })
}

function deleteItemFromProject(item, project){
    //Changes the project items to a new array without the removed item
    project.items = project.items.filter(eachItem => eachItem !== item)
    deleteChildElements("#item-container-outer");
    showItemsOfProject(project);
}

export function initDisplay(){
    createProjectsAndItemContainers();
    newProjectIcon();
    createProjectButtons();
    saveButton();
    deleteButton();
};