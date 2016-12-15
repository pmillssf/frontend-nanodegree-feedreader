/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

         //Loops through each feed to make sure the feed has a URL
         // defined and the URL is not empty
         it('has a url for each feed', function() {
           var feedNum = allFeeds.length;
           for (i = 0; i < feedNum; i++){
             expect(allFeeds[i].url).toBeDefined();
             expect(allFeeds[i].url.length).not.toBe(0);
           };

         });

         // Loops through each feed to make sure the name is defined
         // and that the name is not empty
         it('has a name for each feed', function() {
           var feedNum = allFeeds.length;
           for (i = 0; i < feedNum; i++){
             expect(allFeeds[i].name).toBeDefined();
             expect(allFeeds[i].name.length).not.toBe(0);
           };
         });
    });

    describe('The Menu', function() {

         // Makes sure the body loads with class "menu-hidden"
         //to hide the menu on load
         it('has the menu hidden by default', function() {
           var body = $('body');
           expect(body.hasClass('menu-hidden')).toBeTruthy();
         });

          // Makes sure the menu changes visibility when the menu icon
          // is clicked
          it('ensures the menu visibility on click', function() {
            var menuClicker = $('.menu-icon-link')
            var body = $('body');
            menuClicker.click();
            expect(body.hasClass('menu-hidden')).toBeFalsy();
            menuClicker.click();
            expect(body.hasClass('menu-hidden')).toBeTruthy();
          });
    });

    describe('Initial Entries', function() {

           beforeEach(function(done) {
             loadFeed(0, done);
           });
          // Checks that there is at least one .entry within the .feed container
           it('has at least one .entry within the .feed', function() {
             expect($('.feed .entry').length).not.toBe(0);
           });
    });

    describe('New Feed Selection', function() {
      var feedZero;
      var feedOne;
         // Loads feed 0 and feed 1 to compare the content and make sure
         // it has changed
         beforeEach(function(done) {
           loadFeed(0, function() {
             feedZero = $('.feed').html();

             loadFeed(1, function() {
               feedOne = $('.feed').html();
               done();
            });
          });
        });
      it('checks that a new feed load has different content', function() {
        expect(feedZero).not.toEqual(feedOne);
      })

      afterEach(function(done) {
        loadFeed(0, done);
      });
    });

}());
