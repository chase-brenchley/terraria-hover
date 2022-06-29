chrome.runtime.onMessage.addListener((req, sender, response) => {
  const { url } = req

  if (url.indexOf('wiki') !== -1) {

    fetch(url)
      .then(res => {
        const url = res.url

        res.text().then(text => {
          response({ text, url })
        })
      })

    return true
  }
})
