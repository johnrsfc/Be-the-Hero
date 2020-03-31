import React, { useState, useEffect} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash } from 'react-icons/fi';

import api from '../../services/api';

import logoImg from '../../assets/logo.svg';
import './styles.css';


export default function Profile(){

    const [incidents, setIncidens] = useState([]);

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');


    useEffect(() => {
        api.get('profile', {
            headers:{
                Authorization: ongId,
            }
        }).then(response =>{
            setIncidens(response.data);
        })
    }, [ongId]);

    //FUNCÇÃO PARA DELETAR CASOS
    async function handleDeleteIncident(id){
        try{
        await api.delete(`incidents/${id}`,{
            headers: {
                Authorization: ongId,
            }
        });
        //ATUALIZAR A PAGINA EM TEMPO REAL ASSIM QUE DELETAR UM CASO
        setIncidens(incidents.filter(incident => incident.id !== id));
        }catch(err){
            alert('Erro ao deletar caso,  tente novamente...');
        }
    }

    //FUNÇÃO DE LOGOUT 
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }

return(
    <div className="profile-container">
        <header>
            <img src={logoImg} alt ="Be The Hero"/>
            <span>Bem vindo, {ongName}</span>
                
            <Link className="button" style={{textAlign: "center"}} to="/incidents/new">Cadastrar novo caso</Link>
            <button onClick={handleLogout} type="button">
                <FiPower size={18} color="#E02041"/>
            </button>    
        </header>
        
        <h1>Casos Cadastrados</h1>
        <ul>
           {incidents.map(incident => {
               return(
            <li key={incident.id}>
                <strong>CASO:</strong>
               <p>{incident.title}</p>

                <strong>DESCRIÇÃO</strong>
               <p>{incident.description}</p>

                <strong>VALOR:</strong>
               <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                    <FiTrash size="18" color="#a8a8b3"/>
                </button>    
            </li>
               );
           })}
        </ul>
        

        
    </div>
    );
}