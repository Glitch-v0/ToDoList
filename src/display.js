import * as ec from "./elementCreation.js"
import addDemoProjects from "./demoProjects.js";

export function initDisplay(){
    let projects = addDemoProjects();
    ec.createProjectsAndItems();
    projects.forEach(project => {
        ec.makeElement("button", document.getElementById("project-container-outer"), "project-name", project.title);
        ec.styleElementID(project.title, "innerHTML", project.title)
    });
    projects_buttons = document.getElementsByClassName("project-name");
    }