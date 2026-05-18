var DATA_URL = '/data/posts.json'

function carregarPost() {
  var titulo    = document.getElementById('titulo')
  var categoria = document.getElementById('categoria')
  var corpo     = document.getElementById('corpo')

  if (!titulo && !categoria && !corpo) return

  var id = new URLSearchParams(window.location.search).get('id')
  if (id === null || isNaN(parseInt(id, 10))) return

  if (titulo) titulo.textContent = 'Carregando...'
  if (corpo)  corpo.textContent  = ''

  fetch(DATA_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('Erro ao carregar posts')
      return r.json()
    })
    .then(function (data) {
      var idx = parseInt(id, 10)
      if (!Array.isArray(data) || idx < 0 || idx >= data.length) {
        throw new Error('Post não encontrado')
      }
      var post = data[idx]
      
      if (titulo) titulo.innerHTML = post.titulo
      
      var badge = document.getElementById('article-badge')
      if (badge) {
        badge.textContent = post.categoria || 'Esporte'
        var categoryClass = (post.categoria || 'default').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        badge.className = 'badge ' + categoryClass
      }

      var dateEl = document.getElementById('article-date')
      if (dateEl) dateEl.textContent = post.data || ''

      if (corpo) corpo.innerHTML = post.conteudo
      document.title = post.titulo + ' - Blog de Esportes'
    })
    .catch(function () {
      if (titulo) titulo.textContent = 'NOTÍCIA NÃO ENCONTRADA'
      if (corpo)  corpo.textContent  = 'Retorne para a página principal ou contate o suporte do nosso site.'
    })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', carregarPost)
} else {
  carregarPost()
}
