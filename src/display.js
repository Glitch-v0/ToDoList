import * as ec from "./elementCreation.js"
import addDemoProjects from "./demoProjects.js";

export function initDisplay(){
    let projects = addDemoProjects();
    ec.createProjectsAndItemContainers();
    //Old Array Iteration
    // projects.forEach(project => {
    //     ec.makeElement("button", document.getElementById("project-container-outer"), "project-name", project.title);
    //     ec.styleElementID(project.title, "innerHTML", project.title)
    // });
    for (const projectTitle in projects) {
        let project = projects[projectTitle];
    
        ec.makeElement("button", document.getElementById("project-container-outer"), "project-name", project.title);
        ec.styleElementID(project.title, "innerHTML", project.title);
      }
    let projects_buttons = document.getElementsByClassName("project-name");
    [...projects_buttons].forEach(button => {
        button.addEventListener("click", () => {
        ec.projectRemoveSelection(projects_buttons)
        ec.deleteChildElements('.item-container-outer')
        ec.projectSelection(button)
        let current_project = projects[button.id]
        //console.log(current_project)
        ec.showItemsOfProject(current_project)
    })
       
        
    });
}