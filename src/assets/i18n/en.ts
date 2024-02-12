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
                    placeholderTitle: 'Taskname',
                    placeholderDescription: 'Define your task.',
                },
                AddDueDate: {
                    add: 'Add',
                },
                AddCardModal: {
                    save: 'Save this task.',
                    edit: 'Edit this task.',
                    descriptionHeadline: "What's your task?",
                    subtasksHeadline: 'Subtasks',
                    tagsHeadline: 'Tags',
                    estimationHeadline: 'Estimation',
                    dueDateHeadline: 'Due date',
                    cancel: 'Cancel',
                    submit: 'Add task',
                    newTask: 'Your new task:',
                },
                AddCardSubtasks: {
                    define: 'Define a subtask.',
                    add: 'Add',
                    edit: 'Edit this task.',
                    remove: 'Remove this task.',
                    save: 'Save this task.',
                },
                AddCardTags: {
                    add: 'Add',
                    limit: 'Tag limit reached.',
                },
            },
        },
        Board: {
            add: 'Write a new task',
            addSubmit: 'add',
        },
        BoardHistory: {
            historyFor: 'History for: ',
            historyForDescription: 'What happened to my board?',
            movedFrom: 'Moved from lane',
            movedTo: 'to',
            movedToBoard: 'Moved to board:',
            time: 'Date, Time',
            type: 'Type of change',
            data: 'Data',
            additionaldata: 'Additional data',
            creation: 'New task was added.',
            movement: 'Task was moved between lanes.',
            boardmovement: 'Task was moved to another board.',
            update: 'Task was updated.',
            deletion: 'Task was deleted.',
            noData: 'There is no data for this board yet.',
        },
        BoardEditModal: {
            titleAndDescription: 'Title and description',
            title: 'Update the title.',
            subtitle: 'Update the subtitle.',
            add: 'add',
            addLane: 'Add a lane',
            addLaneText: 'Enter a lane name.',
            moveRemoveLane: 'Move / Remove lane',
            removeHint: 'Finish all tasks in lane to remove the lane.',
            tasks: 'tasks',
        },
        Card: {
            actions: 'Actions',
            move: 'Move card',
            edit: 'Edit card',
            remove: 'Remove card',
        },
        CompactModeToggle: {
            normal: 'Normal mode',
            compact: 'Compact mode',
        },
        ConfirmationModal: {
            cancel: 'Cancel',
            ok: 'Ok',
        },
        DarkModeToggle: {
            light: 'Light',
            dark: 'Dark',
        },
        Export: {
            export: 'Export',
            exportAll: 'Export all',
        },
        Import: {
            import: 'Import',
            importAll: 'Import all',
        },
        HistoryToggle: {
            history: 'History',
        },
        Lane: {
            actions: 'Actions',
            edit: 'Edit lane',
            editNameText: 'Enter a new lane name:',
            editLabelText: 'Choose a new lane color:',
            deleteTitle: 'Delete all cards from lane',
            deleteAll: 'Delete all cards',
            dropzone: 'Place tasks here..',
            deletionTitle: 'Warning: Deleting all cards from lane',
            deletionText:
                'Are you sure you want to delete all cards from this lane? This action cannot be undone.',
            deletionSubmit: 'Yes, delete all.',
            moveTitle: 'Move card to another board',
            moveText: 'Choose the board you want move your card to:',
            moveSubmit: 'Move the card',
            editCardSubmit: 'Save changes',
            task: 'task',
            tasks: 'tasks',
        },
        LaneEditModal: {
            title: 'Edit lane',
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
            editTitle: 'Edit board',
            editSubmit: 'Save changes.',
            editCancel: 'Cancel',
            enter: 'Enter this board.',
            title: 'My boards',
            edit: 'Edit this board.',
            remove: 'Remove this board.',
            or: 'or',
            create: 'Create a new board',
            start: 'Start',
            git: 'Dayplanner on',
        },
        Login: {
            login: 'Login',
            loginProvider: 'Log in with the following provider',
            loginGoogle: 'Log in with Google',
            loginGithub: 'Log in with Github',
            loginEmail: 'or with email',
            email: 'Email',
            password: 'Password',
            noAccount: "Don't have an account?",
            registerHere: 'Register here',
        },
        Register: {
            signUp: 'Sign Up',
            signUpProvider: 'Sign Up with the following provider',
            signUpGoogle: 'Sign Up with Google',
            signUpGithub: 'Sign Up with Github',
            signUpEmail: 'or with email',
            username: 'Username',
            email: 'Email',
            password: 'Password',
            alreadyHaveAccount: 'Already have an account?',
            loginHere: 'Login here',
        },
    },
    state: {
        board: {
            title: 'My tasks',
            subtitle: 'An overview of my tasks.',
        },
        lanes: {
            notStarted: 'Not Started',
            inProgress: 'In Progress',
            blocked: 'Blocked',
            done: 'Done',
        },
    },
};
