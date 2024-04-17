import React, { useState } from 'react';
import './App.css'

// Componente de inicio de sesión
const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Lógica de autenticación aquí
    // Aquí puedes verificar si el usuario y la contraseña son correctos
    // Por ahora, solo comprobamos si se ingresaron credenciales
    if (username=="admin" && password==1234) {
      onLogin(username);
    } else {
      alert('Por favor ingrese usuario y contraseña');
    }
  };

  return (
    <div className='formulario'>
      <h2 className='titulo'>Iniciar Sesión</h2>
      <input type="text" placeholder="Usuario" value={username} onChange={(e) => setUsername(e.target.value)} className='usuario'/>
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} className='contrasena'/>
      <button onClick={handleLogin} className='boton'>Iniciar Sesión</button>
    </div>
  );
};

// Componente principal de la aplicación
const App = () => {
  const [currentUser, setCurrentUser] = useState(null); // Almacena el usuario actualmente conectado
  const [students, setStudents] = useState([]); // Almacena la lista de estudiantes
  const [filterCriteria, setFilterCriteria] = useState('all'); // Almacena el criterio de filtrado
  const [searchText, setSearchText] = useState(''); // Almacena el texto de búsqueda

  // Función para manejar el inicio de sesión
  const handleLogin = (username) => {
    // Aquí podrías implementar la lógica de autenticación
    // Por ahora, simplemente establecemos el usuario actual
    setCurrentUser(username);
  };

  // Función para registrar un nuevo estudiante
  const handleRegisterStudent = (student) => {
    setStudents([...students, student]);
  };

  // Función para filtrar estudiantes
  const filterStudents = () => {
    let filteredStudents = students;

    // Aplicar filtro
    if (filterCriteria === 'passed') {
      filteredStudents = filteredStudents.filter(student => student.finalGrade >= 3.0);
    } else if (filterCriteria === 'failed') {
      filteredStudents = filteredStudents.filter(student => student.finalGrade < 3.0);
    } else if (filterCriteria !== 'all') {
      filteredStudents = filteredStudents.filter(student => student.document === filterCriteria);
    }

    // Aplicar búsqueda
    if (searchText) {
      filteredStudents = filteredStudents.filter(student =>
        student.name.toLowerCase().includes(searchText.toLowerCase()) ||
        student.document.toLowerCase().includes(searchText.toLowerCase()) ||
        student.phone.includes(searchText)
      );
    }

    return filteredStudents;
  };

  // Función para buscar si un estudiante existe en la lista
  const findStudent = (document) => {
    return students.find(student => student.document === document);
  };

  // Función para verificar si al menos un estudiante cumple con cierto criterio
  const someStudents = () => {
    return students.some(student => student.finalGrade >= 3.0);
  };

  // Si no hay usuario conectado, mostrar el formulario de inicio de sesión
  if (!currentUser) {
    return <LoginForm onLogin={handleLogin} />;
  }

  // Si el usuario está conectado, mostrar la aplicación principal
  return (
    <div className='contenido'>
      <h1 className='n'>Bienvenido, {currentUser}!</h1>
      <StudentForm onRegister={handleRegisterStudent} />
      <FilterForm onChange={(criteria) => setFilterCriteria(criteria)} />
      <SearchForm onChange={(text) => setSearchText(text)} />
      <StudentList students={filterStudents()} />
    </div>
  );
};

// Componente para el formulario de registro de estudiante
const StudentForm = ({ onRegister }) => {
  const [name, setName] = useState('');
  const [document, setDocument] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [email, setEmail] = useState('');
  const [finalGrade, setFinalGrade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const student = {
      name,
      document,
      phone,
      address,
      email,
      finalGrade,
    };
    onRegister(student);
    setName('');
    setDocument('');
    setPhone('');
    setAddress('');
    setEmail('');
    setFinalGrade('');
  };

  return (
    <div>
      <h2 className='n2'>Registrar Estudiante</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre" value={name} onChange={(e) => setName(e.target.value)} className='nombre' />
        <input type="text" placeholder="Documento" value={document} onChange={(e) => setDocument(e.target.value)} className='documento'/>
        <input type="text" placeholder="Teléfono" value={phone} onChange={(e) => setPhone(e.target.value)} className='tel'/>
        <input type="text" placeholder="Dirección" value={address} onChange={(e) => setAddress(e.target.value)} className='dir'/>
        <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} className='correo'/>
        <input type="number" placeholder="Nota Final" value={finalGrade} onChange={(e) => setFinalGrade(e.target.value)} className='notaf'/>
        <button type="submit" className='boton'>Registrar</button>
      </form>
    </div>
  );
};

// Componente para el formulario de filtro
const FilterForm = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <h2>Filtrar Estudiantes</h2>
      <select onChange={handleChange}>
        <option value="all">Mostrar Todos</option>
        <option value="passed">Mostrar Aprobados</option>
        <option value="failed">Mostrar Reprobados</option>
        <option value="document">Filtrar por Documento</option>
      </select>
    </div>
  );
};

// Componente para el formulario de búsqueda
const SearchForm = ({ onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div>
      <h2>Buscar Estudiante</h2>
      <input type="text" placeholder="Buscar..." onChange={handleChange} />
    </div>
  );
};

// Componente para mostrar la lista de estudiantes
const StudentList = ({ students }) => {
  return (
    <div>
      <h2>Lista de Estudiantes</h2>
      <ul>
        {students.map((student, index) => (
          <li key={index}>
            <strong>{student.name}</strong> - Documento: {student.document}, Nota Final: {student.finalGrade}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;