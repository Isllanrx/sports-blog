document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault()
  var form = this
  var inputs = form.querySelectorAll('input, textarea')
  var valid = true
  inputs.forEach(function (el) {
    if (!el.value.trim()) valid = false
  })
  if (!valid) return
  form.querySelector('button[type="submit"]').disabled = true
  document.getElementById('contact-success').hidden = false
  form.reset()
  setTimeout(function () {
    form.querySelector('button[type="submit"]').disabled = false
    document.getElementById('contact-success').hidden = true
  }, 5000)
})
