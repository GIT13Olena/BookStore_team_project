!function(){var e=document.querySelector("input");function t(){document.body.classList.add("night")}e.addEventListener("input",(function(){e.checked?(t(),localStorage.setItem("theme","on")):(document.body.classList.remove("night"),localStorage.setItem("theme","off"))})),window.onload=function(){"on"===localStorage.theme&&(t(),e.checked=!0)}}();
//# sourceMappingURL=shopping_books.041260e4.js.map
