import styled from "@emotion/styled";
import DrawingBoard from "./components/DrawingBoard";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function App() {
  return (
    <Container>
      <DrawingBoard />
    </Container>
  );
}

export default App;
