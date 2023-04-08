const key = '68aea65605cb563f92ea833b5dd6c75d';
const castId = sessionStorage.getItem("castId");
console.log(castId);


getCastInfo(castId);

getCredits(castId)

getImages(castId);


async function getCastInfo(castId) {
    const castInfoUrl = `https://api.themoviedb.org/3/person/${castId}?api_key=${key}`
    fetch(castInfoUrl).then((response)=>response.json())
    .then((data)=>{
        
        document.title = data.name
        document.getElementById("personImage").src = `https://image.tmdb.org/t/p/original${data.profile_path}`
        document.getElementById("castName").innerHTML = data.name;
        document.getElementById("biography").innerHTML = data.biography;
        document.getElementById("knownFor").innerHTML = data.known_for_department

        if (data.gender == 1) {
            document.getElementById("gender").innerHTML = "Female"
        }
        else if (data.gender == 2) {
            document.getElementById("gender").innerHTML = "Male"
        }

        // setBirthday
        document.getElementById("birthday").innerHTML = data.birthday;

        // Set birthPlace
        document.getElementById("birthPlace").innerHTML = data.place_of_birth;

        // Popularity
        document.getElementById("popularity").innerHTML = data.popularity

        // Set other names list
        setOtherNames(data);
    })
}


async function getCredits(castId) { 
    getCreditsUrl = `https://api.themoviedb.org/3/person/${castId}/combined_credits?api_key=${key}`
    fetch(getCreditsUrl).then((response)=>response.json())
    .then((data)=>{
        console.log(data);

        document.getElementById("creditsCount").innerHTML = data.cast.length

        data.cast.map((element)=>{
            let filmograpyhList = document.getElementById("creditList")
            let filmographyItem = document.createElement("div");
            filmographyItem.className = "recommendationItem"
            let name;
            if (element.media_type == "movie") {
                name = element.original_title
                filmographyItem.innerHTML = `
                <a href="movie.html" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
                    <div class="itemCard" >
                
                        <div class="cardImage">
                            <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="./images/noImage.png">
                        </div>
                
                        <div class="recommendationInfo">
                            <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                            <div id="itemName">${name.length > 20 ? name.slice(0,20)+".." : name}</div>
                            <div id="releaseDate">${element.release_date}</div>
                            <div id="type">Content : ${element.media_type}</div>
                        </div>
                    </div>
                 </a>`
    
                 filmograpyhList.appendChild(filmographyItem);
            }
            else{
                name = element.original_name
                filmographyItem.innerHTML = `
                <a href="tv.html" class="anchor" onclick={onClickItem(${element.id},"${element.media_type}")}>
                    <div class="itemCard" >
                
                        <div class="cardImage">
                            <img id="itemImage" src="https://image.tmdb.org/t/p/w500${element.poster_path}" alt="./images/noImage.png">
                        </div>
                
                        <div class="recommendationInfo">
                            <div id="rating"><span class="fa fa-star checked"></span> ${element.vote_average}</div>
                            <div id="itemName">${name.length > 20 ? name.slice(0,20)+".." : name}</div>
                            <div id="releaseDate">${element.first_air_date}</div>
                            <div id="type">Content : ${element.media_type}</div>
                        </div>
                    </div>
                 </a>`
    
                 filmograpyhList.appendChild(filmographyItem);
            }
           
        })
    })
}


async function setOtherNames(data) {
    data.also_known_as.map((element)=>{
        let namesList = document.getElementById("otherNamesList");
        let nameItem = document.createElement("div");
        nameItem.className = "personInfo";

        nameItem.innerHTML = element;

        namesList.appendChild(nameItem)
    })
}


async function onClickItem(id,type) {
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("type",type);    
}


async  function getImages(castId) {
    const castImagesUrl = `https://api.themoviedb.org/3/person/${castId}/images?api_key=${key}`
    fetch(castImagesUrl).then((response)=>response.json())
    .then((data)=>{
        data.profiles.map((element)=>{
            let photosList = document.getElementById("photoList");
            let photoItem = document.createElement("div");

            photoItem.innerHTML = ` 
                <img id="castProfile" src="https://image.tmdb.org/t/p/w500${element.file_path}" alt="./images/noImage.png">
            
        `

        photosList.appendChild(photoItem)
        })
    })

    
}

