import { Canvas, Container, Panel } from './components';

export const App = () => {
  return (
    <Container>
      <Canvas
        width='950'
        height='700'
        style={{
          backgroundColor: '#101010',
        }}
      />
      <Panel />
    </Container>
  );
};
