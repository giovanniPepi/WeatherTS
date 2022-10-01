import { Ititle } from 'interfaces';
import styled, { keyframes } from 'styled-components';

// yes, this needs to go outside...
// https://medium.com/geekculture/you-may-see-this-warning-because-youve-called-styled-inside-another-component-styled-components-7766b4740b22
const animation = keyframes`
0% {opacity: 0;}
25%{opacity: 1;} 
50%{opacity: 1;}
100% {opacity: 0}`;

const Wrapper = styled.span`
  opacity: 0;
  animation-name: ${animation};
  animation-duration: 5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
`;

const Title = styled.h1`
  text-align: center;
  color: '';
`;

const TextAnimation: React.FC<Ititle> = ({ title }) => {
  return (
    <Wrapper>
      <Title className="dailyDt strong">{title}</Title>
    </Wrapper>
  );
};

export default TextAnimation;
