import styled from "@emotion/styled";
import Calendar from "./components/Calendar";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function App() {
  return (
    <Container>
      <Calendar />
    </Container>
  );
}

export default App;
