var DATA_URL = '/data/posts.json'

var urlParams = new URLSearchParams(window.location.search)
var id = urlParams.get('id')

if (id !== null) {
  var idx = parseInt(id, 10)
  fetch(DATA_URL)
    .then(function (r) { return r.json() })
    .then(function (data) {
      var tituloPost = Array.isArray(data) && data[idx] ? data[idx].titulo : ''
      var confirmar = confirm('Tem certeza que deseja apagar esta postagem?\n' + tituloPost)

      if (confirmar) {
        if (Array.isArray(data)) data.splice(idx, 1)
        var blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
        var url  = URL.createObjectURL(blob)
        var a    = document.createElement('a')
        a.href     = url
        a.download = 'posts.json'
        a.click()
        URL.revokeObjectURL(url)
        alert('posts.json atualizado baixado!\nSubstitua o arquivo em data/posts.json no projeto e faça redeploy.')
      }
      window.location = '/adm/delete'
    })
    .catch(function (err) { console.error(err) })
}

function inicia() {
  var container = document.getElementById('divNoticias')
  if (!container) return

  fetch(DATA_URL)
    .then(function (r) { return r.json() })
    .then(function (dados) {
      if (!Array.isArray(dados)) return

      for (var i = 0; i < dados.length; i++) {
        var titulo = document.createElement('h3')
        titulo.innerHTML =
          '<a href="/pages/postagens?id=' + i + '">' + dados[i].titulo + '</a>'

        var botao = document.createElement('button')
        botao.innerHTML = '<a href="/adm/delete?id=' + i + '">APAGAR</a>'

        var hr = document.createElement('hr')

        container.appendChild(titulo)
        container.appendChild(botao)
        container.appendChild(hr)
      }
    })
    .catch(function (err) { console.error(err) })
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', inicia)
} else {
  inicia()
}
