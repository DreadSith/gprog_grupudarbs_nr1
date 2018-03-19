//initializing scene, camera, renderer
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

//resize scaling	
	window.addEventListener('resize', function() 
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width/height;
	camera.updateProjectionMatrix();
});

	controls = new THREE.OrbitControls(camera, renderer.domEelement); //add orbit controls

//add sound

var listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
var sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load( 'space.mp3', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});		
	
//make dice cube	
	var c1geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
	var cubeMaterials =
[
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/3.png'), side: THREE.FrontSide}), //right
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/5.png'), side: THREE.FrontSide}), //left
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/4.png'), side: THREE.FrontSide}), //top
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/2.png'), side: THREE.FrontSide}), //bottom
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/1.png'), side: THREE.FrontSide}), //front
	new THREE.MeshLambertMaterial({ map: new THREE.TextureLoader().load( 'dice/6.png'), side: THREE.FrontSide}), //back
];
	var material = new THREE.MeshFaceMaterial( cubeMaterials );
	var cube = new THREE.Mesh( c1geometry, material );
		scene.add( cube );
		
//magic bubble		
	var geometry = new THREE.SphereGeometry( 1.8, 15, 15);	
	var customMaterial = new THREE.ShaderMaterial( 
	{
	    uniforms: {  },
		vertexShader:   document.getElementById( 'vertexShader'   ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		side: THREE.BackSide,
		blending: THREE.AdditiveBlending,
		transparent: true
	} )		
	var sphere = new THREE.Mesh( geometry, customMaterial );
		scene.add( sphere );

	camera.position.z = 3; //adjust camera

//lights

	var light = new THREE.HemisphereLight( 0xFFFFFF, 0x080820, 2 );
		scene.add( light );

//adding a skybox		
    var geometry = new THREE.SphereGeometry(100, 64, 32 );
    var material = new THREE.MeshStandardMaterial( {
    map: new THREE.TextureLoader().load( '/textures/stars.jpg' ),
    side: THREE.DoubleSide
            } );
    skysphere = new THREE.Mesh( geometry, material );
    scene.add(skysphere);		

//scene logic, for cube, glow sphere, and skybox
	var update = function()
{
	cube.rotation.x += 0.01;
	cube.rotation.y += 0.005;
	sphere.rotation.x += 0;
	sphere.rotation.y += 5;
	skysphere.rotation.x += 0;
	skysphere.rotation.y += -0.0005;

};

//draw scene
	var render = function()
{	
	renderer.render(scene, camera);	
};

// run scene loop (update, render, repeat)
	var SceneLoop = function()
{
	requestAnimationFrame( SceneLoop );
	
	update();
	render();
};

		SceneLoop();
