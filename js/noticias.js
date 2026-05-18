var DATA_URL = '/data/posts.json'

function extractFirstImage(html) {
  var div = document.createElement('div')
  div.innerHTML = html
  var img = div.querySelector('img')
  return img ? img.src : '/assets/images/futebol-upscaled.webp'
}

function createSnippet(html, length) {
  var div = document.createElement('div')
  div.innerHTML = html
  var text = div.textContent || div.innerText || ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

function createCardHTML(post, index, isFeatured) {
  var image = extractFirstImage(post.conteudo)
  var snippet = createSnippet(post.conteudo, isFeatured ? 250 : 120)
  var categoryClass = (post.categoria || 'default').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  
  var cardClass = isFeatured ? 'featured-card' : 'news-card'
  var imageClass = isFeatured ? 'featured-image' : 'card-image'
  var contentClass = isFeatured ? 'featured-content' : 'card-content'
  var imgWidth = isFeatured ? '800' : '400'
  var imgHeight = isFeatured ? '400' : '200'

  return [
    '<a href="/pages/postagens?id=' + index + '" class="' + cardClass + '">',
    '  <div class="' + imageClass + '">',
    '    <img src="' + image + '" alt="' + post.titulo + '" width="' + imgWidth + '" height="' + imgHeight + '" loading="lazy">',
    '  </div>',
    '  <div class="' + contentClass + '">',
    '    <span class="badge ' + categoryClass + '">' + (post.categoria || 'Esporte') + '</span>',
    '    <span class="card-date">' + post.data + '</span>',
    '    <h2 class="card-title">' + post.titulo + '</h2>',
    '    <p class="card-snippet">' + snippet + '</p>',
    '  </div>',
    '</a>'
  ].join('\n')
}

function inicia() {
  var featuredContainer = document.getElementById('featured-news')
  var gridContainer = document.getElementById('news-grid')
  
  if (!featuredContainer || !gridContainer) return

  featuredContainer.innerHTML = '<p>Carregando destaques...</p>'

  fetch(DATA_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('Erro ao carregar posts')
      return r.json()
    })
    .then(function (dados) {
      if (!Array.isArray(dados) || dados.length === 0) {
        featuredContainer.innerHTML = '<p>Nenhuma notícia disponível.</p>'
        return
      }

      featuredContainer.innerHTML = createCardHTML(dados[0], 0, true)

      var gridHTML = ''
      for (var i = 1; i < dados.length; i++) {
        if (dados[i].titulo.toLowerCase() === 'teste') continue;
        gridHTML += createCardHTML(dados[i], i, false)
      }
      gridContainer.innerHTML = gridHTML
    })
    .catch(function (err) {
      console.error(err)
      featuredContainer.innerHTML = '<p>Erro ao carregar as notícias.</p>'
    })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicia)
} else {
  inicia()
}
