export const DEtranslation = {
    components: {
        AddBoard: {
            title: 'Willkommen bei Dayplanner',
            standard: 'Mit einem Standard-Board beginnen',
            create: 'Erstellen',
            or: 'oder',
            custom: 'Eigenes Board erstellen',
            name: 'Gib einen Namen an.',
            exampleName: 'z.B. "Meine Aufgaben"',
            description: 'Gib eine Beschreibung an.',
            exampleDescription: 'z.B. "Eine Übersicht meiner Aufgaben"',
        },
        AddCard: {
            modal: {
                AddCardDescription: {
                    placeholderTitle: 'Name der Aufgabe',
                    placeholder: 'Definieren Sie Ihre Aufgabe.',
                },
                AddDueDate: {
                    add: 'hinzufügen',
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
        },
        BoardRenameModal: {
            title: 'Titel aktualisieren.',
            subtitle: 'Untertitel aktualisieren.',
        },
        Card: {
            move: 'Diese Karte verschieben.',
            edit: 'Diese Karte bearbeiten.',
            remove: 'Diese Karte entfernen.',
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
            exportAll: 'Alles exportieren',
        },
        Import: {
            import: 'Importieren',
            importAll: 'Alle importieren',
        },
        HistoryToggle: {
            history: 'Historie',
        },
        Lane: {
            editTitle: 'Spalte bearbeiten',
            edit: 'bearbeiten',
            editNameText: 'Vergeben Sie einen neuen Spaltennamen:',
            editLabelText: 'Wählen Sie eine Spaltenfarbe:',
            deleteTitle: 'Alle Karten aus Spalte löschen',
            deleteAll: 'alle löschen',
            dropzone: 'Aufgaben hier platzieren..',
            deletionTitle: 'Warnung: Alle Karten aus Spalte löschen',
            deletionText:
                'Sind Sie sicher, dass Sie alle Karten aus dieser Spalte löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            deletionSubmit: 'Ja, alles löschen.',
            moveTitle: 'Karte in ein anderes Board verschieben',
            moveText:
                'Wählen Sie das Board aus, zu dem Sie Ihre Karte verschieben möchten:',
            moveSubmit: 'Karte verschieben',
            editCardSubmit: 'Änderungen speichern',
            task: 'Aufgabe',
            tasks: 'Aufgaben',
        },
        LaneEditModal: {
            title: 'Spalte bearbeiten',
        },
        LanguageChooser: {
            language: 'Sprache:',
        },
        MyBoardLanes: {
            define: 'Definieren Sie Ihre Spalten',
            subtitle:
                'Definieren Sie die Spalten, um Ihre Aufgaben hinzuzufügen.',
            name: 'Geben Sie einen Spaltennamen ein.',
            color: 'Wählen Sie eine Spaltenfarbe:',
            add: 'Spalte hinzufügen',
            start: 'Start',
        },
        MyBoards: {
            warningDeleteTitle: 'Warnung: Board löschen',
            warningDeleteText:
                'Sind Sie sicher, dass Sie dieses Board löschen möchten? Diese Aktion kann nicht rückgängig gemacht werden.',
            warningDeleteSubmit: 'Ja, Board löschen.',
            renameTitle: 'Board umbenennen',
            renameText: 'Bitte ändern Sie die Informationen des Boards.',
            renameSubmit: 'Änderungen speichern.',
            title: 'Meine Boards',
            edit: 'Dieses Board bearbeiten.',
            remove: 'Dieses Board entfernen.',
            or: 'oder',
            create: 'Neues Board erstellen',
            start: 'Start',
            git: 'Dayplanner auf',
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
