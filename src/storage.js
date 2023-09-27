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
  let choice = prompt("Do you wish to save your projects to your local storage? This will override any current save data. (Type 'y' or 'n')")
  if(choice === 'y'){
    let projectsConverted = JSON.stringify(projects);
    localStorage.setItem('projects', projectsConverted);
    alert('Projects saved!')
  }
};

export function deleteProjects(){
  let choice = prompt("Do you wish to delete your saved projects? (Type 'y' or 'n')")
  if(choice === 'y'){
    localStorage.clear()
    alert('Save deleted!')
  }
  
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
