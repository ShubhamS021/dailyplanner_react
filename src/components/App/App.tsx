import { colors } from '../../theme/colors';
import { LaneComponent } from './Lane/Lane';

export const App = () => {
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
                <div>{/* new task button */}</div>
            </div>
            <div
                className="p-5 rounded-2xl bg-[#F8F8F8] grid grid-cols-4 gap-6"
                data-testid="page-board"
            >
                <LaneComponent
                    color={colors.light_grey}
                    text={'Not started'}
                ></LaneComponent>
                <LaneComponent
                    color={colors.lavender}
                    text={'In Progress'}
                ></LaneComponent>
                <LaneComponent
                    color={colors.rose}
                    text={'Blocked'}
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
