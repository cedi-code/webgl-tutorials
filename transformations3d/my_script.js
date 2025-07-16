import { myWebglUtils } from '../utils/myWebglUtils.js';
import { myMath } from '../utils/myMathUtils.js';
import { primitives } from "../utils/myPrimitives.js";
class m4 {
    static vectorMultiply(v, m) {
        let dst = [];
        for (let i = 0; i < 4; ++i) {
            dst[i] = 0.0;
            for (var j = 0; j < 4; ++j) {
                dst[i] += v[j] * m[j * 4 + i];
            }
        }
        return dst;
    }
    static multiply(a, b) {
        let b00 = b[0 * 4 + 0];
        let b01 = b[0 * 4 + 1];
        let b02 = b[0 * 4 + 2];
        let b03 = b[0 * 4 + 3];
        let b10 = b[1 * 4 + 0];
        let b11 = b[1 * 4 + 1];
        let b12 = b[1 * 4 + 2];
        let b13 = b[1 * 4 + 3];
        let b20 = b[2 * 4 + 0];
        let b21 = b[2 * 4 + 1];
        let b22 = b[2 * 4 + 2];
        let b23 = b[2 * 4 + 3];
        let b30 = b[3 * 4 + 0];
        let b31 = b[3 * 4 + 1];
        let b32 = b[3 * 4 + 2];
        let b33 = b[3 * 4 + 3];
        let a00 = a[0 * 4 + 0];
        let a01 = a[0 * 4 + 1];
        let a02 = a[0 * 4 + 2];
        let a03 = a[0 * 4 + 3];
        let a10 = a[1 * 4 + 0];
        let a11 = a[1 * 4 + 1];
        let a12 = a[1 * 4 + 2];
        let a13 = a[1 * 4 + 3];
        let a20 = a[2 * 4 + 0];
        let a21 = a[2 * 4 + 1];
        let a22 = a[2 * 4 + 2];
        let a23 = a[2 * 4 + 3];
        let a30 = a[3 * 4 + 0];
        let a31 = a[3 * 4 + 1];
        let a32 = a[3 * 4 + 2];
        let a33 = a[3 * 4 + 3];
        return [
            b00 * a00 + b01 * a10 + b02 * a20 + b03 * a30,
            b00 * a01 + b01 * a11 + b02 * a21 + b03 * a31,
            b00 * a02 + b01 * a12 + b02 * a22 + b03 * a32,
            b00 * a03 + b01 * a13 + b02 * a23 + b03 * a33,
            b10 * a00 + b11 * a10 + b12 * a20 + b13 * a30,
            b10 * a01 + b11 * a11 + b12 * a21 + b13 * a31,
            b10 * a02 + b11 * a12 + b12 * a22 + b13 * a32,
            b10 * a03 + b11 * a13 + b12 * a23 + b13 * a33,
            b20 * a00 + b21 * a10 + b22 * a20 + b23 * a30,
            b20 * a01 + b21 * a11 + b22 * a21 + b23 * a31,
            b20 * a02 + b21 * a12 + b22 * a22 + b23 * a32,
            b20 * a03 + b21 * a13 + b22 * a23 + b23 * a33,
            b30 * a00 + b31 * a10 + b32 * a20 + b33 * a30,
            b30 * a01 + b31 * a11 + b32 * a21 + b33 * a31,
            b30 * a02 + b31 * a12 + b32 * a22 + b33 * a32,
            b30 * a03 + b31 * a13 + b32 * a23 + b33 * a33,
        ];
    }
    static inverse(m) {
        let m00 = m[0 * 4 + 0];
        let m01 = m[0 * 4 + 1];
        let m02 = m[0 * 4 + 2];
        let m03 = m[0 * 4 + 3];
        let m10 = m[1 * 4 + 0];
        let m11 = m[1 * 4 + 1];
        let m12 = m[1 * 4 + 2];
        let m13 = m[1 * 4 + 3];
        let m20 = m[2 * 4 + 0];
        let m21 = m[2 * 4 + 1];
        let m22 = m[2 * 4 + 2];
        let m23 = m[2 * 4 + 3];
        let m30 = m[3 * 4 + 0];
        let m31 = m[3 * 4 + 1];
        let m32 = m[3 * 4 + 2];
        let m33 = m[3 * 4 + 3];
        let tmp_0 = m22 * m33;
        let tmp_1 = m32 * m23;
        let tmp_2 = m12 * m33;
        let tmp_3 = m32 * m13;
        let tmp_4 = m12 * m23;
        let tmp_5 = m22 * m13;
        let tmp_6 = m02 * m33;
        let tmp_7 = m32 * m03;
        let tmp_8 = m02 * m23;
        let tmp_9 = m22 * m03;
        let tmp_10 = m02 * m13;
        let tmp_11 = m12 * m03;
        let tmp_12 = m20 * m31;
        let tmp_13 = m30 * m21;
        let tmp_14 = m10 * m31;
        let tmp_15 = m30 * m11;
        let tmp_16 = m10 * m21;
        let tmp_17 = m20 * m11;
        let tmp_18 = m00 * m31;
        let tmp_19 = m30 * m01;
        let tmp_20 = m00 * m21;
        let tmp_21 = m20 * m01;
        let tmp_22 = m00 * m11;
        let tmp_23 = m10 * m01;
        var t0 = (tmp_0 * m11 + tmp_3 * m21 + tmp_4 * m31) -
            (tmp_1 * m11 + tmp_2 * m21 + tmp_5 * m31);
        var t1 = (tmp_1 * m01 + tmp_6 * m21 + tmp_9 * m31) -
            (tmp_0 * m01 + tmp_7 * m21 + tmp_8 * m31);
        var t2 = (tmp_2 * m01 + tmp_7 * m11 + tmp_10 * m31) -
            (tmp_3 * m01 + tmp_6 * m11 + tmp_11 * m31);
        var t3 = (tmp_5 * m01 + tmp_8 * m11 + tmp_11 * m21) -
            (tmp_4 * m01 + tmp_9 * m11 + tmp_10 * m21);
        var d = 1.0 / (m00 * t0 + m10 * t1 + m20 * t2 + m30 * t3);
        return [
            d * t0,
            d * t1,
            d * t2,
            d * t3,
            d * ((tmp_1 * m10 + tmp_2 * m20 + tmp_5 * m30) -
                (tmp_0 * m10 + tmp_3 * m20 + tmp_4 * m30)),
            d * ((tmp_0 * m00 + tmp_7 * m20 + tmp_8 * m30) -
                (tmp_1 * m00 + tmp_6 * m20 + tmp_9 * m30)),
            d * ((tmp_3 * m00 + tmp_6 * m10 + tmp_11 * m30) -
                (tmp_2 * m00 + tmp_7 * m10 + tmp_10 * m30)),
            d * ((tmp_4 * m00 + tmp_9 * m10 + tmp_10 * m20) -
                (tmp_5 * m00 + tmp_8 * m10 + tmp_11 * m20)),
            d * ((tmp_12 * m13 + tmp_15 * m23 + tmp_16 * m33) -
                (tmp_13 * m13 + tmp_14 * m23 + tmp_17 * m33)),
            d * ((tmp_13 * m03 + tmp_18 * m23 + tmp_21 * m33) -
                (tmp_12 * m03 + tmp_19 * m23 + tmp_20 * m33)),
            d * ((tmp_14 * m03 + tmp_19 * m13 + tmp_22 * m33) -
                (tmp_15 * m03 + tmp_18 * m13 + tmp_23 * m33)),
            d * ((tmp_17 * m03 + tmp_20 * m13 + tmp_23 * m23) -
                (tmp_16 * m03 + tmp_21 * m13 + tmp_22 * m23)),
            d * ((tmp_14 * m22 + tmp_17 * m32 + tmp_13 * m12) -
                (tmp_16 * m32 + tmp_12 * m12 + tmp_15 * m22)),
            d * ((tmp_20 * m32 + tmp_12 * m02 + tmp_19 * m22) -
                (tmp_18 * m22 + tmp_21 * m32 + tmp_13 * m02)),
            d * ((tmp_18 * m12 + tmp_23 * m32 + tmp_15 * m02) -
                (tmp_22 * m32 + tmp_14 * m02 + tmp_19 * m12)),
            d * ((tmp_22 * m22 + tmp_16 * m02 + tmp_21 * m12) -
                (tmp_20 * m12 + tmp_23 * m22 + tmp_17 * m02))
        ];
    }
    static translation(tx, ty, tz) {
        return [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            tx, ty, tz, 1,
        ];
    }
    static zRotation(angleInRad) {
        let c = Math.cos(angleInRad);
        let s = Math.sin(angleInRad);
        return [
            c, -s, 0, 0,
            s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ];
    }
    static yRotation(angleInRad) {
        let c = Math.cos(angleInRad);
        let s = Math.sin(angleInRad);
        return [
            c, 0, s, 0,
            0, 1, 0, 0,
            -s, 0, c, 0,
            0, 0, 0, 1,
        ];
    }
    static xRotation(angleInRad) {
        let c = Math.cos(angleInRad);
        let s = Math.sin(angleInRad);
        return [
            1, 0, 0, 0,
            0, c, -s, 0,
            0, s, c, 0,
            0, 0, 0, 1,
        ];
    }
    static scaling(sx, sy, sz) {
        return [
            sx, 0, 0, 0,
            0, sy, 0, 0,
            0, 0, sz, 0,
            0, 0, 0, 1,
        ];
    }
    static perspective(fieldOfViewInRadians, aspect, near, far) {
        let f = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
        let rangeInv = 1.0 / (near - far);
        return [
            f / aspect, 0, 0, 0,
            0, f, 0, 0,
            0, 0, (near + far) * rangeInv, -1,
            0, 0, near * far * rangeInv * 2, 0,
        ];
    }
    static ortographic(left, right, bottom, top, near, far) {
        // Note: This matrix flips the Y axis so 0 is at the top.
        return [
            2.0 / (right - left), 0, 0, 0,
            0, 2.0 / (top - bottom), 0, 0,
            0, 0, 2.0 / (near - far), 0,
            (left + right) / (left - right),
            (bottom + top) / (bottom - top),
            (near + far) / (near - far),
            1,
        ];
    }
    static lookAt(position, target) {
        let zAxis = normalize(subtractVec(position, target));
        let xAxis = normalize(cross([0, 1, 0], zAxis));
        let yAxis = normalize(cross(zAxis, xAxis));
        return [
            xAxis[0], xAxis[1], xAxis[2], 0,
            yAxis[0], yAxis[1], yAxis[2], 0,
            zAxis[0], zAxis[1], zAxis[2], 0,
            position[0], position[1], position[2], 1,
        ];
    }
    static translate(m, tx, ty, tz) {
        return this.multiply(m, this.translation(tx, ty, tz));
    }
    static xRotate(m, angleInRad) {
        return this.multiply(m, this.xRotation(angleInRad));
    }
    static yRotate(m, angleInRad) {
        return this.multiply(m, this.yRotation(angleInRad));
    }
    static zRotate(m, angleInRad) {
        return this.multiply(m, this.zRotation(angleInRad));
    }
    static scale(m, sx, sy, sz) {
        return this.multiply(m, this.scaling(sx, sy, sz));
    }
}
let translation = [0, 0, 0];
let width = 100;
let height = 30;
let clientDepth = 400;
let rotation = [0, 0, 0];
let scale = [1, 1, 1];
const color = [Math.random(), Math.random(), 1, 1];
// camera stuff
let fovV = toRad(60);
let cameraAngleInRad = toRad(0);
let cameraPosition = [0, 0, 0];
let cameraTarget = [0, 0, -1];
let zoom = 1.5;
const canvas = document.getElementById('my_canvas');
const sliderScaleX = document.getElementById('scale-x-slider');
const fovScale = document.getElementById('fov-slider');
const cameraRot = document.getElementById('camera-rotate');
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
const ortographicTransformLocation = gl.getUniformLocation(program, "u_ortographicTransform");
const positionBuffer = gl.createBuffer();
// bind to ARRAY BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// put geometry data into buffer
setGeometry(gl);
drawScene();
sliderScaleX.oninput = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
    zoom = value;
    drawScene();
};
fovScale.oninput = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
    let valueInRad = (value * Math.PI) / 180.0;
    fovV = valueInRad;
    drawScene();
};
cameraRot.oninput = (event) => {
    const target = event.target;
    const value = parseFloat(target.value);
    cameraAngleInRad = toRad(value);
    drawScene();
};
function drawScene() {
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    // clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    // only draw faces with normal facing forward
    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    // tell it to use the shaders
    gl.useProgram(program);
    // turn on attribute
    gl.enableVertexAttribArray(positionLocation);
    // bind position buffer
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const size = 3; // 3 components per iteration (x, y, z, w) will only take on  x, y and z
    const type = gl.FLOAT; // the data is 32bit floats
    const normalize = false; // don't normalize the data
    const stride = 0; // 0 = move forward size * sizeof(type) each itteration to get the next position
    const offsetBuffer = 0; // start at the beginning of the buffer
    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offsetBuffer);
    // set uniform color
    gl.uniform4fv(colorLocation, color);
    // create transform matrix
    let left = 0;
    let right = gl.canvas.width;
    let top = 0;
    let bottom = gl.canvas.height;
    let near = 500;
    let far = -500;
    let aspect = right / bottom;
    let zNear = 1;
    let zFar = 2000;
    let ortographicMatrix = m4.ortographic(left, right, bottom, top, near, far);
    let projectionMatrix = myMath.perspective(fovV, aspect, zNear, zFar);
    // camera stuff
    let numFs = 5;
    let radius = 200;
    let fPosition = [radius, 0, 0];
    let cameraMatrix = m4.yRotation(cameraAngleInRad);
    cameraMatrix = m4.translate(cameraMatrix, 0, 0, radius * zoom);
    cameraPosition = [
        cameraMatrix[12],
        cameraMatrix[13],
        cameraMatrix[14],
    ];
    let cameraMatrixLookAt = myMath.lookAt(cameraPosition, fPosition, [0, 1, 0]);
    let viewMatrix = myMath.inverse(cameraMatrixLookAt);
    let viewProjectionMatrix = myMath.multiply(projectionMatrix, viewMatrix);
    for (let ii = 0; ii < numFs; ++ii) {
        let angle = ii * Math.PI * 2 / numFs;
        let x = Math.cos(angle) * radius;
        var y = Math.sin(angle) * radius;
        // starting with the view projection matrix
        // compute a matrix for the F
        let matrix = m4.translate(viewProjectionMatrix, x, 0, y);
        let matrixO = m4.translate(ortographicMatrix, x, 0, y);
        // Set the matrix.
        gl.uniformMatrix4fv(ortographicTransformLocation, false, matrixO);
        gl.uniformMatrix4fv(transformLocation, false, matrix);
        // Draw the geometry.
        var primitiveType = gl.TRIANGLES;
        var offset = 0;
        var count = 6 * 6; //16 * 6;
        gl.drawArrays(primitiveType, offset, count);
    }
    // let transformM = m4.ortographic(left,right,bottom,top,near,far); //m4.perspective(fovV, aspect, zNear, zFar);
    // transformM = m4.translate(transformM,translation[0], translation[1], translation[2]);
    // transformM = m4.xRotate(transformM,rotation[0]);
    // transformM = m4.yRotate(transformM,rotation[1]);
    // transformM = m4.zRotate(transformM,rotation[2]);
    // transformM = m4.scale(transformM,scale[0], scale[0], scale[0]);
    // // set uniforms
    // gl.uniformMatrix4fv(transformLocation, false,transformM);
    // gl.uniform4fv(colorLocation, color);
    // const primitveType : GLenum = gl.TRIANGLES;
    // const offsetData : GLint = 0;
    // const count : GLsizei = 16 * 6; 
    // gl.drawArrays(primitveType, offsetData, count);
}
function toRad(deg) {
    return (deg * Math.PI) / 180.0;
}
function cross(a, b) {
    return [a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0]];
}
function subtractVec(a, b) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}
function normalize(a) {
    let length = Math.sqrt(a[0] * a[0] + a[1] * a[1] + a[2] * a[2]);
    if (length > 0.001) {
        return [
            a[0] / length,
            a[1] / length,
            a[2] / length,
        ];
    }
    else {
        return [0, 0, 0];
    }
}
// Fill the buffer with the values that define a letter 'F'.
function setGeometry(gl) {
    const cubeObj = primitives.createCube(30, false);
    const posData = cubeObj.a_position;
    let positions = new Float32Array(posData.dataArray);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}
