import { ITitleAnimation } from 'interfaces';
import styled, { keyframes } from 'styled-components';

// yes, this needs to go outside...
// https://medium.com/geekculture/you-may-see-this-warning-because-youve-called-styled-inside-another-component-styled-components-7766b4740b22
const animation = keyframes`
0% {opacity: 0.8; transform: translateX(-4px) skewY(2deg) skewX(2deg) rotateZ(4deg); filter: blur(0px);}
50%{opacity: 1; transform: translateX(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);} 
70%{opacity: 1; transform: translateX(0px) skewY(0deg) skewX(0deg) rotateZ(0deg); filter: blur(0px);}
100% {opacity: 0.8; transform: translateX(-4px) skewY(2deg) skewX(2deg) rotateZ(4deg); filter: blur(0px);}`;

const Wrapper = styled.div`
  display: inline-block;
  span {
    display: inline-block;
    opacity: 0;
    animation-name: ${animation};
    animation-duration: 4s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
  }
  span:nth-child(1) {
    animation-delay: 0.05s;
  }
  span:nth-child(2) {
    animation-delay: 0.1s;
  }
  span:nth-child(3) {
    animation-delay: 0.15s;
  }
  span:nth-child(4) {
    animation-delay: 0.2s;
  }
  span:nth-child(5) {
    animation-delay: 0.25s;
  }
  span:nth-child(6) {
    animation-delay: 0.3s;
  }
  span:nth-child(7) {
    animation-delay: 0.35s;
  }
  span:nth-child(8) {
    animation-delay: 0.4s;
  }
  span:nth-child(9) {
    animation-delay: 0.45s;
  }
  span:nth-child(10) {
    animation-delay: 0.5s;
  }
  span:nth-child(11) {
    animation-delay: 0.6s;
  }
  span:nth-child(12) {
    animation-delay: 0.65s;
  }
  span:nth-child(13) {
    animation-delay: 0.7s;
  }
  span:nth-child(14) {
    animation-delay: 0.75s;
  }
  span:nth-child(15) {
    animation-delay: 0.8s;
  }
  span:nth-child(16) {
    animation-delay: 0.85s;
  }
  span:nth-child(17) {
    animation-delay: 0.9s;
  }
  span:nth-child(18) {
    animation-delay: 0.95s;
  }
  span:nth-child(19) {
    animation-delay: 1s;
  }
  span:nth-child(20) {
    animation-delay: 1.05s;
  }
  span:nth-child(21) {
    animation-delay: 1.1s;
  }
  span:nth-child(22) {
    animation-delay: 1.15s;
  }
  span:nth-child(23) {
    animation-delay: 1.2s;
  }
  span:nth-child(24) {
    animation-delay: 1.25s;
  }
  span:nth-child(25) {
    animation-delay: 1.3s;
  }
  span:nth-child(26) {
    animation-delay: 1.35s;
  }
  span:nth-child(27) {
    animation-delay: 1.4s;
  }
  span:nth-child(28) {
    animation-delay: 1.45s;
  }
  span:nth-child(29) {
    animation-delay: 1.5s;
  }
  span:nth-child(30) {
    animation-delay: 1.55s;
  }
`;

const TitleAnimation: React.FC<ITitleAnimation> = ({ title }) => {
  const splitArray = title.split('');

  return (
    <Wrapper>
      {splitArray.map((item, index) => (
        <span key={index}>{item}</span>
      ))}
    </Wrapper>
  );
};

export default TitleAnimation;
