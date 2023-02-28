import { type Lane } from 'interfaces/Lane';
import { colors } from '../../theme/colors';
import { AddTask } from '../AddTask/AddTask';
import { BoardTitle } from '../BoardTitle/BoardTitle';
import { LaneComponent } from '../Lane/Lane';

export const App = () => {
    const lanes: Lane[] = [
        {
            id: 1,
            title: 'Not Started',
            color: colors.light_grey,
            cards: [
                {
                    id: 1,
                    title: 'Working title',
                    description: 'Some text',
                    upperTags: [
                        { id: 1, text: 'Tag A', color: colors.rose },
                        { id: 2, text: 'Tag B', color: colors.green },
                    ],
                    lowerTags: [
                        { id: 1, text: 'Tag C', color: colors.rose },
                        { id: 2, text: 'Tag D', color: colors.green },
                    ],
                    tasks: [
                        { id: 1, description: 'Task 1' },
                        { id: 2, description: 'Task 2' },
                    ],
                },
            ],
        },
        {
            id: 2,
            title: 'In Progress',
            color: colors.lavender,
            cards: [],
        },
        {
            id: 3,
            title: 'Blocked',
            color: colors.rose,
            cards: [],
        },
        {
            id: 4,
            title: 'Done',
            color: colors.green,
            cards: [],
        },
    ];

    const renderLanes = (lanes: Lane[]) => {
        return (
            <>
                {lanes.map((l, index) => (
                    <LaneComponent
                        key={`lane-${index}`}
                        id={l.id}
                        text={l.title}
                        color={l.color}
                        cards={l.cards}
                    ></LaneComponent>
                ))}
            </>
        );
    };

    return (
        <main className="p-10">
            <div className="h-16 mb-6 grid grid-cols-[1fr_auto]">
                <BoardTitle
                    title="My tasks"
                    subtitle="An overview of my tasks."
                />
                <div>
                    <AddTask />
                </div>
            </div>
            <div
                className="p-5 rounded-2xl bg-[#F8F8F8] grid grid-cols-4 gap-6"
                data-testid="page-board"
            >
                {renderLanes(lanes)}
            </div>
        </main>
    );
};

export default App;
