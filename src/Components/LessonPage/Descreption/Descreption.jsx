import style from './Descreption.module.css'

function Descreption({ card }) {

    return (
        <div className='descreptionBlock'>
            <h2 className={style.descreption}>{card?.titleText}</h2>
            <div className={style.sub} dangerouslySetInnerHTML={{ __html: card?.text }} />
        </div>
    )
}

export default Descreption
