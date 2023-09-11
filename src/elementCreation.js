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
    console.log(`Clicked ${project}`);
}

export function showItemsOfProject (project){
    [...project.items].forEach(item => {
        let itemContainerID = `item-container:${item.title}`;
        let checkboxID = `checkbox:${item.title}`;
        let labelTitleID = `label:${item.title}`;
        let labelPriorityID = `label:${item.title}-priority:${item.priority}`;
        let labelPriorityClass = `priority-${item.priority}`;
        let labeldueDateID = `label:${item.title}-dueDate:${item.dueDate}`;
        makeElement("div", document.querySelector('.item-container-outer'), 'item', itemContainerID);
        makeElement("input", document.getElementById(itemContainerID), 'checkbox', checkboxID, { type: "checkbox" });
        // Item Title
        makeElement("label", document.getElementById(itemContainerID), 'label-title', labelTitleID, { type: "label" });
        styleElementID(labelTitleID, "innerHTML", `${item.title}`)
        // Item Priority
        makeElement("label", document.getElementById(itemContainerID), labelPriorityClass, labelPriorityID, { type: "label" });
        styleElementID(labelPriorityID, "innerHTML", `${item.priority}`);
        // Due Date
        makeElement("label", document.getElementById(itemContainerID), 'label-dueDate', labeldueDateID, { type: "label" });
        styleElementID(labeldueDateID, "innerHTML", `${item.dueDate}`);
    });
}

export function projectRemoveSelection (projects){
    [...projects].forEach(button => {
        button.classList.remove("selected-project");
        console.log("Removed project selection")
    });
    
}