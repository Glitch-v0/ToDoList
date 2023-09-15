import * as ec from "./elementCreation.js"
import addDemoProjects from "./demoProjects.js";

export function initDisplay(){
    let projects = addDemoProjects();
    ec.createProjectsAndItemContainers();
    let sorted_projects = Object.keys(projects).sort();
    ec.newProjectIcon(projects, sorted_projects);
    ec.createProjectButtons(projects, sorted_projects);
}