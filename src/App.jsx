import Converter from '../features/converter/Converter';
import { Flex } from '@chakra-ui/react';

function App() {
  return (
    <div>
      <Flex
        bgGradient="linear(to-t, #ae085c, #2e0656)"
        height="100vh"
        justifyContent="center"
      >
        <Converter />
      </Flex>
    </div>
  );
}

export default App
