var $cardRow = document.querySelector('#card-row');

var targetUrl = encodeURIComponent('https://tradestie.com/api/v1/apps/reddit');

function getStonks() {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://lfz-cors.herokuapp.com/?url=' + targetUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    for (let i = 0; i < xhr.response.length; i++) {
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
      var $tickerData = xhr.response[i].ticker;
      $ticker.textContent = $tickerData;

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
      if ($sentimentData === 'Bullish') {
        $ul.setAttribute('class', 'li-bullish');
      } else {
        $ul.setAttribute('class', 'li-bearish');
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
      $span2.textContent = ($sentimentScoreData * 100).toFixed(1) + '%';
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
      $form.setAttribute('class', 'form');
      $form.setAttribute('data-form-id', data.stonkId);
      var $owned = document.createElement('label');
      var $input = document.createElement('input');

      $owned.textContent = 'Owned: ';
      $input.setAttribute('type', 'checkbox');
      $input.setAttribute('class', 'input-data');
      $input.setAttribute('data-input-id', data.stonkId);

      var $watchButton = document.createElement('button');
      $watchButton.setAttribute('class', 'watch-button');
      $watchButton.textContent = 'Watch';
      $watchButton.setAttribute('data-watch-id', data.stonkId);
      data.stonkId++;

      $div4.appendChild($form);
      $form.appendChild($owned);
      $form.appendChild($input);
      $form.appendChild($watchButton);
    }

    // Save Stock

    window.addEventListener('click', saveStonk);
    function saveStonk(event) {
      if (event.target.closest('button') !== null) {
        event.preventDefault();
        if (event.target.closest('li').getAttribute('data-stonk-id') === event.target.getAttribute('data-watch-id')) {
          var stonkName = event.target.closest('li').childNodes[0].innerHTML;
          var stonkSentiment = event.target.closest('li').childNodes[2].childNodes[1].innerHTML;
          var stonkScore = event.target.closest('li').childNodes[2].childNodes[2].childNodes[1].innerHTML;
          var stonkComments = event.target.closest('li').childNodes[2].childNodes[2].childNodes[2].childNodes[1].innerHTML;
          var stonkOwned = event.target.closest('li').childNodes[2].childNodes[2].childNodes[2].childNodes[2].childNodes[0][0].checked;
          var savedStonkData = {
            ticker: stonkName,
            sentiment: stonkSentiment,
            score: stonkScore,
            comments: stonkComments,
            owned: stonkOwned
          };
          data.stonks.push(savedStonkData);
        }
      }
    }

  });
  xhr.send();
}

getStonks();

// view swap

var $viewStonks = document.querySelector('[data-view="stonks"]');
var $viewWatchlist = document.querySelector('[data-view="watchlist"]');
var $viewLink = document.querySelector('#view-link');

function viewSwap(event) {
  if (data.view === 'stonks') {
    $viewStonks.setAttribute('class', 'hidden');
    $viewWatchlist.setAttribute('class', 'view');
    $viewLink.textContent = 'Stonks';
    data.view = 'watchlist';
  } else if (data.view === 'watchlist') {
    $viewWatchlist.setAttribute('class', 'hidden');
    $viewStonks.setAttribute('class', 'view');
    $viewLink.textContent = 'Watchlist';
    data.view = 'stonks';
  }
}

$viewLink.addEventListener('click', viewSwap);

// keep current view

function keepCurrentView(event) {
  if (data.view === 'stonks') {
    $viewWatchlist.setAttribute('class', 'hidden');
    $viewStonks.setAttribute('class', 'view');
  } else if (data.view === 'watchlist') {
    $viewStonks.setAttribute('class', 'hidden');
    $viewWatchlist.setAttribute('class', 'view');
  }
}
window.addEventListener('DOMContentLoaded', keepCurrentView);

// load watchlist

var $watchlistRow = document.querySelector('#watchlist-row');

function getWatchlist() {
  if (data.view === 'watchlist') {
    for (let i = 0; i < data.stonks.length; i++) {
      var $colThird = document.createElement('div');
      $colThird.setAttribute('class', 'column-third');
      $watchlistRow.appendChild($colThird);

      var $ul = document.createElement('ul');
      $colThird.appendChild($ul);

      var $li = document.createElement('li');
      $ul.appendChild($li);
      $li.setAttribute('data-stonk-id', data.watchlistId);
      $li.setAttribute('class', 'li-normal');

      // Ticker

      var $ticker = document.createElement('h2');
      $li.appendChild($ticker);
      var $tickerData = data.stonks[i].ticker;
      $ticker.textContent = $tickerData;

      var $line = document.createElement('hr');
      $li.appendChild($line);

      var $div1 = document.createElement('div');
      $li.appendChild($div1);

      // Bullish or Bearish

      var $sentiment = document.createElement('span');
      var $span = document.createElement('span');

      var $sentimentData = data.stonks[i].sentiment;
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

      var $sentimentScoreData = data.stonks[i].score;
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

      var $commentsData = data.stonks[i].comments;
      $div3.appendChild($comments);
      $div3.appendChild($span3);
      $comments.textContent = 'Comments: ';
      $span3.textContent = $commentsData;
      $span3.setAttribute('class', 'bold');

      // Form, owned label, checkbox input, and watch button

      var $div4 = document.createElement('div');
      $div3.appendChild($div4);

      var $form = document.createElement('form');
      $form.setAttribute('class', 'form');
      $form.setAttribute('data-form-id', data.watchlistId);

      var $owned = document.createElement('label');
      var $input = document.createElement('input');
      $owned.textContent = 'Owned: ';
      $input.setAttribute('type', 'checkbox');
      $input.setAttribute('class', 'input-data');
      $input.checked = data.stonks[i].owned;
      $input.setAttribute('data-input-id', data.watchlistId);

      var $watchButton = document.createElement('button');
      $watchButton.setAttribute('class', 'unwatch-button');
      $watchButton.textContent = 'Unwatch';
      $watchButton.setAttribute('data-watch-id', data.watchlistId);
      data.watchlistId++;

      $div4.appendChild($form);
      $form.appendChild($owned);
      $form.appendChild($input);
      $form.appendChild($watchButton);
    }
  }
}

getWatchlist();
