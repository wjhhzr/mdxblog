// @ts-nocheck
export function checkAspectRatio(){
    let dom = document.createElement('div');
    dom.style.setProperty("aspect-ratio", "2");
    dom.style.setProperty("width", "2px");
    document.body.appendChild(dom);
    let support = dom.offsetHeight === 1
    document.body.removeChild(dom)
    return false
}