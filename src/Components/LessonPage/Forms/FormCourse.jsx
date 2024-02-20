import { useForm, Controller } from 'react-hook-form';
import { XCircle } from 'lucide-react';
import style from './FormCourse.module.css'
import url from '../../../url'

function FormCourse({ setIsPopupForm, number }) {

    const {
        handleSubmit,
        control,
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
                console.log('Form submitted successfully', requestData);
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
                <form onSubmit={handleSubmit(onSubmit)} className={style.form} >
                    <div className={style.closeBlock}>
                        <h2 className={style.title}>Оставить заявку</h2>
                        <button className={style.close} onClick={() => setIsPopupForm(false)}><XCircle /></button>
                    </div>
                    <input
                        className={style.input}
                        placeholder="ФИО"
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
                        placeholder="Почта"
                        type="email"
                        {...register('email', {
                            required: 'Это поле обязательное',
                            pattern: {
                                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}$/,
                                message: 'Введите корректный адрес почты',
                            },
                        })}
                    />
                    <span className={style.error}>{errors.email?.message}</span>

                    <input
                        className={style.input}
                        placeholder="Телефон"
                        type="tel"
                        {...register('phone', {
                            required: 'Это поле обязательное',
                            pattern: {
                                value: /^((\+7|7|8)+([0-9]){10})$/,
                                message: 'Введите корректный номер телефона РФ',
                            },
                        })}
                    />
                    <span className={style.error}>{errors.phone?.message}</span>

                    <Controller
                        name="who"
                        control={control}
                        defaultValue={'newcomer'}
                        render={({ field }) => (
                            <>
                                <select className={style.input} {...field}>
                                    <option value="newcomer">Новичок</option>
                                    <option value="producer">Продюсер</option>
                                    <option value="expert">Эксперт</option>
                                </select>
                                <span className={style.error}>{errors.role?.message}</span>
                            </>
                        )}
                    />

                    <button className={style.button} type="submit">Отправить</button>
                </form>
            </div>

        </>
    );
}

export default FormCourse
