import { useEffect, useState } from 'react';
import { auth, db } from '../services/firebaseConfig';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function Principal() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            try {
                if (user) {
                    const docRef = doc(db, "usuarios", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        setUserData(docSnap.data());
                    } else {
                        console.log("Documento não encontrado!");
                    }
                } else {
                    navigate('/');
                }
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, [navigate]);

    const handleLogout = () => {
        signOut(auth);
    };

    if (loading) {
        return <div className="container-central"><p style={{color: 'white'}}>Carregando...</p></div>;
    }

    return (
        <div className="container-central">
            <div className="card-projeto" style={{ textAlign: 'center' }}>
                <h2 style={{ textAlign: 'left' }}>Página Principal</h2>
                
                {userData ? (
                    <div style={{ margin: '20px 0', textAlign: 'left' }}>
                        <p><strong>Nome:</strong> {userData.nome}</p>
                        <p><strong>Sobrenome:</strong> {userData.sobrenome}</p>
                        <p><strong>E-mail:</strong> {userData.email}</p>
                        <p><strong>Data de Nasc.:</strong> {userData.dataNascimento}</p>
                    </div>
                ) : (
                    <p>Erro ao carregar dados do usuário.</p>
                )}

                <button 
                    onClick={handleLogout} 
                    style={{ backgroundColor: '#d93025', marginTop: '20px' }}
                >
                    Voltar ao Início
                </button>
            </div>
        </div>
    );
}

export default Principal;