(function () {
    'use strict';

    var csInterface = new CSInterface();

    function init() {
        document.getElementById('btn-start').addEventListener('click', function () {
            // Disable button to prevent multiple clicks
            var btn = document.getElementById('btn-start');
            btn.disabled = true;
            btn.innerText = "Processing...";

            csInterface.evalScript('startAutoCut()', function (result) {
                // Re-enable button
                btn.disabled = false;
                btn.innerText = "Start AutoCut";

                // Show result (you could also use a div for status)
                if (result) {
                   console.log(result);
                   // alert(result); // Optional: alert in CEP panel
                }
            });
        });
    }

    init();

}());
