// 페이지 로딩 시 한번 리로딩 - 뒤로가기 버튼 클릭 시 남아있는 캐시로 인한 오류 보완
$(window).bind("pageshow", function(event) {
	if (event.originalEvent.persisted) {
			document.location.reload();
	}
});

// url id 분리
const url = window.location.href
const urlSplit = url.split("/")
const urlId = urlSplit[urlSplit.length-2]
const sessionArr = [];


//fetch 받아오기
async function getItems(){
	return fetch(`/api/products/${urlId}`)
		.then(res=>res.json())
}

const af = sessionStorage.getItem("cart")
const fa = JSON.parse(af)
if(fa !== null){
	for(let i=0; i<fa.length; i++){
		sessionArr.push(fa[i])
	}
}


//데이터 -> HTML 변환 
function parseToHTML(item){
	const category = document.querySelector('.category');
	const title = document.querySelector('.title');
	const price = document.querySelector('.price');
	const description = document.querySelector('.description');
	
	category.innerHTML = `${item.name}`;
	title.innerHTML = `${item.name}`;
	price.innerHTML = `${item.price}`;
	description.innerHTML = `${item.descriptionDetail}`;


	//장바구니 추가
	const cart = document.querySelector(".add-to-cart")
	
	async function addToCart(e) {
		e.preventDefault();
		// object 형태의 객체는 indexof가 먹히지 않아 stringify로 변환해줌
		let bbbb = sessionArr.map(JSON.stringify)

		if(bbbb.indexOf(JSON.stringify(item)) >= 0 ){
			alert("해당 제품이 장바구니에 있습니다.")
		}
		else {
			sessionArr.push(item)
			alert("장바구니에 추가되었습니다.")
		}

		sessionStorage.setItem("cart", JSON.stringify(sessionArr))
	}
	cart.addEventListener("click", addToCart)
}


// 페이지 로드시 목록 자동추가
window.onload = ()=>{
	getItems()
		.then(item => {
			parseToHTML(item);
		});
	
};



