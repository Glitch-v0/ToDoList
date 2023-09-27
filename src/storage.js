import addDemoProjects from "./demoProjects.js";

export function loadProjects(){
    let projects;
    if (isLocalStorageAvailable()) {
        if (localStorage.getItem('projects') !== null) {
            console.log('Projects are stored!');
            projects = localStorage.getItem('projects');
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
  let projects_to_save = {};
  const projects = document.getElementsByClassName("project-name")
  localStorage.setItem('projects', projects);
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
