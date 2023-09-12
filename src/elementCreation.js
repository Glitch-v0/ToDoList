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
    //var parent = document.querySelector(".body-container");
    var parent = document.querySelector(parentClassOrID);
    parent.replaceChildren([]);
}

export function projectSelection (project){
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
    [...project.items].forEach(item => {
        const itemPosition = `${project.items.indexOf(item)}`
        let itemContainerID = `item-container:${itemPosition}`;
        let checkboxID = `checkbox:${itemPosition}`;
        let labelTitleID = `label:${itemPosition}`;
        let labelPriorityID = `label:${itemPosition}-priority`;
        let labelPriorityClass = `priority-${item.priority}`;
        let SelectorID = `Priority Selector-${item.itemPosition}`;
        let labeldueDateID = `label:${itemPosition}-dueDate:${item.dueDate}`;;

        makeElement("div", document.querySelector('.item-container-outer'), 'item', itemContainerID);
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
    });
}

export function projectRemoveSelection (projects){
    [...projects].forEach(button => {
        button.classList.remove("selected-project");
        //console.log("Removed project selection")
    });
    
}