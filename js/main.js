const ajax = (url = '', fn, method = 'GET', data = null) => {
    if (!url || !fn) return;
    const req = new XMLHttpRequest()
    req.onreadystatechange = fn;
    req.open(method, url, true);
    req.send(data)
};

const links = document.querySelectorAll(".ajax_el");

const loadHtmlContent = (e) => {
    e.stopPropagation();
    e.preventDefault();
    ajax(e.currentTarget.getAttribute("data-url"), (datas)=>{
        if(datas.target.readyState !== 4 || datas.target.status !== 200) return;
        document.querySelector(".content_ajax").innerHTML = datas.target.responseText;
    });
    document.querySelectorAll(".pro__pro__img").forEach(element => element.classList.remove("active"));
    e.target.classList.add("active");
};

links.forEach((link)=>{
    link.addEventListener("click", loadHtmlContent, false)
});

function splitWords() {
    let quote = document.querySelector("blockquote q");
    quote.innerText.replace(/(<([^>]+)>)/ig,"");
    quotewords = quote.innerText.split(" "),
        wordCount = quotewords.length;
    quote.innerHTML = "";
    for (let i=0; i < wordCount; i++) {
        quote.innerHTML += "<span>"+quotewords[i]+"</span>";
        if (i < quotewords.length - 1) {
            quote.innerHTML += " ";
        }
    }
    quotewords = document.querySelectorAll("blockquote q span");
    fadeWords(quotewords);
}

function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

function fadeWords(quotewords) {
    Array.prototype.forEach.call(quotewords, function(word) {
        let animate = word.animate([{
                opacity: 0,
                filter: "blur("+getRandom(2,5)+"px)"
            }, {
                opacity: 1,
                filter: "blur(0px)"
            }],
            {
                duration: 1000,
                delay: getRandom(800,3300),
                fill: 'forwards'
            }
        )
    })
}


splitWords();
