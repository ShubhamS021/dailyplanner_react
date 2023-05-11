export const ENtranslation = {
    components: {
        AddBoard: {
            title: 'Welcome to Dayplanner',
            standard: 'Start with a standard board',
            create: 'Create',
            or: 'or',
            custom: 'Create your own board',
            name: 'Enter a name.',
            exampleName: 'e.g. "My Tasks"',
            description: 'Enter a description.',
            exampleDescription: 'e.g. "An overview of my tasks."',
        },
        AddCard: {
            modal: {
                AddCardDescription: {
                    placeholder: 'Define your task.',
                },
                AddDueDate: {
                    add: 'Add due date',
                },
                AddCardModal: {
                    save: 'Save this task.',
                    edit: 'Edit this task.',
                    descriptionHeadline: "What's your task?",
                    descriptionExplanation:
                        'Give a short description of the task you need to track.',
                    subtasksHeadline: 'Subtasks',
                    subtasksExplanation:
                        'If your task has multiple steps, break it down into subtasks and list them here.',
                    tagsHeadline: 'Add Tags',
                    tagsExplanation:
                        'Choose or define tags to your task to make it easier to find and group with other similar tasks.',
                    dueDateHeadline: 'Add due date',
                    dueDateExplanation: 'Define a due date for this task.',
                    cancel: 'Cancel',
                    submit: 'Add task',
                },
                AddCardSubtasks: {
                    define: 'Define a subtask.',
                    add: 'Add subtask',
                    edit: 'Edit this task.',
                    remove: 'Remove this task.',
                    save: 'Save this task.',
                },
                AddCardTags: {
                    add: 'Add tag',
                    limit: 'Tag limit reached.',
                },
            },
        },
        Board: {
            add: 'Write a new task',
            addSubmit: 'add',
        },
        BoardRenameModal: {
            title: 'Update the title.',
            subtitle: 'Update the subtitle.',
        },
        Card: {
            move: 'Move this card.',
            edit: 'Edit this card.',
            remove: 'Remove this card.',
        },
        CompactModeToggle: {
            normal: 'Normal mode',
            compact: 'Compact mode',
        },
        ConfirmationModal: {
            cancel: 'Cancel',
            ok: 'Ok',
        },
        Export: {
            export: 'Export',
        },
        Import: {
            import: 'Import',
        },
        Lane: {
            deleteTitle: 'Delete all cards from lane',
            deleteAll: 'delete all',
            dropzone: 'Place tasks here..',
            deletionTitle: 'Warning: Deleting all cards from lane',
            deletionText:
                'Are you sure you want to delete all cards from this lane? This action cannot be undone.',
            deletionSubmit: 'Yes, delete all.',
            moveTitle: 'Move card to another board',
            moveText: 'Choose the board you want move your card to:',
            moveSubmit: 'Move the card',
            editCardSubmit: 'Save changes',
        },
        LanguageChooser: {
            language: 'Language:',
        },
        MyBoardLanes: {
            define: 'Define your lanes',
            subtitle: 'Define the lanes to add your tasks to.',
            name: 'Enter a lane name.',
            color: 'Pick a lane color:',
            add: 'Add lane',
            start: 'Start',
        },
        MyBoards: {
            warningDeleteTitle: 'Warning: Deleting board',
            warningDeleteText:
                'Are you sure you want to delete this board? This action cannot be undone.',
            warningDeleteSubmit: 'Yes, delete board.',
            renameTitle: 'Rename board',
            renameText: 'Please change the information of the board.',
            renameSubmit: 'Save changes.',
            title: 'My boards',
            edit: 'Edit this board.',
            remove: 'Remove this board.',
            or: 'or',
            create: 'Create a new board',
            start: 'Start',
            git: 'Dayplanner on',
        },
    },
    state: {
        board: {
            title: 'My tasks',
            subtitle: 'An overview of my tasks.',
        },
        lanes: {
            notStarted: 'Not started',
            inProgress: 'In Progress',
            blocked: 'Blocked',
            done: 'Done',
        },
    },
};
