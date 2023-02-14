import { colors } from '../../theme/colors';
import { CardComponent } from './Card/Card';
import { LabelComponent } from './Label/Label';

export const App = () => {
    return (
        <main className="bg-[#F8F8F8] p-4">
            <div className="grid grid-rows-2 gap-1 items-center">
                Basic card with looped tags and strikeable tasks and a label for
                the lane:
                <LabelComponent color={colors.rose} text="Test" />
                <CardComponent
                    title="Card Title"
                    description="A description of a task."
                />
            </div>
        </main>
    );
};

export default App;
