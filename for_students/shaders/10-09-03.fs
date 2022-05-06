/* Procedural shading example */
/* the student should make this more interesting */

/* pass interpolated variables to from the vertex */
varying vec2 v_uv;
uniform float x;

void main()
{
    float xp = v_uv.x * 50.;
    float yp = v_uv.y * 5. -2.5;

    float d = cos(xp) + cos(yp);
    vec3 color = mix(vec3(xp,yp,0.),vec3(1.,0.3,0.3),d);

    gl_FragColor = vec4(color, 1.);
}

