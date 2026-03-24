async function getData() {
    const url = "/api";

    const response = await fetch(url);

    const data = await response.json();
    

    //data->array of id, href,img,monumentName
    data.forEach(element => {
        
        let cardDisplayElement=`
            <div class="card">
                <img src=${element.img} alt=${element.monumentName} width="255px" height="165px">
                <p>${element.monumentName}</p>
                <a href="/${element.id}">Guide</a>
                <a href="/password/${element.id}">Update</a>
            </div>
            
            `;



        document.getElementById('cardDisplay').innerHTML += cardDisplayElement;
    });

}

getData()





