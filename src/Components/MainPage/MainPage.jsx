import { lazy, Suspense, useEffect } from 'react';

const Header = lazy(() => import('./Header/Header'));
const Banner = lazy(() => import('./Banner/Banner'));
const FreeMaterial = lazy(() => import('./Material/FreeMaterial'));
const Footer = lazy(() => import('./Footer/Footer'));

function MainPage({ user, viewFree, viewPaid }) {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Header user={user} />
            <Banner />
            <FreeMaterial title='Бесплатные материалы' data={viewFree} type="free" />
            <FreeMaterial title='Платные материалы' data={viewPaid} type="paid" />
            <Footer />
        </Suspense>
    )
}

export default MainPage;
