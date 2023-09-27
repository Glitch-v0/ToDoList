import addDemoProjects from "./demoProjects.js";
import { projects } from "./index.js";

export function loadProjects(){
    let projects;
    if (isLocalStorageAvailable()) {
        if (localStorage.getItem('projects') !== null) {
            console.log('Projects are stored!');
            let projectsToConvert = localStorage.getItem('projects');
            projects = JSON.parse(projectsToConvert)
        } else {
            console.log('No projects are stored!');
            projects = addDemoProjects();
        }
    } else {
        console.log("Local storage is not available!");
    }
    return projects
};


export function saveProjects(){
  let projectsConverted = JSON.stringify(projects);
  localStorage.setItem('projects', projectsConverted);
};

export function deleteProjects(){
  localStorage.clear()
};

export function isLocalStorageAvailable () {
  var test = 'test';
  console.log('Checking if storage is available...')
  try {
    localStorage.setItem (test, test);
    localStorage.removeItem (test);
    return true;
  } catch (e) {
    return false;
  }
}
