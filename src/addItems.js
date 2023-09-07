export function projectFactory (title, description, priority, dueDate, notes) {
    return {
        title,
        description,
        priority,
        dueDate,
        notes
    }
}

export function itemFactory (title, description, priority, dueDate, notes, checklist) {
    return {
        title,
        description,
        priority,
        dueDate,
        notes,
        checklist
    }
}