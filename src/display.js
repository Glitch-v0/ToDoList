import * as ec from "./elementCreation.js"
import addDemoProjects from "./demoProjects.js";

export function initDisplay(){
    let projects = addDemoProjects();
    ec.createProjectsAndItems();
    projects.forEach(project => {
        ec.makeElement("button", document.getElementById("project-container-outer"), "project-name", project.title);
        ec.styleElementID(project.title, "innerHTML", project.title)
    });
    let projects_buttons = document.getElementsByClassName("project-name");
    [...projects_buttons].forEach(button => {
        button.addEventListener("click", () => {
        ec.projectRemoveSelection(projects_buttons)
        ec.projectSelection(button)})
    });
}