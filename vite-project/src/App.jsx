import { useEffect, useState } from "react";

function App() {
  const [livros, setLivros] = useState([]);

  async function loadData() {
        const resposta = await fetch("http://localhost:3000/livros");
       const dados = await resposta.json();
       setLivros(dados);
  };

  async function excluirLivros(id) {
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "DELETE",
    });
    loadData(); 
  }
  async function editarLivros(id) {
    const response = await fetch(`http://localhost:3000/livros/${id}`);
    const livro = await response.json();
  
    
    const titulo = window.prompt("Digite um novo Título:", livro.titulo);
    if (!titulo || titulo === livro.titulo) return; 
  
    await fetch(`http://localhost:3000/livros/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ titulo }),
    });
  
    
    loadData();
  }
  

  useEffect(() => {
      loadData();
  }, []);
  return (
    <div>
      <h1>Livros</h1>

      <table>
        <tbody>
          {livros.map(livro => (
            <tr key={livro.id}>
              <td>{livro.titulo}</td>
              <td>{livro.autor}</td>
              <td>{livro.paginas}</td>
              <td>{livro.categoria}</td>
            
            <button onClick={()=> editarLivros(livro.id)}> Editar</button> 
             <button onClick={() => excluirLivros(livro.id)}>Excluir</button>
            </tr>
            
          ))};
        </tbody>
      </table>
    </div>
  );
}

export default App
