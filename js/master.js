let hamburgerMenu = document.getElementsByClassName("navbar-toggler")[0]
let candidate= document.getElementById('candidates')

let votes = []

hamburgerMenu.addEventListener('click', function () {
    document.getElementsByClassName("navbar")[0].classList.toggle("bg");
})

window.addEventListener("load", init );

function init() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'json/candidate.json', true);

    xhr.onload = function () {
       
        if (this.status >= 200 && this.status < 400 ) {
            const data = JSON.parse(this.responseText);
            votes = data;
            let htmlTemplate = "";
            if (localStorage.getItem("candidates") === null) {
                localStorage.setItem("candidates", JSON.stringify(votes));
            }  
            else{
                votes = JSON.parse(localStorage.getItem("candidates"))
            }              
            renderHtml(htmlTemplate)         
        }
    }

    xhr.send();
}   
function renderHtml(htmlTemplate){
    votes.forEach(votes => {
        htmlTemplate += `
        <div class="col-lg-6" >
            <div class="col-lg-12 imgStyle" style="background-image: url(${ votes.img_src})">
                <div class="content-info row">
                    <div class="icon-content col-1">
                        <div class="icon-vote"></div>
                    </div>
                    <div class="row col-11">
                        <h3>${votes.name}</h3>
                        <p>${votes.description}</p>
                        <div class="row col-12 px-0">
                            <button type="button" class="col-5 btn btn-outline-light">view full report</button>
                            <div class="col-7 job-info"><p>${votes.job}</p></div>
                        </div>                                
                    </div>
                    <div class="candidates-vote col-12">
                        <ul class="row">
                            <li class="green-content icons" style="width:${votes.percentLike + "%"}">
                            <a href="#" accessKey="${votes.id}" class="like">like</a>
                            <p class="percent">${votes.percentLike}</p><span>%</span></li>
                            <li class="orange-content icons" style="width:${votes.percentDisLike + "%"}">
                            <p class="percent">${votes.percentDisLike}</p><span>%</span>
                            <a href="#"  accessKey="${votes.id}" class="disLike">dislike</a></li>
                        </ul>
                    </div>
                </div>
            </div>                    
        </div>`;
    });

    document.getElementById("candidates").innerHTML = htmlTemplate;
    iconsChanges()  
}
candidate.addEventListener('click', function (event) {
    event.preventDefault() 
    const target = event.target    
    const candidateId = target.accessKey
    const vote = target.classList
    
    if (localStorage.getItem("candidates") === null) {
        localStorage.setItem("candidates", JSON.stringify(votes));
        counter(candidateId, vote)
    }else{
        counter(candidateId, vote)
    
    }    
    
});
function counter(candidateId, vote) {    
    votes = JSON.parse(localStorage.getItem("candidates"))
    
    for (let index = 0; index < votes.length; index++) {
    let storageId = votes[index].id
        if (candidateId == storageId && vote == "like") {
            
             votes[index].likeVote += 1
            
             localStorage.setItem("candidates", JSON.stringify(votes))
            break
             
        } else if (candidateId == storageId && vote == "disLike")  {
             votes[index].dislikeVote += 1
             localStorage.setItem("candidates", JSON.stringify(votes))
             break
         }
     }
    getPercent(votes)
}

function getPercent(votes) {
  
    for (let index = 0; index < votes.length; index++) {
        const likeStorage = votes[index].likeVote;
        const dislikeStorage = votes[index].dislikeVote;        
    
        let total = likeStorage+dislikeStorage;
        let percentlike = Number(likeStorage * 100 / total)
        let percentdislike = Number(dislikeStorage * 100 / total)

        let resultLike = percentlike.toFixed(1)
        let resultDisLike = percentdislike.toFixed(1)        

        if (isNaN(resultDisLike) || isNaN(resultDisLike)) {
            resultLike = 0;
            resultDisLike = 0;
        }        

        votes[index].percentLike = resultLike
        votes[index].percentDisLike = resultDisLike
        localStorage.setItem("candidates", JSON.stringify(votes))
        init()
    }
}

function iconsChanges() {
    for (let index = 0; index < votes.length; index++) {
        var element = document.getElementsByClassName("icon-vote");
        if (votes[index].percentLike > 50) {
            element[index].className += " like";
        } else if (votes[index].percentDisLike > 50 ) {

            element[index].className += " dislike";
        } else {
            element[index].style.width = 0
            element[index].style.height = 0
        }
    }
    
}