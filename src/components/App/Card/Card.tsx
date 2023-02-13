import { colors } from '../../../theme/colors';
import { TagComponent } from '../Tag/Tag';

export const CardComponent = () => {
    return (
        <div className="bg-white border border-solid rounded-lg border-[#DDDDDD] p-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.08)]">
            <div className="flex flex-col gap-2 items-start">
                {/* <Tags /> */}
                <div className="flex gap-1">
                    <TagComponent color={colors.rose} text="Tag 1" />
                    <TagComponent color={colors.green} text="Tag 2" />
                </div>
                <h3 className="font-semibold text-base">Card title</h3>
                <p className="text-sm text-[#5A5A65]">
                    A description of a task.
                </p>
                {/* <Tasks /> */}
                {/* <Tags /> */}
            </div>
        </div>
    );
};
