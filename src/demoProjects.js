import { projectFactory, itemFactory } from "./addItems";

export default function addDemoProjects(){
    /* Example Projects */
    const homeCleanup = projectFactory("Home Cleanup", "A project to clean up the house", "High", "2023-10-31", "Remember to buy cleaning supplies");
    const languageLearning = projectFactory("Language Learning", "A project to learn Spanish", "Medium", "2023-12-31", "Remember to practice every day");
    const vacationPlanning = projectFactory("Vacation Planning", "A project to plan a trip to Hawaii", "Low", "2023-06-30", "Remember to book flights and hotels in advance");
    const novelWriting = projectFactory("Novel Writing", "A project to write a fantasy novel", "High", "2023-03-31", "Remember to outline the plot and characters");
    let projectsDict = {};
    /* Example items for each project */
    // Home Cleanup
    const sweeping = itemFactory("Clean floors", "Phase 1", "High", "2023-10-25", "", ["Sweeping, Vacuuming, Mopping"], parent="Home Cleanup")   
    const dusting = itemFactory("Dust furniture", "Phase 2", "Medium", "2023-10-26", "", ["Dusting, Wiping, Polishing"], parent="Home Cleanup");
    const laundry = itemFactory("Do laundry", "Phase 3", "Low", "2023-10-27", "", ["Sorting, Washing, Drying, Folding"], parent="Home Cleanup");
    const decluttering = itemFactory("Declutter closets and drawers", "Phase 4", "High", "2023-10-28", "", ["Organizing, Donating, Disposing"], parent="Home Cleanup");
    const sanitizing = itemFactory("Sanitize bathroom and kitchen", "Phase 5", "High", "2023-10-29", "", ["Scrubbing, Rinsing, Disinfecting"], parent="Home Cleanup");
    homeCleanup.items = [sweeping, dusting, laundry, decluttering, sanitizing];
    // Language Learning
    const vocabulary = itemFactory("Learn new words", "Daily task", "High", "2023-12-31", "", ["Flashcards, Quizzes, Games"], parent="Language Learning");
    const grammar = itemFactory("Review grammar rules", "Weekly task", "Medium", "2023-12-31", "", ["Exercises, Examples, Corrections"], parent="Language Learning");
    const listening = itemFactory("Listen to Spanish podcasts or songs", "Daily task", "Low", "2023-12-31", "", ["Listening, Repeating, Translating"], parent="Language Learning");
    const speaking = itemFactory("Practice speaking with a native speaker or a tutor", "Weekly task", "High", "2023-12-31", "", ["Conversation, Pronunciation, Feedback"], parent="Language Learning");
    const reading = itemFactory("Read a Spanish book or article", "Daily task", "Medium", "2023-12-31", "", ["Reading, Comprehension, Annotation"], parent="Language Learning");
    languageLearning.items = [vocabulary, grammar, listening, speaking, reading];
    // Vacation Planning
    const budgeting = itemFactory("Set a budget for the trip", "Step 1", "High", "2023-05-31", "", ["Estimating, Saving, Tracking"], parent="Vacation Planning");
    const researching = itemFactory("Research the destination and attractions", "Step 2", "Medium", "2023-06-15", "", ["Searching, Comparing, Reviewing"], parent="Vacation Planning");
    const booking = itemFactory("Book flights and hotels online or through an agent", "Step 3", "High", "2023-06-30", "", ["Booking, Confirming, Printing"], parent="Vacation Planning");
    const packing = itemFactory("Pack the essentials and extras for the trip", "Step 4", "Low", "2023-06-30", "", ["Packing, Checking, Labeling"], parent="Vacation Planning");
    const enjoying = itemFactory("Enjoy the trip and have fun in Hawaii!", "Step 5", "Low", "2023-06-30", "", ["Exploring, Relaxing, Experiencing"], parent="Vacation Planning");
    vacationPlanning.items = [budgeting, researching, booking, packing, enjoying];
    // Novel Writing
    const outlining = itemFactory("Create a detailed outline of the plot and subplots", "Stage 1: Planning ", "High","2023-01-31","",["Outlining, Structuring, Sequencing"], parent="Novel Writing");
    const characterizing = itemFactory("Develop the main and secondary characters and their arcs","Stage 1: Planning","Medium","2023-01-31","",["Characterizing, Motivating, Evolving"], parent="Novel Writing");
    const worldbuilding = itemFactory("Build the fantasy world and its rules and history","Stage 1: Planning","Medium","2023-01-31","",["Worldbuilding, Describing, Imagining"], parent="Novel Writing");
    const drafting = itemFactory("Write the first draft of the novel following the outline","Stage 2: Writing","High","2023-02-28","",["Drafting, Writing, Creating"], parent="Novel Writing");
    const revising = itemFactory("Revise the draft for content, style, and grammar","Stage 3: Editing","High","2023-03-31","",["Revising, Editing, Polishing"], parent="Novel Writing");
    novelWriting.items = [outlining, characterizing, worldbuilding, drafting, revising];
    projectsDict[homeCleanup.title] = homeCleanup;
    projectsDict[languageLearning.title] = languageLearning;
    projectsDict[vacationPlanning.title] = vacationPlanning;
    projectsDict[novelWriting.title] = novelWriting;
    //console.log(projectsDict)
    return projectsDict

}