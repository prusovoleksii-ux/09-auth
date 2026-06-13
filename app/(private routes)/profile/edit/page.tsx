'use client';
import { useEffect, useState } from 'react';
import css from './EditProfilePage.module.css';
import { getMe, updateMe } from '@/lib/api/clientApi';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function EditProfilePage() {
    const router = useRouter();

    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [photoUrl, setPhotoUrl] = useState('');

    useEffect(() => {
        getMe().then((user) => {
            setUserName(user.username ?? '');
            setPhotoUrl(user.avatar ?? '');
            setEmail(user.email ?? '');
        });
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(event.target.value);
    };

    const handleSaveUser = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        await updateMe({ email, username });
        router.push('/profile');
    };
    

    return (
        <main className={css.mainContent}>
            <div className={css.profileCard}>
                <h1 className={css.formTitle}>Edit Profile</h1>

                {photoUrl && (
                    <Image
                        src={photoUrl}
                        alt="User Avatar"
                        width={120}
                        height={120}
                        className={css.avatar}
                    />
                    )}

                <form className={css.profileInfo} onSubmit={handleSaveUser}>
                <div className={css.usernameWrapper}>
                    <label htmlFor="username">Username:</label>
                    <input id="username"
                    type="text"
                    className={css.input}
                    defaultValue={username}
                    onChange={handleChange}
                    />
                </div>

                <p>Email: {email}</p>

                <div className={css.actions}>
                    <button type="submit" className={css.saveButton}>
                    Save
                    </button>
                    <button type="button" className={css.cancelButton}>
                    Cancel
                    </button>
                </div>
                </form>
            </div>
        </main>
    )
}