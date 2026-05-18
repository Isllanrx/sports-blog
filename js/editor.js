var DATA_URL = '/data/posts.json'

window.addEventListener('load', function () {
  document.querySelector('.text-zone').setAttribute('contenteditable', 'true')
  document.querySelector('.text-zone').focus()
})

function format(command, value) {
  document.execCommand(command, false, value)
}

function link() {
  var url = window.prompt('Digite a URL')
  document.execCommand('createLink', false, url)
}

function quote() {
  var selectedText = document.getSelection()
  document.execCommand('insertText', false, '"' + selectedText + '"')
}

function Postar() {
  if (!validaPost()) return

  var btn = document.querySelector('button#b_postar')
  btn.disabled = true
  btn.textContent = 'Processando...'

  fetch(DATA_URL)
    .then(function (r) {
      if (!r.ok) throw new Error('Não foi possível ler posts.json')
      return r.json()
    })
    .then(function (data) {
      var posts = Array.isArray(data) ? data.slice() : []

      var date = new Date()
      var dia  = String(date.getDate()).padStart(2, '0')
      var mes  = String(date.getMonth() + 1).padStart(2, '0')
      var ano  = date.getFullYear()

      posts.push({
        data:      dia + '/' + mes + '/' + ano,
        titulo:    document.getElementById('titulo').value,
        categoria: document.getElementById('categoria').value,
        conteudo:  document.querySelector('.text-zone').innerHTML
      })

      var blob = new Blob([JSON.stringify(posts, null, 2)], { type: 'application/json' })
      var url  = URL.createObjectURL(blob)
      var a    = document.createElement('a')
      a.href     = url
      a.download = 'posts.json'
      a.click()
      URL.revokeObjectURL(url)

      alert('posts.json baixado!\nSubstitua o arquivo em data/posts.json no projeto e faça redeploy.')
      btn.disabled    = false
      btn.textContent = 'Postar!'
    })
    .catch(function (err) {
      alert('Erro: ' + err.message)
      btn.disabled    = false
      btn.textContent = 'Postar!'
    })
}

function validaPost() {
  if (
    document.getElementById('titulo').value &&
    document.querySelector('.text-zone').innerText.trim() &&
    document.getElementById('categoria').value
  ) {
    return true
  }
  alert('O título, o corpo e a categoria do post precisam estar preenchidos.')
  return false
}
