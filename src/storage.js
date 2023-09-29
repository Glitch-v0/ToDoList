import addDemoProjects from "./demoProjects.js";
import { projects } from "./index.js";

export function loadProjects(){
    let projects;
    if (isLocalStorageAvailable()) {
        if (localStorage.getItem('projects') !== null) {
            let projectsToConvert = localStorage.getItem('projects');
            projects = JSON.parse(projectsToConvert)
        } else {
            projects = addDemoProjects();
        }
    } else {
        console.log("Local storage is not available!");
    }
    return projects
};


export function saveProjects(){
  if(confirm("Do you wish to save your projects to your local storage? This will override any current save data.")){
    let projectsConverted = JSON.stringify(projects);
    localStorage.setItem('projects', projectsConverted);
    alert('Projects saved!')
  }
};

export function deleteProjects(){
  if(confirm("Do you wish to delete your saved projects?")){
    localStorage.clear()
    alert('Save deleted!')
  }
  
};

export function isLocalStorageAvailable () {
  var test = 'test';
  try {
    localStorage.setItem (test, test);
    localStorage.removeItem (test);
    return true;
  } catch (e) {
    return false;
  }
}
