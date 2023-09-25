import * as ec from "./elementCreation.js"
import * as storage from "./storage.js";

export function initDisplay(){
    let projects = storage.load();
    ec.createProjectsAndItemContainers();
    let sorted_projects = Object.keys(projects).sort();
    ec.newProjectIcon(projects, sorted_projects);
    ec.createProjectButtons(projects, sorted_projects);
}