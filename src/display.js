import * as ec from "./elementCreation.js"
import addDemoProjects from "./demoProjects.js";

export function initDisplay(){
    let projects = addDemoProjects();
    ec.createProjectsAndItemContainers();
    ec.newProjectIcon(projects);
    ec.createProjectButtons(projects);
}