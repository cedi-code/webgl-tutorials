function createShader(gl, type, source) {
    const shader = gl.createShader(type);
    if (!shader) {
        console.error("failed to create shader");
    }
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    if (success) {
        return shader;
    }
    console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
}
async function loadShader(url) {
    const response = await fetch(url);
    return response.text();
}
function createProgram(gl, vertexS, fragmentS) {
    const program = gl.createProgram();
    gl.attachShader(program, vertexS);
    gl.attachShader(program, fragmentS);
    gl.linkProgram(program);
    const success = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (success) {
        return program;
    }
    console.error('program linking failed:', gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
}
function createStaticBuffer(gl, type, data) {
    // gl.bindBuffer(type, null);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(type, positionBuffer);
    gl.bufferData(type, new Float32Array(data), gl.STATIC_DRAW);
    // unbind the buffer (have to bind it again when giving it the shader position)
    gl.bindBuffer(type, null);
    return positionBuffer;
}
function setRectangle(gl, top, bottom, left, right) {
    const positions2 = [
        left, top,
        right, top,
        left, bottom,
        left, bottom,
        right, top,
        right, bottom,
    ];
    const positionBuffer1 = createStaticBuffer(gl, gl.ARRAY_BUFFER, positions2);
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer1);
    // if i would not rebind the buffer but just write in the buffer directly (without unbinding it)
    // this part would have been not be needed
    const size = 2; // 2 components per iteration (x, y, z, w) will only take on  x and y
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each itteration to get the next position
    const offsetBuffer = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offsetBuffer);
}
function randomInt(range) {
    return Math.floor(Math.random() * range);
}
console.log("running my_script.js");
const canvas = document.getElementById('my_canvas');
const gl = canvas?.getContext('webgl');
if (!gl) {
    throw new Error('WebGL not supported');
}
const vertexShaderSourceCode = await loadShader('shaders/vertex.glsl');
const fragmentShaderSourceCode = await loadShader('shaders/fragment.glsl');
console.log(gl);
const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSourceCode);
const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSourceCode);
if (!vertexShader || !fragmentShader) {
    throw new Error('Shader creation failed');
}
const program = createProgram(gl, vertexShader, fragmentShader);
if (!program) {
    throw new Error('Program creation failded');
}
const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
const resolutionUniformLocation = gl.getUniformLocation(program, "u_resolution");
const colorUniformLocation = gl.getUniformLocation(program, "u_color");
const positions = [
    10, 20,
    80, 20,
    10, 30,
    10, 30,
    80, 20,
    80, 30,
];
const positionBuffer = createStaticBuffer(gl, gl.ARRAY_BUFFER, positions);
// === Rendering ===
// clear canvas
gl.clearColor(0, 0, 0, 0);
// Enable the depth test
gl.enable(gl.DEPTH_TEST);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.useProgram(program);
gl.enableVertexAttribArray(positionAttributeLocation);
// gl.bindBuffer(gl.ARRAY_BUFFER ,positionBuffer);
// set the uniform variable u_resolution
gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
const primitveType = gl.TRIANGLES;
const offsetData = 0;
const count = 6; // number of times we execute vertex shader
// task 0 loop 50 times and call drawRectangle on screen!
for (let ii = 0; ii < 50; ii++) {
    setRectangle(gl, randomInt(canvas.height), randomInt(canvas.height), randomInt(canvas.width), randomInt(canvas.width));
    // set unfirom color variable u_color
    gl.uniform4f(colorUniformLocation, Math.random(), Math.random(), 1, 1);
    gl.drawArrays(primitveType, offsetData, count);
}
export {};
// => randomInt(300)
// task 1 create a function that draws a recangle, setRectangle
// task 2 assign the color
