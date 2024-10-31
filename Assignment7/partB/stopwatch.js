$(document).ready(() => {
    let intervalId = null;
    let startTime = null;
    let pausedTime = null;
    let running = false;

    // date picker
    const today = new Date().toISOString().split('T')[0];
    $('#datePicker').val(today);

    // Button event handlers
    $('#start').on('click', async () => await startStopwatch());
    $('#stop').on('click', () => stopStopwatch());
    $('#reset').on('click', () => resetStopwatch());

    async function startStopwatch() {
        if (!running) {
            // Calculate the start time
            startTime = pausedTime ? new Date(Date.now() - pausedTime) : new Date();
            running = true;
            toggleButtons();

            // Start the timer
            await runTimer();
        }
    }

    function runTimer() {
        return new Promise((resolve) => {
            intervalId = setInterval(() => {
                updateTime();
            }, 1000);
        });
    }

    function stopStopwatch() {
        if (running) {
            clearInterval(intervalId);
            pausedTime = Date.now() - startTime.getTime();
            running = false;
            toggleButtons();
        }
    }

    function resetStopwatch() {
        clearInterval(intervalId);
        $('#time').text("00:00:00");
        startTime = null;
        pausedTime = null;
        running = false;
        toggleButtons();
    }

    function updateTime() {
        const elapsedTime = new Date(Date.now() - startTime.getTime());
        const hours = elapsedTime.getUTCHours();
        const minutes = elapsedTime.getUTCMinutes();
        const seconds = elapsedTime.getUTCSeconds();
        $('#time').text(formatTime(hours, minutes, seconds));
    }

    const formatTime = (hours, minutes, seconds) =>
        `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;

    const pad = num => num.toString().padStart(2, '0');

    function toggleButtons() {
        $('#start').prop('disabled', running);
        $('#stop').prop('disabled', !running);
        $('#reset').prop('disabled', !startTime);
    }
});
