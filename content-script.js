console.log('in content script')

const anchors = document.getElementsByTagName('a')

for (const anchor of anchors) {
  anchor.addEventListener("mouseover", (e) => {
    console.log('you hovered over me')
    console.log(e.target)

    chrome.runtime.sendMessage({ url: e.target.href }, (res) => {
      console.log('getting response back')
      // console.log(res)

      const parser = new DOMParser()
      const doc = parser.parseFromString(res, 'text/html')
      const recipe = doc.getElementsByClassName('background-1')[0]
      recipe.style = recipe.style['position'] = 'absolute'
      document.body.append(recipe)
      // document.getElementById('firstHeading').append(recipe)
      console.log(recipe)
    })
  })
}
