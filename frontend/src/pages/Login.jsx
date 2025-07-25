import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../services/api';

function Login() {
  const [nombre, setNombre] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!nombre.trim() || !contraseña.trim()) {
      setError('Completa todos los campos');
      return;
    }

    try {
      const res = await API.post('/auth/login', {
        nombre: nombre.trim(),
        contraseña: contraseña.trim()
      });

      const token = res.data.token;
      localStorage.setItem('token', token);
      console.log('🔐 Token JWT recibido:', token);

      navigate('/dashboard');
    } catch (err) {
      console.error('❌ Error en login:', err.response?.data || err.message);
      const mensaje = err.response?.data?.error || 'Error de conexión';
      setError(mensaje);
    }
  };

  return (
    <div className="container" style={{ backgroundColor: '#ffffff' }}>
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow-sm border-0 mt-5" style={{ borderRadius: '16px' }}>
            <div className="card-body p-5" style={{ backgroundColor: '#f9d71c' }}>
              <div className="text-center mb-4">
                {/* Cambia la ruta de la imagen aquí */}
                <img 
                  src="user2.png"  // Ruta de la imagen
                  alt="Logo" 
                  className="mb-3" 
                  style={{ width: '72px' }}  // Ajuste el tamaño del logo
                />
                <h2 className="h4" style={{ color: '#333333' }}>Iniciar sesión</h2>
                <p className="text-muted">Usa tu cuenta de la institución</p>
              </div>

              <form onSubmit={handleLogin} className="mb-4">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="nombre"
                    value={nombre}
                    onChange={e => setNombre(e.target.value)}
                    required
                    className="form-control form-control-lg"
                    style={{ borderRadius: '4px', padding: '12px' }}
                  />
                </div>
                <div className="mb-4">
                  <input
                    type="password"
                    placeholder="dni"
                    value={contraseña}
                    onChange={e => setContraseña(e.target.value)}
                    required
                    className="form-control form-control-lg"
                    style={{ borderRadius: '4px', padding: '12px' }}
                  />
                </div>

                {error && (
                  <div className="alert alert-danger mb-3">
                    {error}
                  </div>
                )}

                <div className="d-grid gap-2">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg"
                    style={{
                      backgroundColor: '#000000',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '10px',
                      fontWeight: '500',
                      textTransform: 'none'
                    }}
                  >
                    Siguiente
                  </button>
                </div>
              </form>

              <div className="text-center pt-3">
                <p className="text-muted mb-2">¿No tienes una cuenta?</p>
                <Link 
                  to="/register" 
                  className="btn btn-outline-primary"
                  style={{
                    borderRadius: '4px',
                    fontWeight: '500',
                    color: '#1a73e8',
                    borderColor: '#1a73e8'
                  }}
                >
                  Crear cuenta
                </Link>
              </div>
            </div>
          </div>

          <div className="text-center mt-4">
            <p className="text-muted small" style={{ color: '#333333' }}>
              © {new Date().getFullYear()} IE VICTORIA ABANCAY, Todos los derechos reservados
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
