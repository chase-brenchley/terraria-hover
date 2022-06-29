chrome.runtime.onMessage.addListener((req, sender, response) => {
  const { url } = req
  console.log('in background script')
  console.log(req.url)

  if (url.indexOf('wiki') !== -1) {
    console.log('now we fetch some info')

    fetch(url)
      .then(res => {
        // console.log(res)
        res.text().then(text => {
          // const parser = new DOMParser()
          // const doc = parser.parseFromString(text, 'text/html')
          // const recipe = doc.getElementsByClassName('background-1')[0]
          // console.log(recipe)
          response(text)
        })
      })

      // res("sent from background.js")
    return true
  }
})
