import React from 'react';
import styled, { css } from 'styled-components';
import { useSpring, useTrail, animated } from 'react-spring';
import  { ThemeContext}  from '../../lib/theme/index';
import { mobileBreakpoint } from 'lib/function/responsive';
const QUERY = '(prefers-reduced-motion: no-preference)';


function usePrefersReducedMotion() {
  const [
    prefersReducedMotion,
    setPrefersReducedMotion,
  ] = React.useState(false);

  React.useEffect(() => {
    setPrefersReducedMotion(!window.matchMedia(QUERY).matches);

    const mediaQueryList = window.matchMedia(QUERY);

    const listener = (event) => {
      setPrefersReducedMotion(!event.matches);
    };

    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener('change', listener);
    } else {
      mediaQueryList.addListener(listener);
    }

    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener('change', listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [setPrefersReducedMotion]);

  return prefersReducedMotion;
}


const UnstyledButton = styled.button`
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 40px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  border: none;
  background: transparent;
  cursor: pointer;
  text-align: left;
  font: inherit;
  svg {
    overflow: visible;
  }
`;

export const DarkModeToggle = ({
  colorMode,
  setColorMode,
  size = 18,
  id = 'main-nav',
  isMobile,
  ...delegated
}) => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const isDark = colorMode === 'dark';

  function toggleColorMode(event) {
    event.preventDefault();
    setColorMode();
  }

  const svgSpring = useSpring({
    transform: isDark ? 'rotate(40deg)' : 'rotate(90deg)',
    immediate: prefersReducedMotion,
  });
  const maskSpring = useSpring({
    cx: isDark ? 10 : 25,
    cy: isDark ? 2 : 0,
    config: {
      mass: 3.1,
      friction: 21,
    },
    immediate: prefersReducedMotion,
  });
  const sunMoonSpring = useSpring({
    r: isDark ? 8 : 5,
    immediate: prefersReducedMotion,
  });

  const sunDotAngles = [0, 60, 120, 180, 240, 300];

  const sunDotTrail = useTrail(sunDotAngles.length, {
    transform: isDark ? 0 : 1,
    transformOrigin: 'center center',
    immediate: isDark || prefersReducedMotion,
    config: {
      tension: 210,
      friction: 20,
    },
  });

  return (
    <IconWrapper
      isMobile = {isMobile}
      onClick={toggleColorMode}
      aria-label={isDark ? 'Activate light mode' : 'Activate dark mode'}
      title={isDark ? 'Activate light mode' : 'Activate dark mode'}
      {...delegated}
    >
      <MoonOrSun
        width={size}
        height={size}
        viewBox="0 0 18 18"
        style={svgSpring}
      >
        <mask id={`moon-mask-${id}`}>
          <rect x="0" y="0" width="18" height="18" fill="#FFF" />
          <animated.circle {...maskSpring} r="8" fill="black" />
        </mask>

        <animated.circle
          cx="9"
          cy="9"
          fill="var(--color-text)"
          mask={`url(#moon-mask-${id})`}
          {...sunMoonSpring}
        />

        {/* Sun dots */}
        <g>
          {sunDotTrail.map(({ transform, ...props }, index) => {
            const angle = sunDotAngles[index];
            const centerX = 9;
            const centerY = 9;

            const angleInRads = (angle / 180) * Math.PI;

            const c = 8; // hypothenuse
            const a = centerX + c * Math.cos(angleInRads);
            const b = centerY + c * Math.sin(angleInRads);

            return (
              <animated.circle
                key={angle}
                cx={a}
                cy={b}
                r={1.5}
                fill="var(--color-text)"
                style={{
                  ...props,
                  transform: transform.interpolate((t) => `scale(${t})`),
                }}
              />
            );
          })}
        </g>
      </MoonOrSun>
    </IconWrapper>
  );
};

const IconWrapper = styled(UnstyledButton)`
  opacity: 0.7;
  position: relative;
  border-radius: 5px;
  width: 40px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity ease-in .5s;
  ${p=>mobileBreakpoint(!p.isMobile && "display : none;")}
`;

const MoonOrSun = styled(animated.svg)`
  position: relative;
  overflow: visible;
`;

const DarkModeToggleContainer = (delegated) => {
  const { colorMode, toggleColorMode } = React.useContext(ThemeContext);
  return (
    <DarkModeToggle
      colorMode={colorMode}
      setColorMode={toggleColorMode}
      {...delegated}
    />
  );
};

export default DarkModeToggleContainer;
