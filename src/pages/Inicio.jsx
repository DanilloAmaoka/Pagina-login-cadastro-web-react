import { useNavigate } from 'react-router-dom';

function Inicio() {
  const navigate = useNavigate();

  return (
    <div className="card-projeto">
      <h1>Bem-vindo!</h1>
      <h3>Atividade Somativa 02</h3>
      <button onClick={() => navigate('/login')}>Fazer Login</button>
      <button onClick={() => navigate('/cadastro')}>Criar Conta</button>
    </div>
  );
}

export default Inicio;