import { useState } from 'react';
import { Link } from 'react-router-dom';

function Cadastro() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [dataNasc, setDataNasc] = useState('');

  const handleCadastro = (e) => {
    e.preventDefault();
    console.log("Dados para cadastrar:", { email, senha, nome, sobrenome, dataNasc });
    // Aqui vai entrar a lógica do Firebase no próximo passo
  };

  return (
    <div className="container-central">
      <div className="card-projeto">
        <h2 style={{ marginBottom: '20px', color: '#333'}}>Criar Conta</h2>
        
        <form onSubmit={handleCadastro} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input type="text" placeholder="Nome" onChange={(e) => setNome(e.target.value)} required style={inputStyle} />
          <input type="text" placeholder="Sobrenome" onChange={(e) => setSobrenome(e.target.value)} required style={inputStyle} />
          <input type="date" onChange={(e) => setDataNasc(e.target.value)} required style={inputStyle} />
          <input type="email" placeholder="E-mail" onChange={(e) => setEmail(e.target.value)} required style={inputStyle} />
          <input type="password" placeholder="Senha" onChange={(e) => setSenha(e.target.value)} required style={inputStyle} />
          
          <button type="submit">Finalizar Cadastro</button>
        </form>
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