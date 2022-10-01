import { Ititle } from 'interfaces';
import styled, { keyframes } from 'styled-components';

// yes, this needs to go outside...
// https://medium.com/geekculture/you-may-see-this-warning-because-youve-called-styled-inside-another-component-styled-components-7766b4740b22
const animation = keyframes`
0% {opacity: 0; }
25%{opacity: 1; } 
50%{opacity: 1; }
100% {opacity: 0;}`;

const Wrapper = styled.div`
  opacity: 0;
  animation-name: ${animation};
  animation-duration: 1s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
`;

const Title = styled.div`
  display: inline-block;
  text-align: center;
  color: '';
`;

const TickingOneSecond: React.FC = () => {
  return (
    <Wrapper>
      <Title className="twoDots">:</Title>
    </Wrapper>
  );
};

export default TickingOneSecond;
