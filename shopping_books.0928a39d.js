const e=document.querySelector("input");function t(){document.body.classList.add("night")}e.addEventListener("input",(()=>{e.checked?(t(),localStorage.setItem("theme","on")):(document.body.classList.remove("night"),localStorage.setItem("theme","off"))})),window.onload=()=>{"on"===localStorage.theme&&(t(),e.checked=!0)};
//# sourceMappingURL=shopping_books.0928a39d.js.map
