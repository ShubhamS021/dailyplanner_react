import { Header } from '../layout/header';
import Hero from './hero';

export const Landing = () => {
    return (
        <>
            <Header />
            <div className="flex h-screen border-collapse overflow-hidden">
                <main className="flex-1 overflow-y-auto overflow-x-hidden pt-12 bg-secondary/10 pb-1">
                    <Hero />
                    {/* <FeatureCards />
                    <Features /> */}
                </main>
            </div>
        </>
    );
};
