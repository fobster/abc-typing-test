$( document ).ready(function() {
    console.log( "ready!" );

    var abc = 'abcdefghijklmnopqrstuvwxyz';
    var startCounter = 0;
    var counter = $('#counter');
    var perfectsEl = $('#perfects');
    var bestTimeEl = $('#best-time');
    var keyCount = 0;
    var bestTime = 0;
    var numOfPerfects = 0;
    counter.html(startCounter);

    var ABC_KEY_COUNT = 27;

    $( "#typing" ).keyup(function( event ) {
        var output = $(this).val();
        var re = new RegExp('^'+output);
        var typingContainer = $('#typing-container');
        console.log(output);
        console.log('match', abc.match(re)); 

        keyCount++;

        typingContainer.removeClass('wrong');

        if(!abc.match(re)){
           typingContainer.addClass('wrong'); 
        }

        if( event.which !== 13 && output !== '' && startCounter === 0){
            startCounter = Date.now();
            showCounter(counter);
            console.log('startCounter',startCounter);
        }

        // if ( event.which == 13 ) {
        //     event.preventDefault();
        //     console.log($(this).val());
        // }
    });

    $('#form').submit(function(event){
        event.preventDefault();
        var content = $('#output');
        var typing = $('#typing');
        var existingContent = content.html();
        var endCounter = Date.now();
        var li = $('<li>');
        var timeLapsed = (endCounter-startCounter)*.001;
// console.log('startCounter',startCounter);
// console.log('stopCounter',endCounter);

        li.html(typing.val() + ' - ' + timeLapsed + ' seconds');
        content.prepend(li);

        //does not match all the characters
        if(typing.val() !== abc) {
            li.addClass('wrong');
        } else {
            li.addClass('correct');
        }

        //copy pasta prevent
        if( keyCount < ABC_KEY_COUNT && typing.val() === abc ){
            li.html(li.html() + 
            '<br /> <strong>How did you type the ABCs in less than 27 key presses?</strong>'
            );
            li.addClass('warning');
        }

        //perfect amount of keys typed
        if( keyCount === ABC_KEY_COUNT && typing.val() === abc ){
            li.html(li.html() + 
            '<br /> <strong>PERFECT TYPING!!!</strong>'
            );
            numOfPerfects++;
            perfectsEl.html(numOfPerfects);
        }

        //best time
        if( timeLapsed < bestTime && typing.val() === abc ) {
            li.html(li.html() +
            '<br /> <strong>You beat your best time of ' + bestTime + ' seconds. New best time ' + timeLapsed + 'seconds.</strong>'
            );

            bestTime = timeLapsed;
            bestTimeEl.html(bestTime);
        }

        if( bestTime === 0 && typing.val() === abc) {
            bestTime = timeLapsed;
            bestTimeEl.html(bestTime);
        }

        // content.html(existingContent + (existingContent!==''?'<br />':'') + typing.val() + ' - ' + (endCounter-startCounter)*.001 + ' Seconds');

        //reset
        typing.val('');
        startCounter = 0;//reset counter
        stopCounter();
        counter.html(startCounter);
        keyCount = 0;
    });
});

var timeloop;
function showCounter(ele) {
    var start = Date.now();
    timeloop = window.setInterval(function(){
        var current = Date.now();
        var elapsed = (current - start)/1000;
        $(ele).html(elapsed);
    },10);
}

function stopCounter() {
    console.log('stopCounter');
    window.clearInterval(timeloop);
}