// Wait till the browser is ready to render the game (avoids glitches)
app = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalStorageManager);
window.requestAnimationFrame(function () {
    app
});

ai  = new GameAI( app )

//ai.begin()