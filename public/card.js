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
                <div class="description"
                <h1>Description</h1>
                </div>

                <div class="descriptioninfo">
                ${data.description}
                </div>

                <div id='exampleImgComponent'>
                </div>
            </article>
             <aside>
                <ul class="fort">
                    <li class="listHeading">Monument Detail</li>
                    <li>Price: ${data.price} Rs</li>
                    <li class="listContent">Location: <a href=${data.location}>
                    <img class="locationicon" src="location.svg" alt=""></a></li>
                </ul>
                <ul class="hotel" id="hotelComponent">
                    <li class="listHeading">Hotel Detail</li>
                </ul>
                <ul class="hospital" id="hospitalComponent">
                    <li class="listHeading">Hospital Detail</li>
                </ul>
                <ul class="emergency">
                    <li class="listHeading">Emergency</li>
                    <li class="listContent">Police No. - 100</li>
                    <li class="listContent">Ambulance No. - 108</li>
                </ul>
                </aside> `


    let exampleImgArray = data.exampleImg;

    for (let index = 0; index < exampleImgArray.length; index++) {
        
        const exampleImgLink = exampleImgArray[index];
        document.getElementById('exampleImgComponent').innerHTML +=`
        
        <a href=${exampleImgLink}>
        <img class="eximg" src=${exampleImgLink} alt="" width="255px" height="165px"></a>`
        

    }


    let hotelNameArray = data.hotelName;
    let hotelLinkArray = data.hotelLink;

    for (let index = 0; index < hotelNameArray.length; index++) {
        const hotelName = hotelNameArray[index];
        const hotelLink = hotelLinkArray[index];
        document.getElementById('hotelComponent').innerHTML +=`
        <li>Hotel Name: ${hotelName}</li>
        <li class="listContent">Hotel Website: <a href=${hotelLink}>
        <img class="linkicon" src="link.svg" alt=""></a></li>`
        

    }
    let hospitalNameArray = data.hospitalName;
    let hospitalLinkArray = data.hospitalLink;

    for (let index = 0; index < hospitalNameArray.length; index++) {
        const hospitalName = hospitalNameArray[index];
        const hospitalLink = hospitalLinkArray[index];
        document.getElementById('hospitalComponent').innerHTML +=`
        <li>Hospital Name: ${hospitalName}</li>
        <li class="listContent">Hospital Website: <a href=${hospitalLink}>
        <img class="linkicon"src="link.svg" alt=""></a></li>`
        

    }


}

getData()