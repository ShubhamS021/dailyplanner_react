export const DEtranslation = {
    components: {
        'side-nav': {
            boards: 'Alle Boards',
            board: 'Mein Board',
            history: 'Board Historie',
        },
        'board-add': {
            title: 'Erstelle ein Board',
            subtitle: 'Wähle eine Möglichkeit um dein Board zu erstellen.',
            standardBoard: 'Standard Board',
            customBoard: 'Eigenes Board',
            standard:
                'Mit einem Standard-Board beginnen. Ein Standard-Board enthält einen fertigen Namen und Beschreibung, sowie diese Spalten:',
            create: 'Erstellen',
            custom: 'Erstelle dein eigenes Board mit deinen Wunsch-Spalten!',
            customDescription: 'Lassen uns mit den Grundlagen beginnen. ',
            name: 'Name des neuen Boards',
            description: 'Beschreibung des neuen Boards',
            nextToLanes: 'Weiter: Erstellen der Spalten',
            PS: 'Du kannst deine Einstellungen jederzeit ändern.',
        },
        AddCard: {
            modal: {
                AddCardDescription: {
                    placeholderTitle: 'Name der Aufgabe',
                    placeholder: 'Beschreibe deine Aufgabe',
                },
                AddDueDate: {
                    add: 'hinzufügen',
                    pickADate: 'Wähle ein Datum',
                    preset: 'Schnellauswahl',
                    today: 'Heute',
                    tomorrow: 'Morgen',
                    threeDays: 'In 3 Tagen',
                    sevenDays: 'In einer Woche',
                    fourteenDays: 'In zwei Wochen',
                },
                AddCardModal: {
                    save: 'Diese Aufgabe speichern.',
                    edit: 'Diese Aufgabe bearbeiten.',
                    descriptionHeadline: 'Was ist Ihre Aufgabe?',
                    subtasksHeadline: 'Teilaufgaben',
                    tagsHeadline: 'Tags',
                    estimationHeadline: 'Schätzung',
                    dueDateHeadline: 'Fälligkeitsdatum',
                    cancel: 'Abbrechen',
                    submit: 'Aufgabe hinzufügen',
                    newTask: 'Deine neue Aufgabe:',
                },
                AddCardSubtasks: {
                    define: 'Teilaufgabe definieren.',
                    add: 'hinzufügen',
                    edit: 'Diese Aufgabe bearbeiten.',
                    remove: 'Diese Aufgabe entfernen.',
                    save: 'Diese Aufgabe speichern.',
                },
                AddCardTags: {
                    add: 'hinzufügen',
                    limit: 'Tag-Grenze erreicht.',
                },
            },
        },
        Board: {
            add: 'Neue Aufgabe',
            addSubmit: 'Hinzufügen',
        },
        BoardHistory: {
            historyFor: 'Historie für: ',
            historyForDescription: 'Was ist meinem Board passiert?',
            movedFrom: 'Verschoben von Spalte',
            movedTo: 'nach',
            movedToBoard: 'Verschoben auf Board:',
            time: 'Datum, Uhrzeit',
            type: 'Art der Veränderung',
            data: 'Daten',
            additionaldata: 'Zusatzinformationen',
            creation: 'Eine neue Aufgabe.',
            movement: 'Aufgabe wurde zwischen Spalten bewegt.',
            boardmovement: 'Aufgabe wurde auf anderes Board verschoben.',
            update: 'Aufgabe aktualisiert.',
            deletion: 'Aufgabe gelöscht.',
            noData: 'Es gibt noch keine Daten zu diesem Board.',
        },
        BoardEditModal: {
            titleAndDescription: 'Titel und Beschreibung',
            title: 'Titel aktualisieren.',
            subtitle: 'Untertitel aktualisieren.',
            add: 'hinzufügen',
            addLane: 'Spalte hinzufügen',
            addLaneText: 'Spaltennamen eingeben.',
            moveRemoveLane: 'Spalten verschieben / löschen',
            removeHint:
                'Erfülle erst alle Aufgaben um die Spalte löschen zu können.',
            tasks: 'Aufgaben',
        },
        Card: {
            actions: 'Aktionen',
            move: 'Karte verschieben',
            edit: 'Karte bearbeiten',
            remove: 'Karte entfernen',
        },
        CompactModeToggle: {
            normal: 'Normaler Modus',
            compact: 'Kompaktmodus',
        },
        ConfirmationModal: {
            cancel: 'Abbrechen',
            ok: 'Ok',
        },
        Export: {
            export: 'Exportieren',
        },
        Import: {
            import: 'Importieren',
        },
        Header: {
            gitlab: 'Folge mir',
        },
        HistoryToggle: {
            history: 'Historie',
        },
        Lane: {
            actions: 'Aktionen',
            edit: 'Spalte bearbeiten',
            editNameText: 'Vergeben Sie einen neuen Spaltennamen:',
            editLabelText: 'Wählen Sie eine Spaltenfarbe:',
            deleteTitle: 'Alle Karten aus Spalte löschen',
            deleteAll: 'Alle Karten löschen',
            dropzone: 'Aufgaben hier platzieren..',
            deletionTitle: 'Warnung: Alle Karten aus Spalte löschen',
            deletionText:
                'Sind Sie sicher, dass Sie alle Karten aus dieser Spalte löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            deletionSubmit: 'Ja, alles löschen.',
            moveTitle: 'Karte verschieben',
            moveText: 'Wähle ein Board aus.',
            moveSubmit: 'Verschieben',
            moveCancel: 'Abbechen',
            editCardSubmit: 'Änderungen speichern',
            task: 'Aufgabe',
            tasks: 'Aufgaben',
        },
        LaneEditModal: {
            title: 'Spalte bearbeiten',
            newLane: 'Fertige Spalte:',
        },
        LanguageChooser: {
            language: 'Sprache:',
        },
        MyBoardLanes: {
            define: 'Definieren Sie Ihre Spalten',
            subtitle:
                'Definieren Sie die Spalten, die ihre Aufgaben durchlaufen sollen.',
            laneconfiguration: 'Spaltendefinition',
            name: 'Spaltennamen',
            color: 'Spaltenfarbe',
            add: 'Spalte hinzufügen',
            finalLanes: 'Deine Spalten',
            noLanes: 'Keine Spalten definiert.',
            start: 'Weiter: Starte mit deinem neuen Board',
        },
        MyBoards: {
            warningDeleteTitle: 'Warnung: Board löschen',
            warningDeleteText:
                'Sind Sie sicher, dass Sie dieses Board löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            warningDeleteSubmit: 'Ja, Board löschen.',
            editTitle: 'Board editieren',
            editSubmit: 'Änderungen speichern',
            editCancel: 'Abbrechen',
            title: 'Boards',
            actions: 'Aktionen',
            subtitle: 'Ein Überblick über alle Ihre Boards.',
            download: 'Download Board (.json)',
            edit: 'Board bearbeiten',
            remove: 'Board entfernen',
            create: 'Neues Board',
            noData: 'Keine Daten. Bitte erstelle oder importiere ein Board.',
        },
        Login: {
            login: 'Login',
            loginProvider: 'Loggen Sie sich mit dem folgenden Anbieter ein',
            loginGoogle: 'Mit Google einloggen',
            loginGithub: 'Mit Github einloggen',
            loginEmail: 'oder mit E-Mail',
            email: 'E-Mail',
            emailExample: 'e.g. mail@deinedomain.de',
            password: 'Passwort',
            noAccount: 'Haben Sie noch kein Konto?',
            registerHere: 'Hier registrieren',
        },
        Register: {
            signUp: 'Registrieren',
            signUpProvider: 'Registrieren Sie sich mit dem folgenden Anbieter',
            signUpGoogle: 'Mit Google registrieren',
            signUpGithub: 'Mit Github registrieren',
            signUpEmail: 'oder mit E-Mail',
            username: 'Benutzername',
            email: 'E-Mail',
            emailExample: 'e.g. mail@deinedomain.de',
            password: 'Passwort',
            alreadyHaveAccount: 'Haben Sie bereits ein Konto?',
            loginHere: 'Hier einloggen',
        },
    },
    state: {
        board: {
            title: 'Meine Aufgaben',
            subtitle: 'Ein Überblick meiner Aufgaben.',
        },
        lanes: {
            notStarted: 'Nicht begonnen',
            inProgress: 'In Bearbeitung',
            blocked: 'Blockiert',
            done: 'Fertig',
        },
    },
};
