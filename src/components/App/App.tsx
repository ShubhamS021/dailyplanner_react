import { LaneComponent } from 'components/Lane/Lane';
import { type Card } from 'interfaces/Card';
import { colors } from '../../theme/colors';
import { AddTask } from '../AddTask/AddTask';

export const App = () => {
    const cards: Card[] = [
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
    ];

    return (
        <main className="p-10">
            <div className="h-16 mb-6 grid grid-cols-[1fr_auto]">
                <div className="flex flex-col gap-2">
                    <div
                        className="text-3xl font-bold text-[#212121]"
                        data-testid="page-title"
                    >
                        My tasks
                    </div>
                    <div
                        className="text-sm text-[#5A5A65]"
                        data-testid="page-subtitle"
                    >
                        An overview of my tasks.
                    </div>
                </div>
                <div>
                    <AddTask />
                </div>
            </div>
            <div
                className="p-5 rounded-2xl bg-[#F8F8F8] grid grid-cols-4 gap-6"
                data-testid="page-board"
            >
                <LaneComponent
                    color={colors.light_grey}
                    text={'Not started'}
                    cards={cards}
                ></LaneComponent>
                <LaneComponent
                    color={colors.lavender}
                    text={'In Progress'}
                    cards={cards}
                ></LaneComponent>
                <LaneComponent
                    color={colors.rose}
                    text={'Blocked'}
                    cards={cards}
                ></LaneComponent>
                <LaneComponent
                    color={colors.green}
                    text={'Done'}
                ></LaneComponent>
            </div>
        </main>
    );
};

export default App;
