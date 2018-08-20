(function() {
    var start, progressHandle;

    var progress = function() {
        // Add a dot each second
        $('#status').text(function(index, text) {
            return text + '.';
        });
    };

    var initialized = function() {
        // Precomputing finished, stop adding dots
        clearInterval(progressHandle);

        // Show the duration of initialization
        // var end = new Date,
        //     duration = (end - start) / 1000;
        // $('#status').text('Initialization done in ' + duration + ' seconds.');

        // Show the scrambler
        $('#randomstate').css('visibility', 'visible');
        generateScramble();
        $('#randomstate button').on('click', generateScramble);
        $(document).keyup(function(event) {
            if (event.which === 32) {
                event.preventDefault();
            }
        });
    };

    var generateScramble = function() {
        // Hide the initialization status on first scramble
        $('#status').hide();

        // Generate a scramble
        Cube.asyncScramble(function(alg) {
            var s = alg.replace(/\s+/g, ''), // remove spaces
                url = "http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&pzl=3&alg=" + s;
            $('#randomstate .result').html(alg + "<br><img src=\"" + url + "\">");
        });
    };

    $(function() {
        $('#status').text('Loading scramble');

        // Start measuring time
        start = new Date;

        // Start adding dots
        progressHandle = setInterval(progress, 1000);

        // Start precomputing
        Cube.asyncInit('./worker.js', initialized);
    });
})();