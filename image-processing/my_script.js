import { myWebglUtils } from "../utils/myWebglUtils.js";
const sliderY = document.getElementById('y-slider');
const sliderX = document.getElementById('x-slider');
const canvas = document.getElementById('my_canvas');
const blurOffset = [1, 1];
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
const planeData = {
    a_position: { dataArray: [
            -1, 1, 0, // top left
            1, 1, 0, // top right
            -1, -1, 0, // bottom left
            1, -1, 0 // bottom right
        ],
        numComponents: 3 },
    a_texCoord: { dataArray: [0, 1, 0, 0, 1, 1, 1, 0], numComponents: 2 },
    indices: [0, 1, 2, 2, 3, 1],
};
const bufferInfo = myWebglUtils.createBufferInfoFromArrays(gl, planeData);
// == Create a texture ==
const texture = gl.createTexture();
gl.bindTexture(gl.TEXTURE_2D, texture);
// Fill the texture with a 1x1 blue pixel.
gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
// Asynchronously load an image
const image = await loadImage("cat.jpeg");
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
    u_texture: texture,
    u_textureSize: [image.width, image.height],
    u_offset: [blurOffset[0], blurOffset[1]],
};
sliderX.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    blurOffset[0] = value;
    cubeUniforms.u_offset = blurOffset;
    drawScene();
};
sliderY.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    blurOffset[1] = value;
    cubeUniforms.u_offset = blurOffset;
    drawScene();
};
function drawScene() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);
    gl.useProgram(program);
    myWebglUtils.setBuffersAndAttribs(attributeSetter, bufferInfo.attribs);
    myWebglUtils.setUniforms(uniformSetter, cubeUniforms);
    myWebglUtils.drawBufferInfo(gl, bufferInfo);
}
drawScene();
// Simple async function to load image, writen by claude
async function loadImage(src) {
    return new Promise((resolve) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.src = src;
    });
}
