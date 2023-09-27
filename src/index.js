import * as ec from "./elementCreation.js"
import * as storage from "./storage.js";
import './reset.css';
import './styles.css';
export {projects, sorted_projects};

let projects = storage.loadProjects();
let sorted_projects = Object.keys(projects).sort();

(function initDisplay(){
    ec.createProjectsAndItemContainers();
    ec.newProjectIcon(projects, sorted_projects);
    ec.createProjectButtons(projects, sorted_projects);
    ec.saveButton();
    ec.deleteButton();
})();