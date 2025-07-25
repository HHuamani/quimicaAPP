import { useState } from 'react';
import API from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [rol, setRol] = useState('estudiante');
  const [error, setError] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setMensaje('');

    try {
      await API.post('/auth/register', {
        nombre,
        apellidos,
        contraseña,
        rol
      });

      setMensaje('✅ Usuario registrado correctamente');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      console.error('❌ Error en registro:', err.response?.data || err.message);
      setError(err.response?.data?.mensaje || 'Error al registrar');
    }
  };

  return (
    <div className="register" style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>Registro de Usuario</h2>
        <form onSubmit={handleRegister} style={styles.form}>
          <input 
            type="text" 
            placeholder="Nombre" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} 
            required 
            style={styles.input} 
          />
          <input 
            type="text" 
            placeholder="Apellidos" 
            value={apellidos} 
            onChange={e => setApellidos(e.target.value)} 
            required 
            style={styles.input} 
          />
          <input 
            type="password" 
            placeholder="Contraseña" 
            value={contraseña} 
            onChange={e => setContraseña(e.target.value)} 
            required 
            style={styles.input} 
          />

          <select 
            value={rol} 
            onChange={e => setRol(e.target.value)} 
            required 
            style={styles.select}
          >
            <option value="admin">Administrador</option>
            <option value="docente">Docente</option>
            <option value="estudiante">Estudiante</option>
          </select>

          <button type="submit" style={styles.button}>Registrar</button>
          
          {mensaje && <p style={styles.success}>{mensaje}</p>}
          {error && <p style={styles.error}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

// Estilos personalizados
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#ffffff',  // Fondo blanco
  },
  card: {
    width: '100%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9e2a0',  // Color dorado suave
  },
  heading: {
    textAlign: 'center',
    marginBottom: '20px',
    color: '#333333',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  select: {
    padding: '12px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#000000',
    color: '#ffffff',
    padding: '12px',
    fontSize: '16px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  success: {
    color: 'green',
    textAlign: 'center',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
};

export default Register;
