export {}; // Makes this file a module

import { AttributeArrayInfo, myWebglUtils } from '../utils/myWebglUtils.js';
import { myMath, Vector3 } from '../utils/myMathUtils.js';
import { primitives } from "../utils/myPrimitives.js";


    class m4 {
        static vectorMultiply(v: number[], m: number[]) {
            let dst : number[] = [];
            for (let i : number = 0; i < 4; ++i) {
                dst[i] = 0.0;
                for (var j = 0; j < 4; ++j) {
                    dst[i] += v[j] * m[j * 4 + i];
                }
            }
            return dst;
        }
         static multiply(a : number[], b : number[]) {
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

         static inverse(m : number[]) {
        let m00 : number = m[0 * 4 + 0];
        let m01 : number = m[0 * 4 + 1];
        let m02 : number = m[0 * 4 + 2];
        let m03 : number = m[0 * 4 + 3];
        let m10 : number = m[1 * 4 + 0];
        let m11 : number = m[1 * 4 + 1];
        let m12 : number = m[1 * 4 + 2];
        let m13 : number = m[1 * 4 + 3];
        let m20 : number = m[2 * 4 + 0];
        let m21 : number = m[2 * 4 + 1];
        let m22 : number = m[2 * 4 + 2];
        let m23 : number = m[2 * 4 + 3];
        let m30 : number = m[3 * 4 + 0];
        let m31 : number = m[3 * 4 + 1];
        let m32 : number = m[3 * 4 + 2];
        let m33 : number = m[3 * 4 + 3];
        let tmp_0  = m22 * m33;
        let tmp_1  = m32 * m23;
        let tmp_2  = m12 * m33;
        let tmp_3  = m32 * m13;
        let tmp_4  = m12 * m23;
        let tmp_5  = m22 * m13;
        let tmp_6  = m02 * m33;
        let tmp_7  = m32 * m03;
        let tmp_8  = m02 * m23;
        let tmp_9  = m22 * m03;
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
        static translation( tx: number, ty : number, tz : number) {
            return [
                1,0,0,0,
                0,1,0,0,
                0,0,1,0,
                tx,ty,tz,1,
            ];
        }

        static zRotation( angleInRad: number) 
        {
            let c = Math.cos(angleInRad);
            let s = Math.sin(angleInRad);

            return [
                c,-s, 0, 0,
                s, c, 0, 0,
                0, 0, 1, 0,
                0, 0, 0, 1,
            ];
        }

        static yRotation( angleInRad: number) 
        {
            let c = Math.cos(angleInRad);
            let s = Math.sin(angleInRad);

            return [
                c, 0, s, 0,
                0, 1, 0, 0,
               -s, 0, c, 0,
                0, 0, 0, 1,
            ];
        }

        static xRotation( angleInRad: number) 
        {
            let c = Math.cos(angleInRad);
            let s = Math.sin(angleInRad);

            return [
                1, 0, 0, 0,
                0, c,-s, 0,
                0, s, c, 0,
                0, 0, 0, 1,
            ];
        }

        static scaling(sx : number, sy : number, sz : number) 
        {
            return [
                sx,0,0,0,
                0,sy,0,0,
                0,0,sz,0,
                0,0,0,1,
            ];
        }

        static perspective(fieldOfViewInRadians : number, aspect : number, near : number, far : number ) 
        {
            let f : number = Math.tan(Math.PI * 0.5 - 0.5 * fieldOfViewInRadians);
            let rangeInv : number = 1.0 / (near -far);

            return [
                f / aspect , 0, 0, 0,
                0, f, 0, 0,
                0, 0, (near + far) * rangeInv, -1,
                0, 0, near * far * rangeInv * 2, 0,
            ];
        }

        static ortographic(left : number, right : number, bottom : number, top : number, near : number, far : number) 
        {
            // Note: This matrix flips the Y axis so 0 is at the top.
            return [
                2.0/(right-left), 0, 0, 0,
                0, 2.0/(top - bottom), 0, 0,
                0, 0, 2.0 /(near - far), 0,
 
                (left + right) / (left - right),
                (bottom + top) / (bottom - top),
                (near + far) / (near - far),
                1,
            ];
        }

        static lookAt(position : number[], target : number[]) 
        {
            let zAxis : number[] = normalize(subtractVec(position,target));
            let xAxis : number[] = normalize(cross([0,1,0], zAxis));
            let yAxis : number[] = normalize(cross(zAxis, xAxis));

            return [
                xAxis[0], xAxis[1], xAxis[2], 0,
                yAxis[0], yAxis[1], yAxis[2], 0,
                zAxis[0], zAxis[1], zAxis[2], 0,
                position[0], position[1], position[2], 1,
            ]
        } 

        static translate(m : number[], tx: number, ty : number, tz : number) 
        {
            return this.multiply(m,this.translation(tx,ty,tz));
        }

        static xRotate(m : number[], angleInRad: number) 
        {
            return this.multiply(m,this.xRotation(angleInRad));
        }

        static yRotate(m : number[], angleInRad: number) 
        {
            return this.multiply(m,this.yRotation(angleInRad));
        }

        static zRotate(m : number[], angleInRad: number) 
        {
            return this.multiply(m,this.zRotation(angleInRad));
        }

        static scale(m : number[], sx : number, sy : number, sz : number) 
        {
            return this.multiply(m, this.scaling(sx,sy,sz));
        }

    }

let translation : number[] = [0,0,0];
let width : number = 100;
let height : number = 30;
let clientDepth = 400;
let rotation : number[] = [0,0,0];
let scale : number[] = [1,1,1];
const color : number[] = [Math.random(),Math.random(),1,1];

// camera stuff
let fovV : number = toRad(60);
let cameraAngleInRad : number = toRad(0);
let cameraPosition : number[] = [0,0,0];
let cameraTarget : number[] = [0,0,-1];
let zoom : number = 1.5;

const canvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const sliderScaleX = document.getElementById('scale-x-slider') as HTMLInputElement;


const fovScale = document.getElementById('fov-slider') as HTMLInputElement;
const cameraRot = document.getElementById('camera-rotate') as HTMLInputElement;

const gl = canvas?.getContext('webgl') as WebGLRenderingContext;

if(!gl) 
{
    throw new Error('WebGL not supported');
}



const program = await myWebglUtils.createProgramFromScripts(gl, 'shaders/vertex.glsl', 'shaders/fragment.glsl');

if(!program) 
{
    throw new Error('shader program failed');
}

// look up attrib
const positionLocation : number = gl.getAttribLocation(program, 'a_position');

// look up uniforms
const colorLocation = gl.getUniformLocation(program, "u_color");
const transformLocation = gl.getUniformLocation(program, "u_transform");
const ortographicTransformLocation = gl.getUniformLocation(program, "u_ortographicTransform");

const positionBuffer = gl.createBuffer() as WebGLBuffer;

// bind to ARRAY BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

// put geometry data into buffer
setGeometry(gl);

drawScene();

sliderScaleX.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value);
    
    zoom = value;
    drawScene();

}

