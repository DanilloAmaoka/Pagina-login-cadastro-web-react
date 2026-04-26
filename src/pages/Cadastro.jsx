import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Adicionado useNavigate
import { auth, db } from '../services/firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Cadastro() {
const [email, setEmail] = useState('');
const [senha, setSenha] = useState('');
const [nome, setNome] = useState('');
const [sobrenome, setSobrenome] = useState('');
const [dataNasc, setDataNasc] = useState('');
const [mensagem, setMensagem] = useState("");

const navigate = useNavigate(); // Inicializa o navegador

const handleCadastro = async (e) => {
    e.preventDefault();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        await setDoc(doc(db, "usuarios", user.uid), {
            nome: nome,
            sobrenome: sobrenome,
            dataNascimento: dataNasc,
            email: email,
            uid: user.uid
        });

        setMensagem("sucesso");

        setTimeout(() => {
            navigate('/principal');
        }, 2000);

    } catch (error) {
        let mensagemAmigavel = "";

        switch (error.code) {
            case 'auth/email-already-in-use':
                mensagemAmigavel = "Este e-mail já está sendo usado por outra conta.";
                break;
            case 'auth/invalid-email':
                mensagemAmigavel = "O endereço de e-mail não é válido.";
                break;
            case 'auth/weak-password':
                mensagemAmigavel = "A senha é muito fraca. Digite pelo menos 6 caracteres.";
                break;
            case 'auth/network-request-failed':
                mensagemAmigavel = "Falha na conexão. Verifique sua internet.";
                break;
            default:
                mensagemAmigavel = "Ocorreu um erro inesperado. Tente novamente.";
        }
        setMensagem(mensagemAmigavel);
    }
};

return (
    <div className="container-central">
        <div className="card-projeto">
            <h2 style={{ marginBottom: '20px', color: '#333' }}>Criar Conta</h2>

            <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} required style={inputStyle} />
                <input type="text" placeholder="Sobrenome" onChange={(e) => setSobrenome(e.target.value)} required style={inputStyle} />
                <input type="date" onChange={(e) => setDataNasc(e.target.value)} required style={inputStyle} />
                <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
                <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required style={inputStyle} />

                <button type="submit">Finalizar Cadastro</button>
            </form>

            {mensagem && (
                <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
                    {mensagem === "sucesso" ? "Cadastro realizado com sucesso! Redirecionando..." : mensagem}
                </p>
            )}

            <Link to="/" style={linkStyle}>
                Voltar para o Início
            </Link>
        </div>
    </div>
);
}

const inputStyle = {
padding: '12px',
borderRadius: '8px',
border: '1px solid #ccc',
fontSize: '16px'
};

const linkStyle = {
display: 'block',
marginTop: '15px',
color: '#666',
textDecoration: 'none',
fontSize: '14px',
cursor: 'pointer'
};

export default Cadastro;