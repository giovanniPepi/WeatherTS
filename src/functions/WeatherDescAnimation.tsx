import { ITitleAnimation, IWeatherDescAnimation } from 'interfaces';
import styled, { keyframes } from 'styled-components';

// yes, this needs to go outside...
// https://medium.com/geekculture/you-may-see-this-warning-because-youve-called-styled-inside-another-component-styled-components-7766b4740b22
const animation = keyframes`
0% {opacity: 0; transform: translateX(-250px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px);}
25%{opacity: 1; transform: translateX(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);} 
75%{opacity: 1; transform: translateX(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
100% {opacity: 0; transform: translateX(-250px) skewY(10deg) skewX(10deg) rotateZ(30deg); filter: blur(10px);}`;

const Wrapper = styled.div`
  display: inline;
  span {
    display: inline;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 6s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  span > * {
    display: inline;
  }
  span:nth-child(1) {
    animation-delay: 0.1s;
  }
  span:nth-child(2) {
    animation-delay: 0.2s;
  }
  span:nth-child(3) {
    animation-delay: 0.3s;
  }
  span:nth-child(4) {
    animation-delay: 0.4s;
  }
  span:nth-child(5) {
    animation-delay: 0.5s;
  }
  span:nth-child(6) {
    animation-delay: 0.6s;
  }

  span:nth-child(7) {
    animation-delay: 0.7s;
  }

  span:nth-child(8) {
    animation-delay: 0.8s;
  }

  span:nth-child(9) {
    animation-delay: 0.9s;
  }

  span:nth-child(10) {
    animation-delay: 1s;
  }

  span:nth-child(11) {
    animation-delay: 1.1s;
  }

  span:nth-child(12) {
    animation-delay: 1.2s;
  }

  span:nth-child(13) {
    animation-delay: 1.3s;
  }

  span:nth-child(14) {
    animation-delay: 1.4s;
  }

  span:nth-child(15) {
    animation-delay: 1.5s;
  }
`;

const WeatherDescAnimation: React.FC<ITitleAnimation> = ({
  title
}) => {
  const splitArray = title.split('');

  return (
    <Wrapper>
      {splitArray.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </Wrapper>
  );
};

export default WeatherDescAnimation;
