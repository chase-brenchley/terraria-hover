let currentTable = null

document.body.addEventListener("mouseover", (e) => {
  if (!(e.target && e.target.href && e.target.href.indexOf('wiki') !== -1)) {
    return
  }

  chrome.runtime.sendMessage({ url: e.target.href }, (res) => {
    console.log('getting response back')
    const { text } = res
    const url = new URL(res.url)
    // console.log(res)
    
    const parser = new DOMParser()
    const doc = parser.parseFromString(text, 'text/html')
    const recipe = doc.getElementsByClassName('background-1')[0] || doc.querySelector('table.crafts')
    
    if (!recipe) {
      return
    }

    if (currentTable && currentTable.remove) {
      currentTable.remove()
    }

    for (const img of recipe.querySelectorAll('img')) {
      if (img.getAttribute('src').indexOf('http://') !== -1 || img.getAttribute('src').indexOf('https://') !== -1) {
        continue
      }

      const imgUrl = new URL(img.src)
      let newUrl = new URL(url)
      newUrl.pathname = imgUrl.pathname
      img.src = newUrl
    }
    
    currentTable = recipe
    const { top, left } = e.target.getBoundingClientRect()

    recipe.style['position'] = 'absolute'
    recipe.style['top'] = `${window.scrollY + top + 75}px`
    recipe.style['left'] = `${window.scrollX + left}px`

    document.body.append(recipe)
  })
})

document.body.addEventListener("mouseout", (e) => {
  if (currentTable && currentTable.remove) {
    currentTable.remove()
  }

  currentTable = null
})
