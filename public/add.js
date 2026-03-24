const cardId = parseInt(window.location.pathname.split('/')[2]);

document.getElementById('editFileForm').innerHTML=`
<form action="/editFile/${cardId}" method="post">
        <label for="monumentName">Name of Fort</label>
        <input type="text" name="monumentName" id="monumentName">

        <label for="img">Image url</label>
        <input type="url" name="img" id="img">

        <label for="description">Description</label>
        <textarea name="description" id="description"></textarea>


        <label for="price">Price</label>
        <input type="number" name="price" id="price">


        <label for="location">Location url</label>
        <input type="url" name="location" id="location">


        <label for="exampleImg">Enter img link in format: link1|link2|link3</label>
        <input type="text" name="exampleImg" id="exampleImg">
        <label for="hotelName">Enter hotel name in format:Hotel Name1|Hotel Name2|Hotel Name3</label>
        <input type="text" name="hotelName" id="hotelName">
        <label for="hotelLink">Enter hotel link in format:Hotel link1|Hotel link2|Hotel link3</label>
        <input type="text" name="hotelLink" id="hotelLink">

        <input type="submit" value="Submit"  class="submit">


    </form>`