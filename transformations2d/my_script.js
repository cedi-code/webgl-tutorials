import { myWebglUtils } from '../utils/myWebglUtils.js';
class m3 {
    static multiply(a, b) {
        let a00 = a[0 * 3 + 0];
        let a01 = a[0 * 3 + 1];
        let a02 = a[0 * 3 + 2];
        let a10 = a[1 * 3 + 0];
        let a11 = a[1 * 3 + 1];
        let a12 = a[1 * 3 + 2];
        let a20 = a[2 * 3 + 0];
        let a21 = a[2 * 3 + 1];
        let a22 = a[2 * 3 + 2];
        let b00 = b[0 * 3 + 0];
        let b01 = b[0 * 3 + 1];
        let b02 = b[0 * 3 + 2];
        let b10 = b[1 * 3 + 0];
        let b11 = b[1 * 3 + 1];
        let b12 = b[1 * 3 + 2];
        let b20 = b[2 * 3 + 0];
        let b21 = b[2 * 3 + 1];
        let b22 = b[2 * 3 + 2];
        return [
            b00 * a00 + b01 * a10 + b02 * a20,
            b00 * a01 + b01 * a11 + b02 * a21,
            b00 * a02 + b01 * a12 + b02 * a22,
            b10 * a00 + b11 * a10 + b12 * a20,
            b10 * a01 + b11 * a11 + b12 * a21,
            b10 * a02 + b11 * a12 + b12 * a22,
            b20 * a00 + b21 * a10 + b22 * a20,
            b20 * a01 + b21 * a11 + b22 * a21,
            b20 * a02 + b21 * a12 + b22 * a22,
        ];
    }
    static translation(tx, ty) {
        return [
            1, 0, 0,
            0, 1, 0,
            tx, ty, 1,
        ];
    }
    static rotation(angleInRad) {
        let c = Math.cos(angleInRad);
        let s = Math.sin(angleInRad);
        return [
            c, -s, 0,
            s, c, 0,
            0, 0, 1,
        ];
    }
    static scaling(sx, sy) {
        return [
            sx, 0, 0,
            0, sy, 0,
            0, 0, 1,
        ];
    }
    static projection(width, height) {
        /*
            vec2 zeroToOne = position / u_resolution;
            // convert form 0-1 to 0-2
            vec2 zeroToTwo = zeroToOne * 2.0;
            vec2 clipSpace = zeroToTwo - 1.0;
            // flip the y axis
        */
        return [
            2.0 / width, 0, 0,
            0, -2.0 / height, 0,
            -1.0, 1.0, 1,
        ];
    }
    static translate(m, tx, ty) {
        return this.multiply(m, this.translation(tx, ty));
    }
    static rotate(m, angleInRad) {
        return this.multiply(m, this.rotation(angleInRad));
    }
    static scale(m, sx, sy) {
        return this.multiply(m, this.scaling(sx, sy));
    }
}
let translation = [0, 0];
let width = 100;
let height = 30;
let rotation = 1;
let scale = [1, 1];
const color = [Math.random(), Math.random(), 1, 1];
const canvas = document.getElementById('my_canvas');
const sliderX = document.getElementById('x-slider');
const sliderY = document.getElementById('y-slider');
const sliderAngle = document.getElementById('angle-slider');
const sliderScaleX = document.getElementById('scale-x-slider');
const gl = canvas?.getContext('webgl');
if (!gl) {
    throw new Error('WebGL not supported');
}
const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');
if (!program) {
    throw new Error('shader program failed');
}
// look up attrib
const positionLocation = gl.getAttribLocation(program, 'a_position');
// look up uniforms
const colorLocation = gl.getUniformLocation(program, "u_color");
const transformLocation = gl.getUniformLocation(program, "u_transform");
const positionBuffer = gl.createBuffer();
// bind to ARRAY BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// put geometry data into buffer
setRectangle(gl, 0, 0, width, height);
sliderX.max = (gl.canvas.width - width).toString();
sliderY.max = (gl.canvas.height - height).toString();
drawScene();
sliderX.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    translation[0] = value;
    drawScene();
};
sliderY.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    translation[1] = value;
    drawScene();
};
sliderAngle.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    let rotationRad = (value / 180) * Math.PI;
    rotation = rotationRad;
    drawScene();
};
sliderScaleX.oninput = (event) => {
    const target = event.target;
    const value = parseInt(target.value);
    scale[0] = value;
    drawScene();
};
function drawScene() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);
    // tell it to use the shaders
    gl.useProgram(program);
    // turn on attribute
    gl.enableVertexAttribArray(positionLocation);
    // bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const size = 2; // 2 components per iteration (x, y, z, w) will only take on  x and y
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each itteration to get the next position
    const offsetBuffer = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offsetBuffer);
    let transformM = m3.projection(gl.canvas.width, gl.canvas.height);
    transformM = m3.translate(transformM, translation[0], translation[1]);
    transformM = m3.rotate(transformM, rotation);
    transformM = m3.scale(transformM, scale[0], scale[0]);
    transformM = m3.translate(transformM, -width / 2.0, -height / 2.0);
    // set uniforms
    gl.uniformMatrix3fv(transformLocation, false, transformM);
    gl.uniform4fv(colorLocation, color);
    const primitveType = gl.TRIANGLES;
    const offsetData = 0;
    const count = 6;
    gl.drawArrays(primitveType, offsetData, count);
}
function setRectangle(gl, x, y, width, height) {
    let x1 = x;
    let x2 = x + width;
    let y1 = y;
    let y2 = y + height;
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
        x1, y1,
        x2, y1,
        x1, y2,
        x1, y2,
        x2, y1,
        x2, y2,
    ]), gl.STATIC_DRAW);
}
