import { myWebglUtils } from "../utils/myWebglUtils.js";
import { myMath } from "../utils/myMathUtils.js";
import { primitives } from "../utils/myPrimitives.js";
const canvas = document.getElementById('my_canvas');
const gl = canvas?.getContext('webgl');
if (!gl) {
    throw new Error('WebGL not supported');
}
const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');
if (!program) {
    throw new Error('shader program failed');
}
// ==== set up data
const uniformSetter = myWebglUtils.createUniformSetters(gl, program);
const attributeSetter = myWebglUtils.createAttributeSetters(gl, program);
const cubeData = primitives.createCube(2, true);
const myTexCoords = [
    // Front face (0,0), (1,0), (1,1), (0,1) for a quad
    0.31, 1, 0, 1, 0, 0, 0.31, 0,
    // Back face (order might be reversed depending on desired mapping)
    0, 1, 0, 0, 0.31, 0, 0.31, 1, // Adjusted for back face to match its vertex order
    // Top face
    0.6, 1, 0.6, 0, 1, 0, 1, 1, // Adjusted for top face vertex order
    // Bottom face
    0.6, 0, 1, 0, 1, 1, 0.6, 1,
    // Right face
    0.6, 1, 0.6, 0, 0.31, 0, 0.31, 1, // Adjusted for right face vertex order
    // Left face
    0.31, 1, 0.6, 1, 0.6, 0, 0.31, 0 // Adjusted for left face vertex order
];
cubeData.a_texCoord.dataArray = myTexCoords;
const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, cubeData);
let projectionMatrix = myMath.perspective(myMath.toRad(30), (gl.canvas.width / gl.canvas.height), 1, 2000);
let viewMatrix = myMath.inverse(myMath.lookAt([0, 1, 5], [0, 0, -1], [0, 1, 0]));
let projViewMatrix = myMath.multiply(projectionMatrix, viewMatrix);
// == Create a texture ==
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
// Asynchronously load an image
const image = await loadImage("combinedTexture");
gl.bindTexture(gl.TEXTURE_2D, texture);
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
// power of 2?
if ((image.width & (image.width - 1)) == 0 && (image.height & (image.height - 1)) == 0) {
    gl.generateMipmap(gl.TEXTURE_2D);
}
else {
    // turn of mips and set wrapping mode
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
}
// == ==
const cubeUniforms = {
    u_projection: projViewMatrix,
    u_view: viewMatrix,
    u_world: myMath.identity(4),
    u_color: [1, 1, 0, 1],
    u_texture: texture,
};
function drawScene(time) {
    time = time * 0.001 + 1.0;
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    cubeUniforms.u_world = myMath.yRotation(myMath.toRad((time * 10) % 360));
    myWebglUtils.setBuffersAndAttribs(attributeSetter, bufferInfo.attribs);
    myWebglUtils.setUniforms(uniformSetter, cubeUniforms);
    myWebglUtils.drawBufferInfo(gl, bufferInfo);
    requestAnimationFrame(drawScene);
}
requestAnimationFrame(drawScene);
async function loadObj(url) {
    const response = await fetch(url);
    return response.text();
}
// Simple async function to load image, writen by claude
async function loadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = src;
    });
}
