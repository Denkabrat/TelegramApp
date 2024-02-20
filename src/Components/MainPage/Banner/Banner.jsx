import style from './Banner.module.css'
import bunner from '../../../../public/Rectangle2.mp4'
import { Link } from 'react-router-dom'
import url from '../../../url'

function Banner() {
    const handleView = async () => {
        try {
            const response = await fetch(`${url}/_internal_/send_view_action`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number: 1, type: 'free' }),
            });
            if (response.ok) {
                appElement.scrollTo(0, 0);
            } else {
                console.error('Error creating subscription link:', response.statusText);
            }
        } catch (error) {
            console.error('Error creating subscription link:', error);
        }
    };

    return (
        <>
            <div className={style.banner} >
                <div className={style.flex}>

                    <div className='statistic'>
                        <div className={style.new}>New</div>
                        <h2 className={style.title}>104 МЛН за 8 месяцев </h2>
                        <p className={style.subtitle}>В этом видео я раскрыл все секреты и поделился, как мне удалось создать выручку в 104🍋 через Telegram в 2023</p>
                    </div>
                    <Link to='/free/1' onClick={() => {
                        handleView();
                    }}>
                        <button className={style.whatchButton}>Смотреть </button>
                    </Link>
                </div>
                <video className={style.video} autoPlay muted loop playsInline controls={false}>
                    <source src={bunner} type="video/mp4" />
                </video>
                <div className={style.dark}></div>
            </div>
        </>
    )
}

export default Banner
