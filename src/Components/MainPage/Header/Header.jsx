import style from './Header.module.css'
import avatar from '../../../../public/avatar.png'
import logo from '../../../../public/logoApp.png'
function Header({ user }) {
    return (
        <header className={style.header}>
            <div>

                <img className={style.logo} src={logo} alt="" />
                <p className={style.user}> {user?.user_count} users</p>
            </div>

            <img className={style.avatar} src={user?.photo_url === undefined ? avatar : user.photo_url} alt="" />
        </header>
    )
}

export default Header
