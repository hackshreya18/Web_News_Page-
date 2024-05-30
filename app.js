// const API_KEY="5ff3376ec3744f19a604958f539cac96";
// const url="https://newsapi.org/v2/everything?q=";

const url="https://newsdata.io/api/1/news?apikey=pub_45290c4a5b1d1c9e14d145ca383521940131e&q="

window.addEventListener("load",()=>fetchNews("India"));

function reload(){
    window.location.reload();
}

async function fetchNews(query){
        const res=await fetch(`${url}${query}`);
        const data=await res.json();
        console.log(data);
        bindingData(data.results);
    
    
}

function bindingData(cardArticle){
    const cardData=document.querySelector(".card_container");
    const templateData=document.querySelector("#template_card");

    cardData.innerText="";

    if (!cardArticle || !Array.isArray(cardArticle)) return;

    cardArticle.forEach(element => {
        if(!element.image_url){
            return;
        }
        const cloneCard=templateData.content.cloneNode(true);
        insertData(cloneCard,element);
        clickOnCard(cloneCard,element);
        cardData.appendChild(cloneCard);
    });
}

function insertData(cloneCard,article){
    const newsImg=cloneCard.querySelector(".new_image");
    const newsTitle=cloneCard.querySelector(".news_title");
    const newsDetails=cloneCard.querySelector(".news_details");
    const newsDate=cloneCard.querySelector(".news_date");

    newsImg.src=article.image_url;
    newsTitle.innerText=article.title;
    newsDetails.innerText=article.description;

    const date=new Date(article.pubDate).toLocaleString('en-US', { timeZone: 'Asia/Jakarta' });
    newsDate.innerText=`${article.source_id} : ${date}`;
}

function clickOnCard(cloneCard,article){
    cloneCard.firstElementChild.addEventListener("click",()=>{
        window.open(article.link,"_blank");
    })
}

const navLink=document.querySelectorAll(".nav_link");

for(link of navLink){
    link.addEventListener("click",openData);
}
function openData(){
    fetchNews(this.innerText);
    
}

const searchData=document.querySelector(".search_btn");
const inputData=document.querySelector(".news_input");

searchData.addEventListener("click",()=>{
    const query = inputData.value.trim();
    if (query) {
        fetchNews(query);
    }
});




