import styled from "@emotion/styled";
import ImageGallery from "./components/ImageGallery";

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <ImageGallery />
    </Container>
  );
}

export default App;
