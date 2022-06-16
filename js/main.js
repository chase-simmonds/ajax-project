/* <div #card-row>
    <div .column-third>
      <ul>
        <li>
            <h2 ticker>
            <hr>
            <p sentiment>
            <p score>
            <p comments> */

var $cardRow = document.querySelector('#card-row');

var targetUrl = encodeURIComponent('https://tradestie.com/api/v1/apps/reddit');

function getStocks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (var i = 0; i < xhr.response.length; i++) {
      var $colThird = document.createElement('div');
      $colThird.setAttribute('class', 'column-third');
      $cardRow.appendChild($colThird);

      var $ul = document.createElement('ul');
      $colThird.appendChild($ul);

      var $li = document.createElement('li');
      $ul.appendChild($li);

      var $ticker = document.createElement('h2');
      $li.appendChild($ticker);
      $ticker.textContent = xhr.response[i].ticker;

      var $line = document.createElement('hr');
      $li.appendChild($line);

      var $sentiment = document.createElement('p');
      $li.appendChild($sentiment);
      $sentiment.textContent = 'Sentiment: ' + xhr.response[i].sentiment;

      var $score = document.createElement('p');
      $li.appendChild($score);
      $score.textContent = 'Score: ' + xhr.response[i].sentiment_score;

      var $comments = document.createElement('p');
      $li.appendChild($comments);
      $comments.textContent = 'Comments: ' + xhr.response[i].no_of_comments;
    }
  });
  xhr.send();
}

getStocks();
