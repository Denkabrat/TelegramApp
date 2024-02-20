import { useParams, useLocation } from 'react-router-dom';
import style from './LessonPage.module.css'
import Footer from '../MainPage/Footer/Footer'
import Descreption from './Descreption/Descreption';
import HeaderLesson from './HeaderLesson/HeaderLesson';
import FreeMaterial from '../MainPage/Material/FreeMaterial';
import { useEffect } from 'react';

function LessonPage({ viewFree, viewPaid }) {
    const { id } = useParams();
    const location = useLocation();

    const selectedMaterial = location.pathname.includes('/paid') ? viewPaid : viewFree;
    const card = selectedMaterial?.find((item) => item.link === parseInt(id, 10));

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={style["main-wrapper"]}>
            <HeaderLesson card={card} />
            <Descreption card={card} />
            <FreeMaterial title='Бесплатные материалы' data={viewFree} type="free" />
            <FreeMaterial title='Платные материалы' data={viewPaid} type="paid" />
            <Footer className={style.footer} />
        </div>
    );
}

export default LessonPage
