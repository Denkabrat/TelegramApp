import { Link } from "react-router-dom"
import back from '../../../../public/back.png'
import { useState } from "react";
import FormCourse from "../Forms/FormCourse";
import FormMaster from "../Forms/FormMaster";
import style from './HeaderLesson.module.css'
import url from '../../../url'

function HeaderLesson({ card }) {
    const [isPopupVideo, setIsPopupVideo] = useState(false)
    const [isPopupForm, setIsPopupForm] = useState(false)
    const [isPopupFormMaster, setIsPopupFormMaster] = useState(false)

    const handleButtonClick = async () => {
        // Implement the logic based on the button type
        switch (card?.typeButton) {
            case 'whatch':
                setIsPopupVideo(true)
                break;
            case 'take':
                window.open(card?.video, '_blank');
                break;
            case 'form1':
                setIsPopupForm(true)
                break;
            case 'form2':
                setIsPopupFormMaster(true)
                break;
            case 'write':
                // Выполняем POST-запрос
                const response = await fetch(`${url}/_internal_/send_form`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        material_number: card?.number,
                    }),
                });

                if (response.ok) {
                    window.location.href = 'https://t.me/TurlakovTelegram';
                } else {
                    console.error('Error in POST request');
                }
                break;


            case 'buy':
                break;
            default:
                break;
        }
    };
    return (
        <>
            <div className={style.whatch} style={{ backgroundImage: `url(${card?.background})` }}>
                <div className={style.content} >
                    <Link to='/'>
                        <button className={style.backButton}><img src={back} className={style.backButtonImg} alt="" /></button>
                    </Link>
                    <div className={style.info}>
                        <div className={style.statistic}>
                            <div className={style.new}>New</div>
                        </div>
                        <h2 className={style.title}>{card?.description}</h2>
                        <p className={style.subtitle}>{card?.subtitle}</p>
                        <button className={`${style.whatchButton} ${card?.style ? style.disabled : ''}`} disabled={card?.style} onClick={handleButtonClick}>{card?.button}</button>
                    </div>
                </div>
            </div >
            {isPopupVideo && (
                <div className={style.video}>
                    <div
                        className={style.videoOverlay}
                        onClick={() => setIsPopupVideo(false)}
                    />
                    <div className={style.videoContent}>
                        <iframe
                            src={card?.video}
                            title="iframe"
                            width="100%"
                            height="100%"
                            controlsList="nodownload"
                            frameBorder="0"
                            allow="autoplay; fullscreen; picture-in-picture; encrypted-media;"
                            allowFullScreen
                            fullscreen="true"
                        />
                    </div>
                </div>
            )
            }
            {
                isPopupForm && (
                    <FormCourse setIsPopupForm={setIsPopupForm} number={card?.number} />
                )
            }
            {
                isPopupFormMaster && (
                    <FormMaster setIsPopupForm={setIsPopupFormMaster} number={card?.number} />
                )
            }
        </>
    )
}

export default HeaderLesson
