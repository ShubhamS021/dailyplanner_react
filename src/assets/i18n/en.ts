export const ENtranslation = {
    components: {
        landing: {
            hero: {
                header: 'Tasks made easy.',
                subheader: 'Easy to set up. Customizable. Quick. Responsive.',
                cta: 'Create your board',
            },
        },
        featureCards: {
            header: 'Why Dayplanner?',
            subheader: 'Here are some reasons why Dayplanner is right for you.',
            customBoards: {
                subtext: 'Create custom boards with individual columns.',
                text: 'Custom Board',
            },
            tags: {
                subtext: 'Use tags to categorize your tasks.',
                text: 'Tags',
            },
            supabase: {
                subtext: 'Use Supabase to store your data.',
                text: 'Supabase',
            },
        },
        'side-nav': {
            boards: 'All boards',
            board: 'My board',
            history: 'Board history',
        },
        'board-add': {
            title: 'Create a new board',
            standardBoard: 'Standard board',
            customBoard: 'Custom board',
            subtitle: 'Choose your way to create your board.',
            standard:
                'Start with a standard board. A standard board contains a predefined name, description and these lanes:',
            create: 'Create',
            custom: 'Create your board with your settings!',
            customDescription: 'Let us start with the basics. ',
            name: 'Name of the new board',
            description: 'Description of the new board',
            nextToLanes: 'Next: create your lanes',
            PS: 'You can always change your settings later.',
        },
        AddCard: {
            modal: {
                AddCardDescription: {
                    placeholderTitle: 'Task name',
                    placeholderDescription: 'Describe your task',
                },
                AddDueDate: {
                    add: 'Add',
                    pickADate: 'Choose a date',
                    preset: 'Presets',
                    today: 'Today',
                    tomorrow: 'Tomorrow',
                    threeDays: 'In 3 days',
                    sevenDays: 'In a week',
                    fourteenDays: 'In two weeks',
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
                    newTask: 'Your new task result:',
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
                    tag_already_exists_title: 'Tag already exists',
                    tag_already_exists_description:
                        'This tag already exists, please choose another one.',
                    tag_already_exists_action: 'Ok',
                },
            },
        },
        Board: {
            add: 'New task',
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
            addLane: 'Add lane',
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
            exportAll: 'Export list',
        },
        Import: {
            import: 'Import',
            importAll: 'Import list',
        },
        Header: {
            gitlab: 'Follow me',
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
            moveTitle: 'Move card',
            moveText: 'Choose a board.',
            moveSubmit: 'Move',
            moveCancel: 'Cancel',
            editCardSubmit: 'Save changes',
            task: 'task',
            tasks: 'tasks',
        },
        LaneEditModal: {
            title: 'Edit lane',
            newLane: 'Final lane:',
        },
        LanguageChooser: {
            language: 'Language:',
        },
        MyBoardLanes: {
            define: 'Define your lanes',
            subtitle: 'Define the lanes your task can be moved in.',
            laneconfiguration: 'Lane definition',
            name: 'Lane name',
            color: 'Lane color',
            add: 'Add lane',
            finalLanes: 'Your final lanes',
            noLanes: 'No lanes defined.',
            start: 'Next: Start on your new board',
        },
        MyBoards: {
            warningDeleteTitle: 'Warning: Deleting board',
            warningDeleteText:
                'Are you sure you want to delete this board? This action cannot be undone.',
            warningDeleteSubmit: 'Yes, delete board.',
            editTitle: 'Edit board',
            editSubmit: 'Save changes',
            editCancel: 'Cancel',
            title: 'Boards',
            actions: 'Actions',
            subtitle: 'An overview of all your boards.',
            download: 'Download board (.json)',
            edit: 'Edit board',
            remove: 'Remove board',
            create: 'Create board',
            noData: 'No data. Please create or import a board.',
        },
        Login: {
            login: 'Login',
            loginProvider: 'Login with the following provider',
            loginGoogle: 'Login with Google',
            loginGithub: 'Login with Github',
            loginEmail: 'or with email',
            email: 'Email',
            emailExample: 'e.g. mail@yourdomain.com',
            password: 'Password',
            noAccount: "Don't have an account?",
            registerHere: 'Register here',
            back: 'Back to board overview',
        },
        Register: {
            signUp: 'Sign Up',
            signUpProvider: 'Sign Up with the following provider',
            signUpGoogle: 'Sign Up with Google',
            signUpGithub: 'Sign Up with Github',
            signUpEmail: 'or with email',
            username: 'Username',
            email: 'Email',
            emailExample: 'e.g. mail@yourdomain.com',
            password: 'Password',
            alreadyHaveAccount: 'Already have an account?',
            loginHere: 'Login here',
            back: 'Back to board overview',
        },
        'user-nav': {
            myaccount: 'My account',
            settings: 'Settings (coming soon)',
            tour: 'Take the tour (coming soon)',
            support: 'Support (coming soon)',
            signOut: {
                signOut: 'Sign out',
                title: 'Sign out successful',
                description: 'You have successfully signed out.',
            },
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