fovScale.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value);
    
    let valueInRad = (value * Math.PI) / 180.0;

    fovV = valueInRad;
    drawScene();
}

cameraRot.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value);
    
    cameraAngleInRad = toRad(value);
    drawScene();
}

function drawScene() 
{
    gl.viewport(0,0,gl.canvas.width, gl.canvas.height);

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

    const size : number = 3;            // 3 components per iteration (x, y, z, w) will only take on  x, y and z
    const type : GLenum = gl.FLOAT;     // the data is 32bit floats
    const normalize : boolean = false;  // don't normalize the data
    const stride : number = 0;          // 0 = move forward size * sizeof(type) each itteration to get the next position
    const offsetBuffer : number = 0;          // start at the beginning of the buffer

    gl.vertexAttribPointer(positionLocation, size, type, normalize, stride, offsetBuffer);


    // set uniform color
    gl.uniform4fv(colorLocation, color);

    // create transform matrix
    let left : number = 0;
    let right : number = gl.canvas.width;
    let top : number = 0;
    let bottom : number = gl.canvas.height;
    let near = 500;
    let far = -500;
    
    let aspect = right / bottom;
    let zNear = 1;
    let zFar = 2000;

    let ortographicMatrix = m4.ortographic(left,right,bottom,top,near,far);
    let projectionMatrix = myMath.perspective(fovV,aspect,zNear, zFar);

    // camera stuff
    let numFs : number = 5;
    let radius : number = 200;
    let fPosition : number[] = [radius, 0,0];

    let cameraMatrix = m4.yRotation(cameraAngleInRad);
    cameraMatrix = m4.translate(cameraMatrix, 0,0, radius * zoom);

    cameraPosition = [
        cameraMatrix[12],
        cameraMatrix[13],
        cameraMatrix[14],
    ];

    let cameraMatrixLookAt = myMath.lookAt(cameraPosition as Vector3, fPosition as Vector3, [0,1,0]);

    let viewMatrix = myMath.inverse(cameraMatrixLookAt);

    let viewProjectionMatrix = myMath.multiply(projectionMatrix, viewMatrix);


    for (let ii : number = 0; ii < numFs; ++ii) {
      let angle : number = ii * Math.PI * 2 / numFs;
      let x : number  = Math.cos(angle) * radius;
      var y : number = Math.sin(angle) * radius
     
      // starting with the view projection matrix
      // compute a matrix for the F
      let matrix = m4.translate(viewProjectionMatrix, x, 0, y);
      let matrixO = m4.translate(ortographicMatrix,x,0,y);
     
      // Set the matrix.
      gl.uniformMatrix4fv(ortographicTransformLocation,false, matrixO);
      gl.uniformMatrix4fv(transformLocation, false, matrix);
     
      // Draw the geometry.
      var primitiveType = gl.TRIANGLES;
      var offset = 0;
      var count = 6*6;//16 * 6;
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


function toRad(deg : number) : number
{
    return (deg * Math.PI) / 180.0;
}

function cross(a : number[], b : number[]) : number[] {
    return [a[1] * b[2] - a[2] * b[1],
            a[2] * b[0] - a[0] * b[2],
            a[0] * b[1] - a[1] * b[0]];
}

function subtractVec(a : number[], b : number[]) {
    return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
}

function normalize(a: number[]) 
{
    let length = Math.sqrt(a[0]*a[0] + a[1]*a[1] + a[2]*a[2]);
    if(length > 0.001) {
        return [
            a[0] / length,
            a[1] / length,
            a[2] / length,
        ];
    }
    else { return [0,0,0]; }

}

// Fill the buffer with the values that define a letter 'F'.
function setGeometry(gl : WebGLRenderingContext) {

    const cubeObj = primitives.createCube(30,false);
    const posData : AttributeArrayInfo = cubeObj.a_position as AttributeArrayInfo;
    let positions = new Float32Array(posData.dataArray);

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}
