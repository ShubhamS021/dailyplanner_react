import { LanguageChooser } from '../common/language-chooser/language-chooser';
import { Header } from '../layout/header';
import FeatureCards from './feature-cards';
import Hero from './hero';

export const Landing = () => {
    return (
        <div className="grid grid-rows-[auto,1fr,auto] gap-3">
            <div>
                <Header />
            </div>
            <main className="flex-1 overflow-y-auto overflow-x-hidden bg-secondary/10 pb-1">
                <Hero />
                <FeatureCards />
                {/* <Features /> */}
            </main>
            <div className="flex py-3 justify-center">
                <LanguageChooser />
            </div>
        </div>
    );
};
