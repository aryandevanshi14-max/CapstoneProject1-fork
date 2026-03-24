const cardId = parseInt(window.location.pathname.split('/')[2]);

document.getElementById('editFileForm').innerHTML=`<form action="/checkPassword/${cardId}" method="post">
        <label for="password">Enter Admin Password</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="Submit"  class="submit">




    </form>`