import { projectFactory, itemFactory } from "./addItems";

export default function addDemoProjects(){
    const homeCleanup = projectFactory("Home Cleanup", "A project to clean up the house", "High", "2023-10-31", "Remember to buy cleaning supplies");
    // A project to learn a new language
    const languageLearning = projectFactory("Language Learning", "A project to learn Spanish", "Medium", "2023-12-31", "Remember to practice every day");
    // A project to plan a vacation
    const vacationPlanning = projectFactory("Vacation Planning", "A project to plan a trip to Hawaii", "Low", "2023-06-30", "Remember to book flights and hotels in advance");
    // A project to write a novel
    const novelWriting = projectFactory("Novel Writing", "A project to write a fantasy novel", "High", "2023-03-31", "Remember to outline the plot and characters");
    let projectsArray = [homeCleanup, languageLearning, vacationPlanning, novelWriting];
    return projectsArray

}