const pdfs = [
  {
    nome: "CASE 845B",
    arquivo: "pdfs/CASE-845B.pdf",
    categoria: "MAQUINAS",
    descricao: "Material de estudo."
  },

let categoriaAtual = "Todos";

const busca = document.getElementById("busca");
const lista = document.getElementById("lista");
const vazio = document.getElementById("vazio");
const contador = document.getElementById("contador");
const categorias = document.getElementById("categorias");

function montarCategorias(){
  const cats = ["Todos", ...new Set(pdfs.map(p => p.categoria).filter(Boolean))];
  categorias.innerHTML = cats.map(c =>
    `<button class="cat ${c===categoriaAtual?'ativo':''}" onclick="selecionarCategoria('${c.replaceAll("'","\\'")}')">${c}</button>`
  ).join("");
}

function selecionarCategoria(c){
  categoriaAtual=c;
  montarCategorias();
  render();
}

function render(){
  const termo = busca.value.toLowerCase().trim();
  const resultados = pdfs.filter(p => {
    const texto = `${p.nome} ${p.descricao||""} ${p.categoria||""}`.toLowerCase();
    return (categoriaAtual==="Todos" || p.categoria===categoriaAtual) && texto.includes(termo);
  });
  contador.textContent = `${resultados.length} PDF${resultados.length===1?"":"s"}`;
  vazio.hidden = resultados.length !== 0;
  lista.innerHTML = resultados.map(p => `
    <article class="card">
      <div class="icone">📄</div>
      <span class="tag">${p.categoria || "Outros"}</span>
      <h2>${escapeHtml(p.nome)}</h2>
      <p>${escapeHtml(p.descricao || "Documento em PDF.")}</p>
      <div class="acoes">
        <a class="btn ver" href="${p.arquivo}" target="_blank" rel="noopener">Visualizar</a>
        <a class="btn baixar" href="${p.arquivo}" download>Baixar</a>
      </div>
    </article>
  `).join("");
}

function escapeHtml(text){
  return String(text).replace(/[&<>"']/g, m => ({
    "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
  }[m]));
}

busca.addEventListener("input", render);
montarCategorias();
render();