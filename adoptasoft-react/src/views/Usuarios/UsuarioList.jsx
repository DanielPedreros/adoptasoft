function UsuarioList({ usuarios }) {
  return (
    <div className="ilist">
      {usuarios.map(user => (
        <div className="iitem" key={user.id}>
          <div className="iico">{user.role === 'vet' ? '🩺' : user.role === 'admin' ? '🛡️' : '👤'}</div>
          <div className="iinfo"><strong>{user.nombre}</strong><span>{user.email} · {user.documento}</span></div>
          <span className={`ibadge ${user.role === 'vet' ? 'blue' : user.role === 'admin' ? 'green' : ''}`}>{user.role}</span>
        </div>
      ))}
    </div>
  );
}

export default UsuarioList;
