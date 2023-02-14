import { CardComponent } from '../Card/Card';
import { LabelComponent } from '../Label/Label';

export interface LaneProps {
    color: string;
    text: string;
}

export const LaneComponent = (props: LaneProps) => {
    return (
        <div className="flex flex-col gap-2">
            <LabelComponent color={props.color} text={props.text} />
            <CardComponent
                title="Card Title"
                description="A description of a task."
            />
            <CardComponent
                title="Card Title"
                description="A description of a task."
            />
            <CardComponent
                title="Card Title"
                description="A description of a task."
            />
        </div>
    );
};
