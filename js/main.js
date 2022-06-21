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

function getStonks() {
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
      $li.setAttribute('data-stonk-id', data.stonkId);

      // Ticker

      var $ticker = document.createElement('h2');
      $li.appendChild($ticker);
      $ticker.textContent = xhr.response[i].ticker;

      var $line = document.createElement('hr');
      $li.appendChild($line);

      var $div1 = document.createElement('div');
      $li.appendChild($div1);

      // Bullish or Bearish

      var $sentiment = document.createElement('span');
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

      var $score = document.createElement('span');
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

      var $comments = document.createElement('span');
      var $span3 = document.createElement('span');

      var $commentsData = xhr.response[i].no_of_comments;
      $div3.appendChild($comments);
      $div3.appendChild($span3);
      $comments.textContent = 'Comments: ';
      $span3.textContent = $commentsData;
      $span3.setAttribute('class', 'bold');

      // Form, owned label, checkbox input, and watch button

      var $div4 = document.createElement('div');
      $div3.appendChild($div4);

      var $form = document.createElement('form');
      var $owned = document.createElement('label');
      var $input = document.createElement('input');

      $owned.textContent = 'Owned: ';
      $input.setAttribute('type', 'checkbox');
      // $input.setAttribute('class', 'input-data');
      $input.setAttribute('data-stonk-id', data.stonkId);

      var $watchButton = document.createElement('button');
      $watchButton.setAttribute('class', 'watch-button');
      $watchButton.textContent = 'Watch';
      $watchButton.setAttribute('data-stonk-id', data.stonkId);
      data.stonkId++;

      $div4.appendChild($form);
      $form.appendChild($owned);
      $form.appendChild($input);
      $form.appendChild($watchButton);
    }
  });
  xhr.send();
}

getStonks();

// save to watchlist

// add event listener for watch button and function to save it watchlist
