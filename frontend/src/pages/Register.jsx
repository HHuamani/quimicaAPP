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
    <div style={styles.registerBackground}>
      <div style={styles.gridContainer}>
        {/* Elementos químicos */}
        <div style={styles.elementItemBlue}>
          <div style={styles.elementSymbol}>C</div>
          <div style={styles.elementText}>Carbono</div>
        </div>
        <div style={styles.elementItemYellow}>
          <div style={styles.elementSymbol}>Re</div>
          <div style={styles.elementText}>Renio</div>
        </div>
        <div style={styles.elementItemGreen}>
          <div style={styles.elementSymbol}>Ar</div>
          <div style={styles.elementText}>Argón</div>
        </div>
        <div style={styles.elementItemOrange}>
          <div style={styles.elementSymbol}>Cu</div>
          <div style={styles.elementText}>Cobre</div>
        </div>
        <div style={styles.elementItemPink}>
          <div style={styles.elementSymbol}>En</div>
          <div style={styles.elementText}>Etmio</div>
        </div>
        <div style={styles.elementItemPurple}>
          <div style={styles.elementSymbol}>Ts</div>
          <div style={styles.elementText}>Tennessine</div>
        </div>
      </div>

      <div style={styles.registerContainer}>
        <h2>Registro de Usuario</h2>
        <form onSubmit={handleRegister} style={{ width: '100%' }}>
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
            style={styles.input}
          >
            <option value="admin">Administrador</option>
            <option value="docente">Docente</option>
            <option value="estudiante">Estudiante</option>
          </select>

          <button type="submit" style={styles.submitButton}>Registrar</button>

          {mensaje && <p style={{ color: 'green' }}>{mensaje}</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      </div>
    </div>
  );
}

const styles = {
  registerBackground: {
    minHeight: '100vh',
    backgroundImage: 'url("fondo2.jpg")', // Ruta de la imagen de fondo
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingTop: '40px',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)', // 6 columnas de elementos
    gap: '10px', // Espacio entre los cuadros
    position: 'absolute',
    top: '10%',
    left: '5%',
    right: '5%',
    zIndex: 1, // Asegura que los elementos químicos estén sobre el fondo
    maxWidth: '80%',
  },
  elementItem: {
    borderRadius: '8px',
    padding: '10px', // Ajuste del padding para hacer los cuadros más grandes
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: '18px', // Aumento del tamaño de la fuente
  },
  elementSymbol: {
    fontSize: '22px', // Símbolos más grandes
    fontWeight: 'bold',
  },
  elementText: {
    fontSize: '12px', // Nombre del elemento más pequeño
    marginTop: '5px',
  },
  elementItemBlue: {
    backgroundColor: '#b2e0e3',
  },
  elementItemYellow: {
    backgroundColor: '#fbe58b',
  },
  elementItemGreen: {
    backgroundColor: '#b4e3c0',
  },
  elementItemOrange: {
    backgroundColor: '#f0c77b',
  },
  elementItemPink: {
    backgroundColor: '#f4d4ec',
  },
  elementItemPurple: {
    backgroundColor: '#d3b1c6',
  },
  registerContainer: {
    background: 'white',
    borderRadius: '12px',
    padding: '30px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.15)',
    maxWidth: '420px', // Tamaño del formulario
    width: '100%',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: '12px',
    marginBottom: '18px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  submitButton: {
    width: '100%',
    marginTop: '12px',
    padding: '12px',
    fontWeight: 'bold',
    backgroundColor: 'black',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
  },
};

export default Register;
