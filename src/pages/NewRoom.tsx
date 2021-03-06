import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'

import '../assets/styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'


export function NewRoom(){

    const {user} = useAuth();
    const navigate = useNavigate();
    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent){
        event.preventDefault();
        
        if(newRoom.trim() == ''){
            return;
        }

        const roomRef = database.ref('rooms');

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,            
        })

        navigate(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbólica"/>
                <h3>Toda pergunta tem uma resposta.</h3>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className='main-content'>
                    <img src={logoImg} alt="Logo Letmeask"/>                    
                    <h2>Criar uma nova sala</h2>

                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>

                    <p>
                        Quer entrar em uma sala existente? 
                        <Link to='/'>Clique aqui</Link>
                    </p>

                </div>
            </main>
        </div>
    )
}