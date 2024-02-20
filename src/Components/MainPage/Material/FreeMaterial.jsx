import style from './FreeMaterial.module.css'
import { Link } from 'react-router-dom'
import { Eye } from 'lucide-react';
import url from '../../../url'

function FreeMaterial({ title, data, type }) {
    const appElement = document.querySelector('.app');
    const handleView = async (number) => {
        try {
            const response = await fetch(`${url}/_internal_/send_view_action`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ number, type }),
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
        <div className={style.materials}>
            <h2 className={style.title}>{title}</h2>
            <div className={style.cards}>
                <div className={style.cardBlocks}>
                    {data?.map((item, index) => (
                        <Link className={style.link} key={index} to={`/${type}/${item.link}`} onClick={() => {
                            handleView(item.number);
                        }}>
                            <div className={style.card} style={{ backgroundImage: `url(${item.image})` }}>

                                <div className={style.flex}>
                                    <div className={style.new}>New </div>
                                    <div className={style.views}>
                                        <p>{item.views}</p>
                                        <Eye size={16} strokeWidth={1.25} />
                                    </div>
                                </div>

                                <p className={style.text}>{item.description}</p>
                            </div>
                        </Link>
                    ))}
                    <div className={style.water}></div>
                </div>
            </div>
        </div >
    );
}

export default FreeMaterial
