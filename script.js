const container = document.querySelector("main");
const popupBlock = document.querySelector(".popup-wrapper");

popupBlock.querySelector(".popup__close").addEventListener("click", function() {
	popupBlock.classList.remove("active");
});

document.querySelector("#add").addEventListener("click", function(e) {
	e.preventDefault();
	popupBlock.classList.add("active");
});

const addForm = document.forms.addForm;

const createCard = function(cat, parent) {
    const card = document.createElement("div");
    card.className = "card";
    
    const img = document.createElement("div");
    img.className = "card-pic";
    if (cat.img_link) {
          img.style.backgroundImage = `url(${cat.img_link})`;  
    } else {
        img.style.backgroundImage = "url(img/no.png)";
        img.style.backgroundSize = "contain";
        img.style.backgroundColor = "transparent";
    }

    const name = document.createElement("h3");
    name.innerText = cat.name;

	let like = "";
	like.onclick = () => {
		//....
		// cat.id
	}

	card.append(img, name);
	parent.append(card);
}

createCard({name: "Игорь", img_link: ""}, container);

//createCard({name: "Володя"}, container);

/*
createCard({name: "Вася", img_link: "https://img.staticdj.com/84d3a5171dc51ed178078a611fda24dc.jpeg"}, container);

createCard({name: "Петя", img_link: "http://www.almazfea.com/upload/items/865.jpg"}, container);

createCard({name: "Федя", img_link: "https://kotmastak.ru/wp-content/uploads/7/3/f/73f49ab5eaa10264babd707466f24946.jpeg"}, container);

createCard({name: "Миша", img_link: "https://koteiki.net/wp-content/uploads/2019/03/Cats_Paws_Glance_449274_3840x2400.jpg"}, container);

createCard({name: "Гриша", img_link: "https://oir.mobi/uploads/posts/2021-05/1620667720_55-oir_mobi-p-yevropeiskaya-korotkosherstnaya-koshka-riz-62.jpg"}, container);
*/

fetch("https://sb-cats.herokuapp.com/api/2/KhmKaM/show")
    .then(res => res.json())
    .then(result => {
        //console.log(result);
            if (result.message === "ok") {
                console.log(result.data);
                result.data.forEach(function(el) {
                    createCard(el, container);
                })
            }
    })

/*    const cat = {
    id: 10,
    name: "Чуча",
    img_link: "https://avatanplus.com/files/resources/original/5c23a3e243fb3167eb382be6.png"
}
*/

const addCat = function() {
	fetch("https://sb-cats.herokuapp.com/api/2/KhmKaM/add", {
		method: "POST",
		headers: { // обязательно для POST/PUT/PATCH
			"Content-Type": "application/json"
		},
		body: JSON.stringify(cat) // обязательно для POST/PUT/PATCH
/*        get body() {
            return this._body;
        },
        set body(value) {
            this._body = value;
        },*/
	})
		.then(res => res.json())
		.then(data => {
            console.log(data);
			if (data.message === "ok") {
				createCard(cat, container);
                addForm.reset();
				popupBlock.classList.remove("active");
			}
		})
}

addForm.addEventListener("submit", function(e) {
	e.preventDefault();
	let body = {}; 

	for (let i = 0; i < addForm.elements.length; i++) {
		let el = addForm.elements[i];
		console.log(el);
		if (el.name) {
			body[el.name] = el.name === "favourite" ? el.checked : el.value;
		}
	}

	console.log(body);
	addCat(body);
});