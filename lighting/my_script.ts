export {}; // Makes this file a module


import { myWebglUtils } from '../utils/myWebglUtils.js';


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
         static transpose (m : number[]) {
            return [
                m[0], m[4], m[8], m[12],
                m[1], m[5], m[9], m[13],
                m[2], m[6], m[10], m[14],
                m[3], m[7], m[11], m[15],
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


const color : number[] = [Math.random(),Math.random(),1,1];

// camera stuff
let fovV : number = toRad(60);
let cameraAngleInRad : number = toRad(0);
let cameraPosition : number[] = [0,0,0];
let cameraTarget : number[] = [0,0,-1];
let zoom : number = 1.5;
let shininess : number = 200;

const canvas = document.getElementById('my_canvas') as HTMLCanvasElement;
const cameraRot = document.getElementById('camera-rotate') as HTMLInputElement;
const shineSlider = document.getElementById('shine-slider') as HTMLInputElement;

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
const normalLocation : number = gl.getAttribLocation(program, "a_normal");

// look up uniforms
const colorLocation = gl.getUniformLocation(program, "u_color");
const transformLocation = gl.getUniformLocation(program, "u_transform");
const transformWorldLocation = gl.getUniformLocation(program, "u_worldInverseTranspose");
const worldMatrixLocation = gl.getUniformLocation(program, "u_world");
const worldLightPosLocation = gl.getUniformLocation(program, "u_worldLightPos");
const viewWorldPosLocation = gl.getUniformLocation(program, "u_viewWorldPos");
const shininessLocation = gl.getUniformLocation(program, "u_shininess");

// fill the position buffer
const positionBuffer = gl.createBuffer() as WebGLBuffer;
// bind to ARRAY BUFFER
gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
// put geometry data into buffer
setGeometry(gl);

// fill the normal buffer
const normalBuffer = gl.createBuffer() as WebGLBuffer;
gl.bindBuffer(gl.ARRAY_BUFFER, normalBuffer);
setNormals(gl);

drawScene();

cameraRot.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value);
    
    cameraAngleInRad = toRad(value);
    drawScene();
}

