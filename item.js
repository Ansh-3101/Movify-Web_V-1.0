const key = '68aea65605cb563f92ea833b5dd6c75d';
const id = sessionStorage.getItem("id");
const type = sessionStorage.getItem("type");
const imdb_key1 = "k_0h0a29ya"
const imdb_key2 = "k_wl7usvbg"
console.log(id+type);



async function itemInfo(id ,type) {
    

const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${key}&language=en-US`;
console.log(id);
fetch(url).then((response)=> response.json()).then((data) =>{
    
    document.getElementById('itemImage').src = `https://image.tmdb.org/t/p/w300/${data.poster_path}`;
    if (type == "tv") {
        document.title = data.original_name;
        document.getElementById('itemName').innerHTML = data.original_name;
        document.getElementById('itemDate').innerHTML = data.first_air_date;
        const tv_imdb_url =`https://api.themoviedb.org/3/tv/${id}/external_ids?api_key=${key}&language=en-US`
        fetch(tv_imdb_url).then((response)=>response.json()).then((data)=>{
            const imageUrl = `https://imdb-api.com/en/API/Images/${imdb_key2}/${data.imdb_id}/full"`;
            fetch(imageUrl).then((response)=> response.json()).then((data) =>{
               setImages(data)
        })
    })
    }
    else {
        document.title = data.original_title;
        document.getElementById('itemName').innerHTML = data.title
        document.getElementById('itemDate').innerHTML = data.release_date;


     const imageUrl = `https://imdb-api.com/en/API/Images/${imdb_key1}/${data.imdb_id}/full"`;

    //  fetch(imageUrl).then((response)=> response.json()).then((data) =>{
    
    //     setImages(data);
    //   })
    }
    })
    
}

async function setImages(data) {


    var random1 = Math.floor(Math.random()*data.items.length);
    var random2 = Math.floor(Math.random()*data.items.length);
    var random3 = Math.floor(Math.random()*data.items.length);
    var random4 = Math.floor(Math.random()*data.items.length);
    var random5 = Math.floor(Math.random()*data.items.length);
    var random6 = Math.floor(Math.random()*data.items.length);
    var random7 = Math.floor(Math.random()*data.items.length);
    var random8 = Math.floor(Math.random()*data.items.length);
    var random9 = Math.floor(Math.random()*data.items.length);
    var random10 = Math.floor(Math.random()*data.items.length);

  


    document.getElementById("image1").src = data.items[random1].image
    document.getElementById("image2").src = data.items[random2].image
    document.getElementById("image3").src = data.items[random3].image
    document.getElementById("image4").src = data.items[random4].image
    document.getElementById("image5").src = data.items[random5].image
    document.getElementById("image6").src = data.items[random6].image
    document.getElementById("image7").src = data.items[random7].image
    document.getElementById("image8").src = data.items[random8].image
    document.getElementById("image9").src = data.items[random9].image
    document.getElementById("image10").src = data.items[random10].image

    document.getElementById("p1").innerHTML = data.items[random1].title
    document.getElementById("p2").innerHTML = data.items[random2].title
    document.getElementById("p3").innerHTML = data.items[random3].title
    document.getElementById("p4").innerHTML = data.items[random4].title
    document.getElementById("p5").innerHTML = data.items[random5].title
    document.getElementById("p6").innerHTML = data.items[random6].title
    document.getElementById("p7").innerHTML = data.items[random7].title
    document.getElementById("p8").innerHTML = data.items[random8].title
    document.getElementById("p9").innerHTML = data.items[random9].title
    document.getElementById("p10").innerHTML = data.items[random10].title


}

itemInfo(id,type);