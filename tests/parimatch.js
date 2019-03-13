module.exports = {
  'open live site': function (browser) {
      return browser.url('https://en.parimatch.com/en/live/event/2%7Ca142737c3c8a4b1c9b0a6888121720f8')
        .waitForElementPresent('.event-market__title');
  },

  'get data': function (browser) {
      return browser
        .execute(
            function() {
                const eventMarkets = document.querySelectorAll('.event-market'),
                    results = Array.prototype.map.call(eventMarkets, function (eventMarket) {
                        const title = eventMarket.querySelector('.event-market__title'),
                            eventOutcomes = eventMarket.querySelectorAll('.event-outcome'),
                            data = Array.prototype.map.call(eventOutcomes, function (eventOutcome) {
                                const name = eventOutcome.querySelector('.event-outcome__name'),
                                    value = eventOutcome.querySelector('.event-outcome__value');

                                return {
                                    name: name && name.innerText,
                                    value: value && value.innerText
                                };
                            });

                        return {
                            title: title && title.innerText,
                            data
                        };
                    });

                return JSON.stringify(results);
            },
            [],
            function (result) {
                console.log(result);
            }
        )
  },

  'end test': function (browser) {
      return browser.end();
  }
};
