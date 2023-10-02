export function projectFactory (title, description, priority, dueDate, notes) {
    return {
        type: "project",
        title,
        items: [],
        description,
        priority,
        dueDate,
        notes
    }
}

export function itemFactory (title, description, priority, dueDate, notes, checklist = {}, parent) {
    return {
        type: "item",
        title,
        description,
        priority,
        dueDate,
        notes,
        checklist,
        parent,
    }
}