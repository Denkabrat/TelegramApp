import style from './Footer.module.css'
import logo from '../../../../public/logo.png'
import eight from '../../../../public/eight.png'
function Footer() {

    return (
        <>
            <footer className={style.footer}>
                <img className={style.eightLrft} src={eight} alt="" />
                <div className={style.foterLink}>
                    <p className={style.created}>Created by </p>
                    <img className={style.logoFooter} src={logo} alt="" />
                </div>
                <img className={style.eightRight} src={eight} alt="" />
            </footer>
        </>
    )
}

export default Footer
