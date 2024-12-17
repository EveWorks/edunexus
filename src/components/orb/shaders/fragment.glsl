varying vec2 vUv;
varying float vPattern;
uniform float uTime;
uniform float uAudioFrequency;

struct Color {
    vec3 color;
    float position;
};

#define COLOR_RAMP(colors, factor, finalColor) { \
    int index = 0; \
    for(int i = 0; i < colors.length() - 1; i++){ \
       Color currentColor = colors[i]; \
       bool isInBetween = currentColor.position <= factor; \
       index = int(mix(float(index), float(i), float(isInBetween))); \
    } \
    Color currentColor = colors[index]; \
    Color nextColor = colors[index + 1]; \
    float range = nextColor.position - currentColor.position; \
    float lerpFactor = (factor - currentColor.position) / range; \
    finalColor = mix(currentColor.color, nextColor.color, lerpFactor); \
} \

void main() {
    float time = uTime * (1.0 + uAudioFrequency);
    vec3 color;
    vec3 mainColor = vec3(3, 1.2, 0.1);

    Color[4] colors = Color[](
        Color(vec3(1), 0.0),
        Color(vec3(1), 0.01),
        Color(mainColor, 0.1),
        Color(vec3(0.05, 0.1, 0.2), 1.0)
    );
    COLOR_RAMP(colors, vPattern, color);
    gl_FragColor = vec4(color, 1);
}

