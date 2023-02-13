import { CardComponent } from './Card/Card';

export const App = () => {
    return (
        <main className="bg-[#F8F8F8] p-4">
            <div className="grid grid-rows-2 gap-1 items-center">
                Basic Card with tags:
                <CardComponent />
            </div>
        </main>
    );
};

export default App;
