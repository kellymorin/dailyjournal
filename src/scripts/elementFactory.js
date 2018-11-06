// ElementFactory.js: Loop over provided information and create HTML element that can be displayed in the DOM

const makeElement = {
  elementFactory: (el, attributesObj, content, ...children)=>{
    let element = document.createElement(el)
    // Set Attributes
    for (let attr in attributesObj){
      element.setAttribute(attr, attributesObj[attr])
    }
    element.textContent = content || null
    children.forEach(child => {
      element.appendChild(child)
    })
    return element;
  },
}
export default makeElement