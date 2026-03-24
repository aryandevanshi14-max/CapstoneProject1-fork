const cardId = parseInt(window.location.pathname.split('/')[1]);


async function getData() {
    const url = `/${cardId}/api`;

    const response = await fetch(url);

    const data = await response.json();

    //hero component
    let heroComponent = document.getElementById('heroComponent');
    heroComponent.innerHTML = `Welcome to ${data.monumentName}`
    heroComponent.style.backgroundImage = `url(${data.img})`;







    //main component
    document.getElementById('mainComponent').innerHTML = `<article>
                <h1>Description</h1>
                ${data.description}
                <div id='exampleImgComponent'>
                </div>
            </article>
             <aside>
                <ul class="fort">
                    <li class="listHeading">Monument Detail</li>
                    <li>Price: ${data.price} Rs</li>
                    <li class="listContent">Location: <a href=${data.location}><img src="location.svg" alt=""></a></li>
                </ul>
                <ul class="hotel" id="hotelComponent">
                    <li class="listHeading">Hotel Detail</li>
                </ul>
                </aside> `
    let exampleImgArray = data.exampleImg;

    for (let index = 0; index < exampleImgArray.length; index++) {
        
        const exampleImgLink = exampleImgArray[index];
        document.getElementById('exampleImgComponent').innerHTML +=`
        
        <a href=${exampleImgLink}><img src=${exampleImgLink} alt="" width="255px" height="165px"></a>`
        

    }





    let hotelNameArray = data.hotelName;
    let hotelLinkArray = data.hotelLink;

    for (let index = 0; index < hotelNameArray.length; index++) {
        const hotelName = hotelNameArray[index];
        const hotelLink = hotelLinkArray[index];
        document.getElementById('hotelComponent').innerHTML +=`
        <li>Hotel Name: ${hotelName}</li>
        <li class="listContent">Hotel Website: <a href=${hotelLink}><img src="link.svg" alt=""></a></li>`
        

    }















































}

getData()





