// Imagens personalizadas dos projetos
const imagensProjetos = {
  "pagina-videos": "img/logo.png",
  "nome-do-repo-2": "img/projeto2.png"
  // Adicione mais: "nome-do-repo": "caminho/da/imagem"
};

// Função para escapar HTML (protege contra XSS)
function escapeHTML(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, function(m) {
    return ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    })[m];
  });
}

// Integração com GitHub
const githubUser = "andrevinnicius";
const container = document.getElementById("github-projects");
const ignorar = ["portfolio"]; // nomes dos repos que quer ocultar

fetch(`https://api.github.com/users/${githubUser}/repos?sort=updated`)
  .then(res => res.json())
  .then(repos => {
    const filtered = repos
      .filter(repo => !repo.fork && !ignorar.includes(repo.name))
      .slice(0, 6);
    container.innerHTML = filtered.map(repo => `
      <div class="projeto">
        <div class="projeto-flex">
          <img src="${imagensProjetos[repo.name] || 'img/default.png'}" alt="Imagem do projeto ${escapeHTML(repo.name)}" class="img-projeto">
          <div class="projeto-info">
            <h3>${escapeHTML(repo.name)}</h3>
            <p>${repo.description ? escapeHTML(repo.description) : "Sem descrição."}</p>
            <div style="display:flex; gap:12px; flex-wrap:wrap;">
              <a href="${repo.html_url}" target="_blank" class="btn-projeto">GitHub</a>
              ${repo.homepage ? 
                `<a href="${repo.homepage}" target="_blank" class="btn-projeto visualizar">Visualizar</a>` : 
                `<a class="btn-projeto visualizar disabled" tabindex="-1" aria-disabled="true" style="pointer-events:none;opacity:0.5;">Visualizar</a>`
              }
            </div>
          </div>
        </div>
      </div>
    `).join('');
  })
  .catch(() => {
    container.innerHTML = "<p>Não foi possível carregar os projetos do GitHub.</p>";
  });

// Fade-in ao carregar
document.querySelectorAll('.fade-in').forEach(el => el.classList.add('visible'));

// Botão Voltar ao Topo
const btn = document.getElementById('backToTop');
if (btn) {
  window.onscroll = function() {
    btn.style.display = window.scrollY > 300 ? "block" : "none";
  };
  btn.onclick = () => window.scrollTo({top:0, behavior:'smooth'});
}