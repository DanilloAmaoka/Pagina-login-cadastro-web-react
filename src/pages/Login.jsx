import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // Tenta logar o usuário
            await signInWithEmailAndPassword(auth, email, senha);
            
            setMensagem("sucesso");
            
            // Redireciona para a tela principal após 1.5 segundos
            setTimeout(() => {
                navigate('/principal'); 
            }, 1500);

        } catch (error) {
            let mensagemAmigavel = "";

            // Tratamento de erros específicos para Login
            switch (error.code) {
                case 'auth/user-not-found':
                case 'auth/wrong-password':
                case 'auth/invalid-credential':
                    mensagemAmigavel = "E-mail ou senha incorretos.";
                    break;
                case 'auth/invalid-email':
                    mensagemAmigavel = "O formato do e-mail é inválido.";
                    break;
                case 'auth/user-disabled':
                    mensagemAmigavel = "Esta conta foi desativada.";
                    break;
                default:
                    mensagemAmigavel = "Erro ao entrar. Tente novamente mais tarde.";
            }
            setMensagem(mensagemAmigavel);
        }
    };

    return (
        <div className="container-central">
            <div className="card-projeto">
                <h2 style={{ marginBottom: '20px', color: '#333' }}>Entrar</h2>
                
                <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input 
                        type="email" 
                        placeholder="E-mail" 
                        onChange={(e) => setEmail(e.target.value)} 
                        required 
                        style={inputStyle} 
                    />
                    <input 
                        type="password" 
                        placeholder="Senha" 
                        onChange={(e) => setSenha(e.target.value)} 
                        required 
                        style={inputStyle} 
                    />
                    
                    <button type="submit">Entrar no Sistema</button>
                </form>

                {mensagem && (
                    <p className={`mensagem ${mensagem.includes("sucesso") ? "sucesso" : "erro"}`}>
                        {mensagem === "sucesso" ? "Login realizado! Entrando..." : mensagem}
                    </p>
                )}

                <Link to="/" style={linkStyle}>
                    Voltar para o Início
                </Link>
            </div>
        </div>
    );
}

// Aproveitando seus estilos
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

export default Login;