shineSlider.oninput = (event) => {
    const target = event.target as HTMLInputElement;
    const value : number = parseFloat(target.value);
    
    shininess = Math.max(1.0,Math.min(value,300.0));
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
    const norm : boolean = false;  // don't normalize the data
    const stride : number = 0;          // 0 = move forward size * sizeof(type) each itteration to get the next position
    const offsetBuffer : number = 0;          // start at the beginning of the buffer

    gl.vertexAttribPointer(positionLocation, size, type, norm, stride, offsetBuffer);

    // turn on normal attribute
    gl.enableVertexAttribArray(normalLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER,normalBuffer);
    gl.vertexAttribPointer(normalLocation, size, type, norm, stride, offsetBuffer);


    // set uniform color
    gl.uniform4fv(colorLocation, color);

    // create transform matrix
    let aspect = gl.canvas.width / gl.canvas.height;
    let zNear = 1;
    let zFar = 2000;

    let projectionMatrix = m4.perspective(fovV,aspect,zNear, zFar);

    // camera stuff
    let camera : number[] = [100, 150, 200];
    let target : number[] = [0, 35, 0];

    let cameraMatrixLookAt = m4.lookAt(camera, target);

    let viewMatrix = m4.inverse(cameraMatrixLookAt);

    let viewProjectionMatrix = m4.multiply(projectionMatrix, viewMatrix);


    let worldMatrix = m4.yRotation(cameraAngleInRad);
    let worldMatrixInv  = m4.inverse(worldMatrix);
    let worldMatrixInvT = m4.transpose(worldMatrixInv);

    let worldViewProjectionMatrix = m4.multiply(viewProjectionMatrix, worldMatrix);

    // Set the matrix.
    gl.uniformMatrix4fv(transformLocation, false, worldViewProjectionMatrix);
    gl.uniformMatrix4fv(transformWorldLocation, false, worldMatrixInvT);
    gl.uniformMatrix4fv(worldMatrixLocation,false, worldMatrix);
    gl.uniform3fv(worldLightPosLocation, [20,30,50]);
    gl.uniform3fv(viewWorldPosLocation, camera);
    gl.uniform1f(shininessLocation, shininess);
    
    // Draw the geometry.
    var primitiveType = gl.TRIANGLES;
    var offset = 0;
    var count = 16 * 6;
    gl.drawArrays(primitiveType, offset, count);
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
  let positions = new Float32Array([
          // left column front
          0,   0,  0,
          0, 150,  0,
          30,   0,  0,
          0, 150,  0,
          30, 150,  0,
          30,   0,  0,

          // top rung front
          30,   0,  0,
          30,  30,  0,
          100,   0,  0,
          30,  30,  0,
          100,  30,  0,
          100,   0,  0,

          // middle rung front
          30,  60,  0,
          30,  90,  0,
          67,  60,  0,
          30,  90,  0,
          67,  90,  0,
          67,  60,  0,

          // left column back
            0,   0,  30,
           30,   0,  30,
            0, 150,  30,
            0, 150,  30,
           30,   0,  30,
           30, 150,  30,

          // top rung back
           30,   0,  30,
          100,   0,  30,
           30,  30,  30,
           30,  30,  30,
          100,   0,  30,
          100,  30,  30,

          // middle rung back
           30,  60,  30,
           67,  60,  30,
           30,  90,  30,
           30,  90,  30,
           67,  60,  30,
           67,  90,  30,

          // top
            0,   0,   0,
          100,   0,   0,
          100,   0,  30,
            0,   0,   0,
          100,   0,  30,
            0,   0,  30,

          // top rung right
          100,   0,   0,
          100,  30,   0,
          100,  30,  30,
          100,   0,   0,
          100,  30,  30,
          100,   0,  30,

          // under top rung
          30,   30,   0,
          30,   30,  30,
          100,  30,  30,
          30,   30,   0,
          100,  30,  30,
          100,  30,   0,

          // between top rung and middle
          30,   30,   0,
          30,   60,  30,
          30,   30,  30,
          30,   30,   0,
          30,   60,   0,
          30,   60,  30,

          // top of middle rung
          30,   60,   0,
          67,   60,  30,
          30,   60,  30,
          30,   60,   0,
          67,   60,   0,
          67,   60,  30,

          // right of middle rung
          67,   60,   0,
          67,   90,  30,
          67,   60,  30,
          67,   60,   0,
          67,   90,   0,
          67,   90,  30,

          // bottom of middle rung.
          30,   90,   0,
          30,   90,  30,
          67,   90,  30,
          30,   90,   0,
          67,   90,  30,
          67,   90,   0,

          // right of bottom
          30,   90,   0,
          30,  150,  30,
          30,   90,  30,
          30,   90,   0,
          30,  150,   0,
          30,  150,  30,

          // bottom
          0,   150,   0,
          0,   150,  30,
          30,  150,  30,
          0,   150,   0,
          30,  150,  30,
          30,  150,   0,

          // left side
          0,   0,   0,
          0,   0,  30,
          0, 150,  30,
          0,   0,   0,
          0, 150,  30,
          0, 150,   0]);

  // Center the F around the origin and Flip it around. We do this because
  // we're in 3D now with and +Y is up where as before when we started with 2D
  // we had +Y as down.

  // We could do by changing all the values above but I'm lazy.
  // We could also do it with a matrix at draw time but you should
  // never do stuff at draw time if you can do it at init time.
  let matrix = m4.xRotation(Math.PI);
  matrix = m4.translate(matrix, -50, -75, -15);

  for (let ii : number = 0; ii < positions.length; ii += 3) {
    let vector = m4.vectorMultiply([positions[ii + 0], positions[ii + 1], positions[ii + 2], 1], matrix);
    positions[ii + 0] = vector[0];
    positions[ii + 1] = vector[1];
    positions[ii + 2] = vector[2];
  }

  gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
}

function setNormals(gl : WebGLRenderingContext) {
      let normals = new Float32Array([
              // left column front
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
     
              // top rung front
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
     
              // middle rung front
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
              0, 0, 1,
     
              // left column back
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
     
              // top rung back
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
     
              // middle rung back
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
              0, 0, -1,
     
              // top
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
     
              // top rung right
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
     
              // under top rung
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
     
              // between top rung and middle
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
     
              // top of middle rung
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
              0, 1, 0,
     
              // right of middle rung
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
     
              // bottom of middle rung.
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
     
              // right of bottom
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
              1, 0, 0,
     
              // bottom
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
              0, -1, 0,
     
              // left side
              -1, 0, 0,
              -1, 0, 0,
              -1, 0, 0,
              -1, 0, 0,
              -1, 0, 0,
              -1, 0, 0]);
      gl.bufferData(gl.ARRAY_BUFFER, normals, gl.STATIC_DRAW);
}
