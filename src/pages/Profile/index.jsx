import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Container, Form, Avatar } from './styles';
import { FiArrowLeft, FiUser, FiMail, FiLock, FiCamera } from 'react-icons/fi';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';

import avatarPlaceholder from '../../assets/avatar_placeholder.svg';
import { api } from '../../services/api';
import { ButtonText } from '../../components/ButtonText';

export function Profile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [passwordOld, setPasswordOld] = useState();
    const [passwordNew, setPasswordNew] = useState();
    const avatarUrl = user.avatar ? `${api.defaults.baseURL}/files/${user.avatar}` : avatarPlaceholder;
    const [avatar, setAvatar] = useState(avatarUrl);
    const [avatarFile, setAvatarFile] = useState(null);


    async function handleUpdate() {
        const updated = {
            name,
            email,
            password: passwordNew,
            old_password: passwordOld
        }
        const userUpdated = Object.assign(user, updated);

        await updateProfile({ user: userUpdated, avatarFile })
    }
    function handleChangeAvatar(event) {
        const file = event.target.files[0];
        setAvatarFile(file);

        const imagePreview = URL.createObjectURL(file);
        setAvatar(imagePreview);
    }

    return (
        <Container>
            <header><button type='button' onClick={() => navigate(-1)} ><FiArrowLeft /></button></header>
            <Form>
                <Avatar>
                    <img src={avatar} alt='Foto do usuário' />
                    <label htmlFor='avatar'>
                        <FiCamera />
                        <input id='avatar' type='file' onChange={handleChangeAvatar} />
                    </label>
                </Avatar>
                <Input placeholder="Nome" type="text" value={name} onChange={e => setName(e.target.value)} icon={FiUser} />
                <Input placeholder="Email" type="text" value={email} onChange={e => setEmail(e.target.value)} icon={FiMail} />
                <Input placeholder="Senha atual" type="password" onChange={e => setPasswordOld(e.target.value)} icon={FiLock} />
                <Input placeholder="Nova senha" type="password" onChange={e => setPasswordNew(e.target.value)} icon={FiLock} />
                <Button title='salvar' onClick={handleUpdate} />
            </Form>
        </Container>
    )
};
