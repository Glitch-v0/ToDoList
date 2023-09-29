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
    const sweeping = itemFactory("Clean floors", "Phase 1", "High", "2023-10-25", "Start from the farthest corner and work your way out.", ["Sweeping", "Vacuuming", "Mopping"], parent="Home Cleanup");   
    const dusting = itemFactory("Dust furniture", "Phase 2", "Medium", "2023-10-26", "Use a microfiber cloth or a feather duster.", ["Dusting", "Wiping", "Polishing"], parent="Home Cleanup");
    const laundry = itemFactory("Do laundry", "Phase 3", "Low", "2023-10-27", "Separate whites and colors, and use the appropriate detergent.", ["Sorting", "Washing", "Drying", "Folding"], parent="Home Cleanup");
    const decluttering = itemFactory("Declutter closets and drawers", "Phase 4", "High", "2023-10-28", "Donate or discard items that you don't need or use anymore.", ["Organizing", "Donating", "Disposing"], parent="Home Cleanup");
    const sanitizing = itemFactory("Sanitize bathroom and kitchen", "Phase 5", "High", "2023-10-29", "Wear gloves and use bleach or vinegar to kill germs.", ["Scrubbing", "Rinsing", "Disinfecting"], parent="Home Cleanup");
    homeCleanup.items = [sweeping, dusting, laundry, decluttering, sanitizing];
    // Language Learning
    const vocabulary = itemFactory("Learn new words", "Daily task", "High", "2023-12-31", "Review the words you learned before and after each session.", ["Flashcards", "Quizzes", "Games"], parent="Language Learning");
    const grammar = itemFactory("Review grammar rules", "Weekly task", "Medium", "2023-12-31", "Practice using the rules in different sentences and contexts.", ["Exercises", "Examples","Corrections"], parent="Language Learning");
    const listening = itemFactory("Listen to Spanish podcasts or songs","Daily task","Low","2023-12-31","Choose topics or genres that interest you and listen actively.",["Listening","Repeating","Translating"], parent="Language Learning");
    const speaking = itemFactory("Practice speaking with a native speaker or a tutor","Weekly task","High","2023-12-31","Don't be afraid to make mistakes and ask for feedback.",["Conversation","Pronunciation","Feedback"], parent="Language Learning");
    const reading = itemFactory("Read a Spanish book or article","Daily task","Medium","2023-12-31","Pick a level-appropriate text and look up unfamiliar words or expressions.",["Reading","Comprehension","Annotation"], parent="Language Learning");
    languageLearning.items = [vocabulary, grammar, listening, speaking, reading];
    // Vacation Planning
    const budgeting = itemFactory("Set a budget for the trip","Step 1","High","2023-05-31","Include all the expenses such as transportation, accommodation, food, activities, etc.",["Estimating","Saving","Tracking"], parent="Vacation Planning");
    const researching = itemFactory("Research the destination and attractions","Step 2","Medium","2023-06-15","Find out the best time to visit, the weather, the culture, the safety, etc.",["Searching","Comparing","Reviewing"], parent="Vacation Planning");
    const booking = itemFactory("Book flights and hotels online or through an agent","Step 3","High","2023-06-30","Compare prices and reviews, and check the cancellation policies.",["Booking","Confirming","Printing"], parent="Vacation Planning");
    const packing = itemFactory("Pack the essentials and extras for the trip","Step 4","Low" ,"2023 -06 -30" ,"Pack light and smart, and don't forget your passport, tickets, insurance, etc.",["Packing" ,"Checking" ,"Labeling"] ,parent ="Vacation Planning");
    const enjoying = itemFactory("Enjoy the trip and have fun in Hawaii!","Step 5" ,"Low" ,"2023 -06 -30" ,"Be flexible and adventurous, and make some memories!",["Exploring" ,"Relaxing" ,"Experiencing"] ,parent ="Vacation Planning");
    vacationPlanning.items = [budgeting, researching, booking, packing, enjoying];
    // Novel Writing
    const outlining = itemFactory("Create a detailed outline of the plot and subplots","Stage 1: Planning ","High" ,"2023 -01 -31" ,"Use a template or a software to organize your ideas and scenes.",["Outlining" ,"Structuring" ,"Sequencing"] ,parent ="Novel Writing");
    const characterizing = itemFactory("Develop the main and secondary characters and their arcs","Stage 1: Planning ","Medium" ,"2023 -01 -31" ,"Give each character a name, a personality, a goal, a flaw, etc.",["Characterizing" ,"Motivating" ,"Evolving"] ,parent ="Novel Writing");
    const worldbuilding = itemFactory("Build the fantasy world and its rules and history","Stage 1: Planning ","Medium" ,"2023 -01 -31" ,"Create a map, a timeline, a magic system, a culture, etc.",["Worldbuilding" ,"Describing" ,"Imagining"] ,parent ="Novel Writing");
    const drafting = itemFactory("Write the first draft of the novel following the outline","Stage 2: Writing ","High" ,"2023 -02 -28" ,"Don't worry about perfection, just write and let your creativity flow.",["Drafting" ,"Writing" ,"Creating"] ,parent ="Novel Writing");
    const revising = itemFactory("Revise the draft for content, style, and grammar ","Stage 3: Editing ","High" ,"2023 -03 -31" ,"Get feedback from others, and use tools or guides to improve your writing.",["Revising" ,"Editing" ,"Polishing"] ,parent ="Novel Writing");
    novelWriting.items = [outlining, characterizing, worldbuilding, drafting, revising];

    projectsDict[homeCleanup.title] = homeCleanup;
    projectsDict[languageLearning.title] = languageLearning;
    projectsDict[vacationPlanning.title] = vacationPlanning;
    projectsDict[novelWriting.title] = novelWriting;
    //console.log(projectsDict)
    return projectsDict

}