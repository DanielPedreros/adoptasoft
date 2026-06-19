function MascotaList({ mascotas }) {
  return (
    <div className="ilist">
      {mascotas.map(p => (
        <div className="iitem" key={p.id}>
          <div className="iico">{p.especie.includes('🐈') ? '🐈' : '🐕'}</div>
          <div className="iinfo"><strong>{p.nombre}</strong><span>{`${p.raza || p.especie.replace(/^\S+\s/, '')} · ${p.edad || '—'} · ${p.peso ? `${p.peso} kg` : '—'} · ${p.sexo || '—'}`}</span></div>
        </div>
      ))}
    </div>
  );
}

export default MascotaList;
