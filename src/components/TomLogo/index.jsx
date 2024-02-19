import { useNavigate } from "react-router-dom";

const TomLogo = ({ color, size = 50 }) => {
  const navigate = useNavigate();
  return (
    <svg
      onClick={() => navigate("/")}
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      width={`${size}pt`}
      height={`${size}pt`}
      viewBox="0 0 500.000000 500.000000"
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)"
        fill={color}
        stroke="none"
      >
        <path
          d="M170 3755 l0 -135 420 0 420 0 0 -1080 0 -1080 135 0 135 0 0 268 c0
259 -1 270 -21 288 -34 30 -104 134 -143 211 -59 118 -87 229 -93 374 -11 242
48 434 193 625 l64 86 0 154 0 154 425 0 426 0 -3 133 -3 132 -977 3 -978 2 0
-135z"
        />
        <path
          d="M2656 3604 l-49 -256 50 -51 c121 -126 202 -283 242 -467 14 -68 80
-223 321 -763 167 -372 307 -677 310 -677 3 0 154 330 335 732 407 907 397
885 401 873 3 -6 69 -349 147 -763 79 -413 146 -754 149 -757 3 -3 61 -4 129
-3 l124 3 -226 1175 c-124 646 -227 1184 -230 1195 -2 11 -170 -363 -414 -928
-226 -520 -412 -946 -415 -946 -3 -1 -187 421 -409 937 -222 515 -407 940
-410 944 -4 4 -29 -107 -55 -248z"
        />
        <path
          d="M1830 3514 c-365 -71 -642 -335 -716 -684 -16 -78 -18 -244 -3 -325
31 -170 132 -351 264 -472 333 -307 835 -308 1178 -3 105 93 210 268 253 420
26 92 26 328 0 420 -27 96 -109 256 -169 330 -109 133 -288 250 -452 295 -59
16 -301 29 -355 19z m267 -179 c120 -22 245 -89 336 -178 81 -79 131 -157 173
-269 22 -59 28 -95 32 -190 6 -144 -12 -234 -70 -351 -59 -118 -180 -238 -298
-295 -47 -23 -114 -49 -150 -59 -85 -21 -235 -21 -320 2 -230 60 -432 262
-496 495 -28 103 -24 273 9 375 37 112 90 198 177 286 61 61 95 85 170 123
150 74 276 91 437 61z"
        />
        <path
          d="M2571 1916 c-19 -23 -164 -114 -218 -137 -26 -11 -49 -21 -50 -23 -3
-3 -53 -259 -53 -273 0 -10 32 -13 128 -13 l127 0 43 226 c23 125 41 228 39
231 -2 2 -10 -3 -16 -11z"
        />
      </g>
    </svg>
  );
};

export default TomLogo;