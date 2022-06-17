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

      // Ticker

      var $ticker = document.createElement('h2');
      $li.appendChild($ticker);
      $ticker.textContent = xhr.response[i].ticker;

      var $line = document.createElement('hr');
      $li.appendChild($line);

      var $div1 = document.createElement('div');
      $li.appendChild($div1);

      // Bullish or Bearish

      var $sentiment = document.createElement('text-content');
      var $span = document.createElement('span');

      var $sentimentData = xhr.response[i].sentiment;
      $div1.appendChild($sentiment);
      $div1.appendChild($span);
      $sentiment.textContent = 'Sentiment: ';
      $span.textContent = $sentimentData;
      if ($span.textContent === 'Bullish') {
        $span.setAttribute('class', 'green');
      } else {
        $span.setAttribute('class', 'red');
      }

      // Sentiment Score

      var $div2 = document.createElement('div');
      $div1.appendChild($div2);

      var $score = document.createElement('text-content');
      var $span2 = document.createElement('span');

      var $sentimentScoreData = xhr.response[i].sentiment_score;
      $div2.appendChild($score);
      $div2.appendChild($span2);
      $score.textContent = 'Score: ';
      $span2.textContent = $sentimentScoreData;
      $span2.setAttribute('class', 'bold');

      // Comments

      var $div3 = document.createElement('div');
      $div2.appendChild($div3);

      var $comments = document.createElement('text-content');
      var $span3 = document.createElement('span');

      var $commentsData = xhr.response[i].no_of_comments;
      $div3.appendChild($comments);
      $div3.appendChild($span3);
      $comments.textContent = 'Comments: ';
      $span3.textContent = $commentsData;
      $span3.setAttribute('class', 'bold');

    }
  });
  xhr.send();
}

getStocks();
