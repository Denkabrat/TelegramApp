import { useForm, Controller } from 'react-hook-form';
import { XCircle } from 'lucide-react';
import style from './FormCourse.module.css'
import url from '../../../url'

function FormMaster({ setIsPopupForm, number }) {

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const requestData = { ...data, material_number: number };
            const response = await fetch(`${url}/_internal_/send_form`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestData),
            });

            if (response.ok) {
                console.log('Form submitted successfully');
                setIsPopupForm(false)
            } else {
                console.error('Error submitting form');
                // Дополнительные действия в случае ошибки
            }
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };



    return (
        <>
            <div className={style.containerForm}>
                <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
                    <div className={style.closeBlock}>
                        <h2 className={style.title}>Оставить заявку</h2>
                        <button className={style.close} onClick={() => setIsPopupForm(false)}>
                            <XCircle />
                        </button>
                    </div>
                    <div className={style.inputs}>

                        <input
                            className={style.input}
                            placeholder="Ваше имя и фамилия"
                            type="text"
                            {...register('name', {
                                required: 'Это поле обязательное',
                                pattern: {
                                    value: /^[A-Za-zА-Яа-яЁё\s]+$/,
                                    message: 'Введите только буквы и пробелы',
                                },
                            })}
                        />
                        <span className={style.error}>{errors.name?.message}</span>
                        <input
                            className={style.input}
                            placeholder="Ссылка на ваш аккаунт в Instagram"
                            type="text"
                            {...register('inst', {
                                required: 'Это поле обязательное',

                            })}
                        />
                        <span className={style.error}>{errors.inst?.message}</span>
                        <input
                            className={style.input}
                            placeholder="Напишите ваш ник в Telegram"
                            type="text"
                            {...register('tg_username', {
                                required: 'Это поле обязательное',
                            })}
                        />
                        <span className={style.error}>{errors.tg_username?.message}</span>
                        <textarea
                            className={`${style.input} ${style.textarea}`}
                            placeholder="Кто вы и чем занимаетесь сейчас? Коротко опишите вашу основную сферу деятельности. Прикрепите ссылки на сайты вашего проекта и аккаунты в социальных сетях, если это необходимо."
                            {...register('job', {
                                required: 'Это поле обязательное',

                            })}
                        />
                        <span className={style.error}>{errors.job?.message}</span>
                        <input
                            className={style.input}
                            placeholder="Ваш текущий уровень дохода"
                            type="text"
                            {...register('salary', {
                                required: 'Это поле обязательное',

                            })}
                        />
                        <span className={style.error}>{errors.salary?.message}</span>
                        <textarea
                            className={`${style.input} ${style.textarea}`}
                            placeholder="Какие главные запросы у вас на личную работу со мной и в каких сферах вы хотите совершить прорыв? Пожалуйста, кратко опишите главные цели, над которыми мы будем с вами работать."
                            {...register('query', {
                                required: 'Это поле обязательное',

                            })}
                        />
                        <span className={style.error}>{errors.query?.message}</span>

                        <button className={style.button} type="submit">
                            Отправить
                        </button>
                    </div>
                </form>
            </div>;

        </>
    );
}

export default FormMaster
