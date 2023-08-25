import { useState } from "react";
import { Button } from "../../components/Button";
import { Header } from "../../components/Header";
import { Input } from "../../components/Input";
import { NoteItem } from "../../components/NoteItem";
import { Section } from "../../components/Section";
import { Textarea } from "../../components/Textarea";
import { Container, Form } from './styles';
import { useNavigate } from 'react-router-dom';
import { api } from "../../services/api";
import { ButtonText } from '../../components/ButtonText'

export function New() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const [links, setLinks] = useState([]);
    const [newLink, setNewLink] = useState('');

    const [tags, setTags] = useState([]);
    const [newTag, setNewTag] = useState('');

    const navigate = useNavigate();

    function handleAddLink() {
        setLinks(prevState => [...prevState, newLink]);
        setNewLink('');
    }
    function handleRemoveLink(deleted) {
        setLinks(prevState => prevState.filter(link => link !== deleted));
    }

    function handleAddTag() {
        setTags(prevState => [...prevState, newTag]);
        setNewTag('');
    }
    function handleRemoveTag(deleted) {
        setTags(prevState => prevState.filter(tag => tag !== deleted));
    }

    async function handleNewNote() {
        if (!title) {
            return alert('Digite o titulo da nota');
        }
        if (newLink) {
            return alert('Você digitou um link e não a adicionou :(')
        }
        if (newTag) {
            return alert('Você digitou uma tag e não a adicionou :(')
        }

        await api.post('/notes', {
            title,
            description,
            tags,
            links
        })
        alert('Nota criada com sucesso!');
        navigate(-1);
    }

    return (
        <Container>
            <Header />
            <main>
                <Form>
                    <header>
                        <h1>Criar nota</h1>
                        <ButtonText title='Voltar' onClick={() => navigate(-1)} />
                    </header>
                    <Input placeholder="Título" onChange={e => setTitle(e.target.value)} />
                    <Textarea placeholder="Observações" onChange={e => setDescription(e.target.value)} />
                    <Section title='Links úteis' >
                        {links.map((link, index) => (
                            <NoteItem key={String(index)} value={link} onClick={() => handleRemoveLink(link)} />
                        ))}
                        <NoteItem placeholder="Novo link" value={newLink} onChange={e => setNewLink(e.target.value)} onClick={handleAddLink} IsNew />
                    </Section>
                    <Section title='Marcadores' >
                        <div className="tags">
                            {tags.map((tag, index) => (
                                <NoteItem value={tag} key={String(index)} onClick={() => handleRemoveTag(tag)} />
                            ))}
                            <NoteItem placeholder="Nova tag" value={newTag} onChange={e => setNewTag(e.target.value)} onClick={handleAddTag} IsNew />
                        </div>
                    </Section>
                    <Button title="Salvar" onClick={handleNewNote} />
                </Form>
            </main>
        </Container>
    )
};
