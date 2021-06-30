let line = document.querySelector('.contentContainer > .line:last-child');
let content = document.querySelector('.content');

new ImageShow( line );
new ImageShow( content );

new IconsCategory( content );

new Slider(document.getElementById('slider'));