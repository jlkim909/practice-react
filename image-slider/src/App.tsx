import styled from "@emotion/styled";
import ImageSlider from "./components/ImageSlider";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 100px;
`;

function App() {
  return (
    <Container>
      <ImageSlider />
    </Container>
  );
}

export default App;
